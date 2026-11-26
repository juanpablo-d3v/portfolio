import {
  compareVacancy,
  JobMatchError,
  MAX_VACANCY_LENGTH,
  verdictFromScore,
} from '../services/geminiService.js';
import { getLocale, getLocaleStrings } from '../data/localeStrings.js';

const COOLDOWN_MS = 20000;
const COOLDOWN_KEY = 'jp-job-match-last-submit';

class JobMatchModal {
  constructor() {
    this.locale = getLocale();
    this.strings = getLocaleStrings('jobMatch');
    this.trigger = document.querySelector('[data-job-match-open]');
    this.dialog = document.getElementById('job-match-dialog');
    this.inputView = document.getElementById('job-match-view-input');
    this.loadingView = document.getElementById('job-match-view-loading');
    this.result = document.getElementById('job-match-result');
    this.form = document.getElementById('job-match-form');
    this.input = document.getElementById('job-match-input');
    this.counter = document.getElementById('job-match-counter');
    this.closeButton = document.querySelector('[data-job-match-close]');
    this.submitButton = document.querySelector('[data-job-match-submit]');
    this.errorMessage = document.getElementById('job-match-error');
    this.status = document.getElementById('job-match-status');
    this.loadingMessage = document.getElementById('job-match-loading-message');
    this.resultHeading = document.getElementById('job-match-result-title');
    this.anotherButton = document.querySelector('[data-job-match-another]');
    this.score = document.getElementById('job-match-score');
    this.verdict = document.getElementById('job-match-verdict');
    this.matched = document.getElementById('job-match-matched');
    this.gaps = document.getElementById('job-match-gaps');
    this.rationale = document.getElementById('job-match-rationale');
    this.fallback = document.getElementById('job-match-fallback');
    this.fallbackMessage = document.getElementById('job-match-fallback-message');
    this.title = document.getElementById('job-match-title');
    this.subtitle = document.querySelector('.job-match-subtitle');
    this.privacy = document.getElementById('job-match-privacy');
    this.label = document.querySelector('.job-match-label');
    this.disclaimer = document.querySelector('.job-match-disclaimer');
    this.resultHeadings = document.querySelectorAll('#job-match-result .job-match-result-block h4');
    this.emailInsteadLinks = document.querySelectorAll(
      '#job-match-view-input .job-match-secondary[href^="mailto:"]',
    );
    this.emailMeLinks = document.querySelectorAll('#job-match-dialog a[href^="mailto:"]');
    this.downloadLinks = document.querySelectorAll('#job-match-dialog a[download]');
    this.cooldownTimer = null;
    this.cooldownUntil = 0;
    this.loading = false;
    this.lastFocused = null;
    this.generation = 0;
    this.view = null;
    this.views = {
      input: this.inputView,
      loading: this.loadingView,
      result: this.result,
    };

    if (
      !this.trigger ||
      !this.dialog ||
      !this.form ||
      !this.input ||
      !this.submitButton ||
      !this.inputView ||
      !this.loadingView ||
      !this.result ||
      !this.loadingMessage ||
      !this.resultHeading ||
      !this.anotherButton
    ) {
      return;
    }

    this.applyStaticStrings();
    this.setView('input');
    this.initializeDialog();
    this.initializeForm();
    this.restoreCooldown();
  }

  applyStaticStrings() {
    if (this.title) {
      this.title.textContent = this.strings.title;
    }
    if (this.subtitle) {
      this.subtitle.textContent = this.strings.subtitle;
    }
    if (this.privacy) {
      this.privacy.textContent = this.strings.privacy;
    }
    if (this.label) {
      this.label.textContent = this.strings.label;
    }
    if (this.disclaimer) {
      this.disclaimer.textContent = this.strings.disclaimer;
    }
    if (this.closeButton) {
      this.closeButton.setAttribute('aria-label', this.strings.close);
    }

    this.input.placeholder = this.strings.placeholder;
    this.loadingMessage.textContent = this.strings.loading;
    this.resultHeading.textContent = this.strings.resultTitle;
    this.anotherButton.textContent = this.strings.compareAnother;

    if (this.resultHeadings[0]) {
      this.resultHeadings[0].textContent = this.strings.matchedTitle;
    }
    if (this.resultHeadings[1]) {
      this.resultHeadings[1].textContent = this.strings.gapsTitle;
    }
    if (this.resultHeadings[2]) {
      this.resultHeadings[2].textContent = this.strings.rationaleTitle;
    }

    for (const link of this.emailInsteadLinks) {
      link.textContent = this.strings.emailInstead;
    }
    for (const link of this.emailMeLinks) {
      if (!link.classList.contains('job-match-secondary') || !link.closest('#job-match-view-input')) {
        link.textContent = this.strings.emailMe;
      }
    }
    for (const link of this.downloadLinks) {
      link.textContent = this.strings.downloadCv;
    }
  }

  initializeDialog() {
    this.trigger.addEventListener('click', () => this.open());
    this.closeButton?.addEventListener('click', () => this.dialog.close());
    this.anotherButton.addEventListener('click', () => this.startAnotherComparison());
    this.dialog.addEventListener('close', () => {
      if (this.lastFocused) {
        this.lastFocused.focus();
      }
    });
  }

  initializeForm() {
    this.form.addEventListener('submit', (event) => this.handleSubmit(event));
    this.input.addEventListener('input', () => this.handleInput());
    this.updateCounter();
  }

  setView(view) {
    this.view = view;

    for (const [name, element] of Object.entries(this.views)) {
      element.hidden = name !== view;
    }
  }

  open() {
    this.lastFocused = document.activeElement;
    this.resetInput();
    this.dialog.showModal();
    this.input.focus();
  }

