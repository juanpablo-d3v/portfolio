import { smoothScroll } from './utils/smoothScroll.js';

class NavigationHandler {
  constructor() {
    this.mobileMenu = document.querySelector('.mobile-nav');
    this.initializeNavigation();
  }

  initializeNavigation() {
    document.querySelectorAll('nav a').forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          smoothScroll(href);
          this.closeMobileMenu();
        }
      });
    });

    const connectBtn = document.querySelector('nav button');
    if (connectBtn) {
      connectBtn.addEventListener('click', () => {
        smoothScroll('#experience');
        this.closeMobileMenu();
      });
    }
  }

  closeMobileMenu() {
    if (this.mobileMenu) {
      this.mobileMenu.open = false;
    }
  }
}

export default NavigationHandler;
