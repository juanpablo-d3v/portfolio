import { getBenefitLabels, getServiceByName, getServiceLabel } from '../data/serviceCatalog.js';
import { getLocale, getLocaleStrings } from '../data/localeStrings.js';
import {
  ImprovementError,
  MAX_IMPROVEMENT_LENGTH,
  improveGoal,
} from '../services/improvementService.js';

const COOLDOWN_MS = 20000;
const COOLDOWN_KEY = 'jp-improvement-match-last-submit';
const EMAIL_ADDRESS = 'juanpablod3v@gmail.com';

class ImprovementDialog {
  constructor() {
    this.locale = getLocale();
    this.strings = getLocaleStrings('improvement');
    this.trigger = document.querySelector('[data-improvement-open]');
    this.dialog = document.getElementById('improvement-dialog');
    this.inputView = document.getElementById('improvement-view-input');
    this.loadingView = document.getElementById('improvement-view-loading');
    this.resultView = document.getElementById('improvement-view-result');
    this.form = document.getElementById('improvement-form');
    this.input = document.getElementById('improvement-input');
    this.counter = document.getElementById('improvement-counter');
    this.closeButton = document.querySelector('[data-improvement-close]');
    this.submitButton = document.querySelector('[data-improvement-submit]');
    this.errorMessage = document.getElementById('improvement-error');
    this.status = document.getElementById('improvement-status');
    this.loadingMessage = document.getElementById('improvement-loading-message');
    this.fallback = document.getElementById('improvement-fallback');
    this.fallbackMessage = document.getElementById('improvement-fallback-message');
    this.retryButton = document.querySelector('[data-improvement-retry]');
    this.resultTitle = document.getElementById('improvement-result-title');
    this.understoodGoal = document.getElementById('improvement-understood-goal');
    this.primaryService = document.getElementById('improvement-primary-service');
    this.whyItFits = document.getElementById('improvement-why-fits');
    this.benefits = document.getElementById('improvement-benefits');
    this.questions = document.getElementById('improvement-questions');
    this.questionsNote = document.getElementById('improvement-questions-note');
    this.firstStep = document.getElementById('improvement-first-step');
    this.emailBrief = document.getElementById('improvement-email-brief');
    this.anotherButton = document.querySelector('[data-improvement-another]');
    this.dialogTitle = document.getElementById('improvement-title');
    this.dialogSubtitle = document.querySelector('.improvement-subtitle');
    this.privacy = document.getElementById('improvement-privacy');
    this.inputLabel = document.querySelector('.improvement-label');
    this.benefitsHeading = document.getElementById('improvement-benefits-title');
    this.questionsHeading = document.getElementById('improvement-questions-title');
    this.firstStepHeading = document.getElementById('improvement-first-step-title');
    this.mailtoLinks = document.querySelectorAll('#improvement-dialog a[href^="mailto:"]');
    this.cooldownTimer = null;
    this.cooldownUntil = 0;
    this.loading = false;
    this.lastFocused = null;
    this.generation = 0;
    this.views = {
      input: this.inputView,
      loading: this.loadingView,
      result: this.resultView,
    };

    if (
      !this.trigger ||
      !this.dialog ||
      !this.form ||
      !this.input ||
      !this.inputView ||
      !this.loadingView ||
      !this.resultView ||
      !this.loadingMessage ||
      !this.resultTitle ||
      !this.anotherButton ||
      !this.emailBrief
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
    if (this.dialogTitle) {
      this.dialogTitle.textContent = this.strings.dialogTitle;
    }
    if (this.dialogSubtitle) {
      this.dialogSubtitle.textContent = this.strings.dialogSubtitle;
    }
    if (this.privacy) {
      this.privacy.textContent = this.strings.privacy;
    }
    if (this.inputLabel) {
      this.inputLabel.textContent = this.strings.inputLabel;
    }
    if (this.closeButton) {
      this.closeButton.setAttribute('aria-label', this.strings.close);
    }
    if (this.benefitsHeading) {
      this.benefitsHeading.textContent = this.strings.benefitsTitle;
    }
    if (this.questionsHeading) {
      this.questionsHeading.textContent = this.strings.questionsTitle;
    }
    if (this.firstStepHeading) {
      this.firstStepHeading.textContent = this.strings.firstStepTitle;
    }
    if (this.questionsNote) {
      this.questionsNote.textContent = this.strings.questionsNote;
    }
    if (this.retryButton) {
      this.retryButton.textContent = this.strings.retry;
    }

    this.input.placeholder = this.strings.placeholder;
    this.loadingMessage.textContent = this.strings.loading;
    this.resultTitle.textContent = this.strings.resultTitle;
    this.anotherButton.textContent = this.strings.startAnother;
    this.emailBrief.textContent = this.strings.emailBrief;

    for (const link of this.mailtoLinks) {
      link.href = this.buildMailtoHref();
    }
  }

  initializeDialog() {
    if (!this.hasNativeDialog()) {
      return;
    }

    this.trigger.addEventListener('click', (event) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      event.preventDefault();
      this.open();
    });
    this.closeButton?.addEventListener('click', () => this.dialog.close());
    this.anotherButton.addEventListener('click', () => this.startAnother());
    this.retryButton?.addEventListener('click', () => this.retry());
    this.dialog.addEventListener('close', () => {
      if (this.lastFocused && document.contains(this.lastFocused)) {
        this.lastFocused.focus();
      }
    });
  }

