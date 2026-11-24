class ExperienceReveal {
  constructor() {
    this.control = document.querySelector('[data-experience-reveal]');
    this.regionId = this.control?.getAttribute('aria-controls');
    this.region = this.regionId ? document.getElementById(this.regionId) : null;

    if (!this.control || !this.region) {
      return;
    }

    this.expanded = true;
    this.applyState(false);
    this.control.addEventListener('click', () => this.toggle());
  }

  toggle() {
    this.applyState(!this.expanded);
  }

  applyState(expanded) {
    this.expanded = expanded;
    this.region.hidden = !expanded;
    this.control.setAttribute('aria-expanded', String(expanded));
    this.control.dataset.expanded = String(expanded);
  }
}

export default ExperienceReveal;
