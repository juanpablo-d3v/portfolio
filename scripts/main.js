import NavigationHandler from './nav.js';
import IconHandler from './icons.js';
import CertificationHandler from './certifications.js';
import ScrollAnimations from './scrollAnimations.js';
import ImageFade from './imageFade.js';

document.documentElement.classList.add('js-enabled');

class App {
  constructor() {
    this.initialize();
  }

  initialize() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.run());
    } else {
      this.run();
    }
  }

  async run() {
    new NavigationHandler();
    new IconHandler();
    new CertificationHandler();
    new ScrollAnimations();
    new ImageFade();

    if (document.querySelector('[data-experience-reveal]')) {
      const { default: ExperienceReveal } = await import('./experienceReveal.js');
      new ExperienceReveal();
    }

    if (document.getElementById('job-match-dialog')) {
      const { default: JobMatchModal } = await import('./components/jobMatchModal.js');
      new JobMatchModal();
    }

    console.log('[JP-DEV] CV Landing Page initialized');
  }
}

const app = new App();