  initializeForm() {
    this.form.addEventListener('submit', (event) => this.handleSubmit(event));
    this.input.addEventListener('input', () => this.handleInput());
    this.updateCounter();
  }

  hasNativeDialog() {
    return typeof this.dialog.showModal === 'function' && typeof this.dialog.close === 'function';
  }

  setView(view) {
    for (const [name, element] of Object.entries(this.views)) {
      element.hidden = name !== view;
    }
  }

  open() {
    if (this.dialog.open || !this.hasNativeDialog()) {
      return;
    }

    this.lastFocused = document.activeElement;
    this.resetInput();
    this.dialog.showModal();
    this.input.focus();
  }

  handleInput() {
    if (this.input.value.length > MAX_IMPROVEMENT_LENGTH) {
      this.input.value = this.input.value.slice(0, MAX_IMPROVEMENT_LENGTH);
    }

    this.updateCounter();

    if (this.input.value.trim()) {
      this.clearFieldError();
    }
  }

  updateCounter() {
    const length = Math.min(this.input.value.length, MAX_IMPROVEMENT_LENGTH);
    const limitReached = length >= MAX_IMPROVEMENT_LENGTH;

    this.counter.textContent = limitReached
      ? `${length} / ${MAX_IMPROVEMENT_LENGTH} ${this.strings.counterLimit}`
      : `${length} / ${MAX_IMPROVEMENT_LENGTH}`;
    this.counter.classList.toggle('is-limit', limitReached);
  }

