export function smoothScroll(target) {
  const element = document.querySelector(target);
  if (!element) {
    return;
  }

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  element.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
}
