# Tasks

## 1. Locale bootstrap helper

- [x] 1.1 Create `scripts/utils/localeBootstrap.js` to read/write the explicit locale preference, resolve the first supported browser language, and redirect English entry points through the existing Spanish `hreflang` alternate; verify with `node --check scripts/utils/localeBootstrap.js` and confirm the file contains no module imports or external dependencies.
- [x] 1.2 Handle blocked storage, unknown stored values, and missing language APIs without throwing; verify by loading the helper with storage access denied and with `navigator.languages` unavailable, then confirming the page still renders and header links still navigate.
- [x] 1.3 Store the locale from `.header-lang-link` clicks without preventing default navigation; verify that clicking ES on `/` or `/cv/` stores `es`, clicking EN on `/es/` or `/es/cv/` stores `en`, and all links keep their existing same-audience destinations.

## 2. Entry point wiring

- [x] 2.1 Add the locale bootstrap script tag after the alternate links in `index.html` and `cv/index.html`; verify it loads before the body, resolves with the correct relative path, and produces no console errors.
- [x] 2.2 Add the locale bootstrap script tag after the alternate links in `es/index.html` and `es/cv/index.html`; verify both Spanish pages stay on their requested URL and still initialize the language-link listener.
- [x] 2.3 Confirm no redirect loop or history trap; verify a redirected visit uses replacement navigation and pressing Back does not immediately re-trigger the redirect.

## 3. Documentation

- [x] 3.1 Update `README.md` conventions to document fresh-visit browser-language detection, explicit-choice precedence, English-only redirect scope, and no-JavaScript fallback; verify the wording matches the behavior in the spec delta and that all documented entry point URLs remain correct.

## 4. Integrated behavior checks

- [x] 4.1 Verify fresh-visit Spanish detection: with no saved preference, `/` with `es-MX, en-US` opens `/es/`, and `/cv/` with `es-419` opens `/es/cv/`.
- [x] 4.2 Verify ordered-language fallbacks: `en-GB, es-MX` stays on the English entry point, `fr-FR, es-MX, en` opens the Spanish entry point, and `fr-FR` stays on the English entry point.
- [x] 4.3 Verify explicit-choice precedence: a saved `es` choice opens the Spanish entry point even with English-preferred languages, and a saved `en` choice prevents auto-redirect with Spanish-preferred languages.
- [x] 4.4 Verify redirect details: `/cv/?source=share#experience` with a Spanish preference opens `/es/cv/?source=share#experience`.
- [x] 4.5 Verify static fallbacks: with JavaScript disabled, all four entry points render their served content without refresh redirects, and `hreflang` metadata remains unchanged.
- [x] 4.6 Serve the site locally with `python3 -m http.server 8080` and review all four entry points plus one redirected flow, confirming assets, PDF links, and console output remain unchanged apart from the locale bootstrap behavior.
