class ScrollAnimations {
  constructor() {
    this.initializeScrollAnimations();
  }

  initializeScrollAnimations() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    // Initialize sections for scroll animation
    document.querySelectorAll('section').forEach(section => {
      observer.observe(section);
    });
  }
}

export default ScrollAnimations;
