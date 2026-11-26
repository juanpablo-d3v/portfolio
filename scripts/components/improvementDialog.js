import { getBenefitLabels, getServiceByName } from '../data/serviceCatalog.js';
import {
  ImprovementError,
  MAX_IMPROVEMENT_LENGTH,
  improveGoal,
} from '../services/improvementService.js';

const COOLDOWN_MS = 20000;
const COOLDOWN_KEY = 'jp-improvement-match-last-submit';
const EMAIL_ADDRESS = 'hello@juanpablo.dev';
const EMAIL_SUBJECT = 'Improvement Inquiry';

const FAILURE_MESSAGES = {
  config: 'Improvement guidance is unavailable right now. You can still email me directly.',
  network: 'Improvement guidance could not reach the service. Please try again, or email me directly.',
  quota: 'The AI service is busy right now. Please try again later, or email me directly.',
  http: 'Improvement guidance is unavailable right now. You can still email me directly.',
  timeout: 'Improvement guidance took too long to respond. Please try again, or email me directly.',
  invalid: 'The AI response could not be read. Please try again, or email me directly.',
  input: 'Describe what you would like to improve.',
};

class ImprovementDialog {
  constructor() {
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
    this.firstStep = document.getElementById('improvement-first-step');
    this.emailBrief = document.getElementById('improvement-email-brief');
    this.anotherButton = document.querySelector('[data-improvement-another]');
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

    this.setView('input');
    this.initializeDialog();
    this.initializeForm();
    this.restoreCooldown();
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
      ? `${length} / ${MAX_IMPROVEMENT_LENGTH} (limit reached)`
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
      this.showFieldError(FAILURE_MESSAGES.input);
      this.input.focus();
      return;
    }

    this.clearFieldError();
    const generation = this.prepareRequest();

    try {
      const result = await improveGoal(text.slice(0, MAX_IMPROVEMENT_LENGTH));

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
    this.primaryService.textContent = result.primaryService;
    this.whyItFits.textContent = result.whyItFits;
    this.renderList(this.benefits, getBenefitLabels(service, result.benefitKeys));
    this.renderList(this.questions, [...result.clarifyingQuestions]);
    this.firstStep.textContent = result.suggestedFirstStep;
    this.emailBrief.href = this.buildMailtoHref(
      this.buildEmailBrief(result, service, visitorText),
    );
    this.setView('result');
    this.setStatus('Service guidance ready.');
    this.resultTitle.focus();
  }

  showFailure(error) {
    const code = error instanceof ImprovementError ? error.code : 'invalid';

    this.fallbackMessage.textContent = FAILURE_MESSAGES[code] ?? FAILURE_MESSAGES.invalid;
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
    this.emailBrief.href = `mailto:${EMAIL_ADDRESS}?subject=${encodeURIComponent(EMAIL_SUBJECT)}`;
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
    const benefitLabels = getBenefitLabels(service, result.benefitKeys);

    return [
      'Here is what I would like to improve:',
      visitorText,
      '',
      `Understood goal: ${result.understoodGoal}`,
      `Suggested service: ${result.primaryService}`,
      `Why it may help: ${result.whyItFits}`,
      '',
      'Relevant benefits:',
      ...benefitLabels.map((label) => `- ${label}`),
      '',
      'Questions to answer in your email:',
      'Answer any that apply in the email you send; no new inquiry is needed.',
      ...result.clarifyingQuestions.map((question) => `- ${question}`),
      '',
      `Suggested first step: ${result.suggestedFirstStep}`,
    ].join('\n');
  }

  buildMailtoHref(body) {
    return `mailto:${EMAIL_ADDRESS}?subject=${encodeURIComponent(EMAIL_SUBJECT)}&body=${encodeURIComponent(body)}`;
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
    let label = 'Find the right service';

    if (this.loading) {
      label = 'Finding service...';
    } else if (coolingDown) {
      label = `Find the right service (${this.remainingCooldownSeconds()}s)`;
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