  async handleSubmit(event) {
    event?.preventDefault();

    if (this.loading || this.isCoolingDown()) {
      return;
    }

    const text = this.input.value.trim();

    if (!text) {
      this.showFieldError(this.strings.validation);
      this.input.focus();
      return;
    }

    this.clearFieldError();
    const generation = this.prepareRequest();

    try {
      const result = await improveGoal(text.slice(0, MAX_IMPROVEMENT_LENGTH), {
        locale: this.locale,
      });

      if (generation !== this.generation) {
        return;
      }

      this.showResult(result, text);
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
    this.generation += 1;
    this.setLoading(true);
    this.fallback.hidden = true;
    this.clearResult();
    this.setStatus('');
    this.rememberSubmit();
    this.startCooldown();
    this.setView('loading');
    this.loadingMessage.focus();
    return this.generation;
  }

  showResult(result, visitorText) {
    const service = getServiceByName(result.primaryService);

    this.understoodGoal.textContent = result.understoodGoal;
    this.primaryService.textContent = getServiceLabel(service, this.locale);
    this.whyItFits.textContent = result.whyItFits;
    this.renderList(
      this.benefits,
      getBenefitLabels(service, result.benefitKeys, this.locale),
    );
    this.renderList(this.questions, [...result.clarifyingQuestions]);
    this.firstStep.textContent = result.suggestedFirstStep;
    this.emailBrief.href = this.buildMailtoHref(
      this.buildEmailBrief(result, service, visitorText),
    );
    this.setView('result');
    this.setStatus(this.strings.statusReady);
    this.resultTitle.focus();
  }

  showFailure(error) {
    const code = error instanceof ImprovementError ? error.code : 'invalid';

    this.fallbackMessage.textContent = this.strings.failures[code] ?? this.strings.failures.invalid;
    this.clearResult();
    this.fallback.hidden = false;
    this.setView('input');
    this.setStatus('');
    this.input.focus();
  }

  startAnother() {
    this.resetInput();
    this.input.focus();
  }

  retry() {
    if (this.loading || this.isCoolingDown()) {
      return;
    }

    this.fallback.hidden = true;
    this.input.focus();

    if (typeof this.form.requestSubmit === 'function') {
      this.form.requestSubmit();
      return;
    }

    this.handleSubmit();
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
    this.clearResult();
    this.setStatus('');
    this.setView('input');
    this.syncSubmitControl();
  }

  clearResult() {
    this.understoodGoal.textContent = '';
    this.primaryService.textContent = '';
    this.whyItFits.textContent = '';
    this.benefits.replaceChildren();
    this.questions.replaceChildren();
    this.firstStep.textContent = '';
    this.emailBrief.href = this.buildMailtoHref();
  }

  renderList(list, items) {
    list.replaceChildren();

    for (const value of items) {
      const item = document.createElement('li');
      item.textContent = value;
      list.appendChild(item);
    }
  }

  buildEmailBrief(result, service, visitorText) {
    const benefitLabels = getBenefitLabels(service, result.benefitKeys, this.locale);
    const serviceLabel = getServiceLabel(service, this.locale);

    return [
      this.strings.emailIntro,
      visitorText,
      '',
      `${this.strings.goalLabel} ${result.understoodGoal}`,
      `${this.strings.serviceLabel} ${serviceLabel}`,
      `${this.strings.fitLabel} ${result.whyItFits}`,
      '',
      this.strings.benefitsTitle,
      ...benefitLabels.map((label) => `- ${label}`),
      '',
      this.strings.questionsTitle,
      this.strings.questionsNote,
      ...result.clarifyingQuestions.map((question) => `- ${question}`),
      '',
      `${this.strings.firstStepLabel} ${result.suggestedFirstStep}`,
    ].join('\n');
  }

  buildMailtoHref(body) {
    const subject = encodeURIComponent(this.strings.subject);
    const suffix = body ? `&body=${encodeURIComponent(body)}` : '';
    return `mailto:${EMAIL_ADDRESS}?subject=${subject}${suffix}`;
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
    const coolingDown = this.isCoolingDown();
    const unavailable = this.loading || coolingDown;
    let label = this.strings.submit;

    if (this.loading) {
      label = this.strings.submitLoading;
    } else if (coolingDown) {
      label = this.strings.submitCooldown(this.remainingCooldownSeconds());
    }

    this.submitButton.textContent = label;

    if (unavailable) {
      this.submitButton.setAttribute('aria-disabled', 'true');
    } else {
      this.submitButton.removeAttribute('aria-disabled');
    }

    if (this.retryButton) {
      if (unavailable) {
        this.retryButton.setAttribute('aria-disabled', 'true');
      } else {
        this.retryButton.removeAttribute('aria-disabled');
      }
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

export default ImprovementDialog;
