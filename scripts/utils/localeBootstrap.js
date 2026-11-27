(() => {
  'use strict';

  const PREFERENCE_KEY = 'jp-locale-preference';

  function readPreference() {
    try {
      const value = window.localStorage.getItem(PREFERENCE_KEY);
      return value === 'es' || value === 'en' ? value : null;
    } catch (error) {
      return null;
    }
  }

  function writePreference(locale) {
    try {
      window.localStorage.setItem(PREFERENCE_KEY, locale);
    } catch (error) {
      return;
    }
  }

  function normalizeLocale(value) {
    if (typeof value !== 'string') {
      return null;
    }

    const base = value.trim().toLowerCase().replace(/_/g, '-').split('-')[0];
    return base === 'es' || base === 'en' ? base : null;
  }

  function getBrowserLocale() {
    let languages = navigator.languages;

    if (!Array.isArray(languages) || languages.length === 0) {
      languages = [navigator.language];
    }

    for (const language of languages) {
      const locale = normalizeLocale(language);

      if (locale) {
        return locale;
      }
    }

    return null;
  }

  function getSpanishAlternateUrl() {
    const alternate = document.querySelector('link[rel="alternate"][hreflang="es-MX"]');

    if (!alternate || !alternate.href) {
      return null;
    }

    const url = new URL(alternate.href, window.location.href);
    url.search = window.location.search;
    url.hash = window.location.hash;
    return url.href;
  }

  function isEnglishPage() {
    return document.documentElement.lang.toLowerCase().startsWith('en');
  }

  function maybeRedirect() {
    if (!isEnglishPage()) {
      return;
    }

    const storedLocale = readPreference();

    if (storedLocale === 'en') {
      return;
    }

    const targetLocale = storedLocale === 'es' ? 'es' : getBrowserLocale();

    if (targetLocale !== 'es') {
      return;
    }

    const targetUrl = getSpanishAlternateUrl();

    if (targetUrl) {
      window.location.replace(targetUrl);
    }
  }

  function handleLanguageLinkClick(event) {
    const target = event.target;

    if (!target || !target.closest) {
      return;
    }

    const link = target.closest('.header-lang-link');

    if (!link) {
      return;
    }

    const locale = normalizeLocale(link.getAttribute('hreflang') || link.getAttribute('lang'));

    if (locale) {
      writePreference(locale);
    }
  }

  document.addEventListener('click', handleLanguageLinkClick, true);
  maybeRedirect();
})();