  handleInput() {
    this.updateCounter();

    if (this.input.value.trim()) {
      this.clearFieldError();
    }
  }

  updateCounter() {
    const length = this.input.value.length;
    const limitReached = length >= MAX_VACANCY_LENGTH;

    this.counter.textContent = limitReached
      ? `${length} / ${MAX_VACANCY_LENGTH} ${this.strings.counterLimit}`
      : `${length} / ${MAX_VACANCY_LENGTH}`;
    this.counter.classList.toggle('is-limit', limitReached);
  }

  async handleSubmit(event) {
    event.preventDefault();

    if (this.loading) {
      return;
    }

    const text = this.input.value.trim();

    if (!text) {
      this.showFieldError(this.strings.validation);
      this.input.focus();
      return;
    }

    if (this.isCoolingDown()) {
      return;
    }

    this.clearFieldError();
    const generation = this.prepareRequest();

    try {
      const result = await compareVacancy(text.slice(0, MAX_VACANCY_LENGTH), {
        locale: this.locale,
      });

      if (generation !== this.generation) {
        return;
      }

      this.showResult(result);
    } catch (error) {
      if (generation !== this.generation) {
        return;
      }

      this.showFailure(error);
    } finally {
      if (generation === this.generation) {
        this.setLoading(false);
      }
    }
  }

  prepareRequest() {
    this.setLoading(true);
    this.fallback.hidden = true;
    this.setStatus('');
    this.rememberSubmit();
    this.startCooldown();
    this.setView('loading');
    this.loadingMessage.focus();
    return this.generation;
  }

  showResult(result) {
    const band = verdictFromScore(result.score);

    this.score.textContent = String(result.score);
    this.verdict.textContent = this.strings.verdictLabels[band];
    this.verdict.dataset.band = band;
    this.renderList(this.matched, result.matchedSkills, this.strings.emptyMatched);
    this.renderList(this.gaps, result.gaps, this.strings.emptyGaps);
    this.rationale.textContent = result.rationale;
    this.setView('result');
    this.setStatus(this.strings.statusComplete);
    this.resultHeading.focus();
  }

  showFailure(error) {
    const code = error instanceof JobMatchError ? error.code : 'invalid';
    const message = this.strings.failures[code] ?? this.strings.failures.invalid;

    this.fallbackMessage.textContent = message;
    this.fallback.hidden = false;
    this.setView('input');
    this.setStatus('');
    this.input.focus();
  }

  startAnotherComparison() {
    this.resetInput();
    this.input.focus();
  }

  resetInput() {
    this.generation += 1;
    this.loading = false;
    this.form.removeAttribute('aria-busy');
    this.input.value = '';
    this.updateCounter();
    this.clearFieldError();
    this.fallbackMessage.textContent = '';
    this.fallback.hidden = true;
    this.setStatus('');
    this.score.textContent = '0';
    this.verdict.textContent = '-';
    this.verdict.removeAttribute('data-band');
    this.matched.replaceChildren();
    this.gaps.replaceChildren();
    this.rationale.textContent = '';
    this.setView('input');
    this.syncSubmitControl();
  }

  renderList(list, items, emptyMessage) {
    list.replaceChildren();

    const values = items.length ? items : [emptyMessage];

    for (const value of values) {
      const item = document.createElement('li');
      item.textContent = value;
      list.appendChild(item);
    }
  }

  showFieldError(message) {
    this.errorMessage.textContent = message;
    this.errorMessage.hidden = false;
    this.input.setAttribute('aria-invalid', 'true');
  }

  clearFieldError() {
    this.errorMessage.textContent = '';
    this.errorMessage.hidden = true;
    this.input.removeAttribute('aria-invalid');
  }

  setStatus(message) {
    this.status.textContent = message;
  }

  setLoading(isLoading) {
    this.loading = isLoading;
    this.form.toggleAttribute('aria-busy', isLoading);
    this.syncSubmitControl();
  }

  syncSubmitControl() {
    const unavailable = this.loading || this.isCoolingDown();
    let label = this.strings.submit;

    if (this.loading) {
      label = this.strings.submitLoading;
    } else if (this.isCoolingDown()) {
      label = this.strings.submitCooldown(this.remainingCooldownSeconds());
    }

    this.submitButton.textContent = label;

    if (unavailable) {
      this.submitButton.setAttribute('aria-disabled', 'true');
    } else {
      this.submitButton.removeAttribute('aria-disabled');
    }
  }

  rememberSubmit() {
    this.cooldownUntil = Date.now() + COOLDOWN_MS;

    try {
      localStorage.setItem(COOLDOWN_KEY, String(this.cooldownUntil));
    } catch {
      return;
    }
  }

  restoreCooldown() {
    let stored = 0;

    try {
      stored = Number(localStorage.getItem(COOLDOWN_KEY)) || 0;
    } catch {
      stored = 0;
    }

    if (stored > Date.now()) {
      this.cooldownUntil = stored;
      this.startCooldownCountdown();
    }

    this.syncSubmitControl();
  }

  startCooldown() {
    this.startCooldownCountdown();
  }

  startCooldownCountdown() {
    if (this.cooldownTimer) {
      clearInterval(this.cooldownTimer);
    }

    const tick = () => {
      if (this.remainingCooldownSeconds() <= 0) {
        clearInterval(this.cooldownTimer);
        this.cooldownTimer = null;
        this.syncSubmitControl();
        return;
      }

      this.syncSubmitControl();
    };

    tick();
    this.cooldownTimer = setInterval(tick, 1000);
  }

  isCoolingDown() {
    return Date.now() < this.cooldownUntil;
  }

  remainingCooldownSeconds() {
    return Math.max(0, Math.ceil((this.cooldownUntil - Date.now()) / 1000));
  }
}

export default JobMatchModal;
