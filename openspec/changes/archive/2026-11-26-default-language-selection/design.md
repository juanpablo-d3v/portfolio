# Design

## Context

See `proposal.md` for motivation. The site already has four complete static entry points with same-audience alternate links: `/` ↔ `/es/` and `/cv/` ↔ `/es/cv/`. `scripts/data/localeStrings.js` derives the active locale from `document.documentElement.lang`, while `scripts/main.js` boots UI modules after the document is ready. The site deploys as static GitHub Pages with no build step, no backend, and a requirement that served HTML remains usable without JavaScript.

## Goals / Non-Goals

**Goals:**

- Choose the Spanish mirror on a fresh visit when the browser's ordered language preferences select Spanish first.
- Let an explicit EN or ES header choice override browser detection on later visits.
- Keep the four pre-rendered mirrors, served content, verified copy, audience boundaries, and `hreflang` metadata authoritative.
- Keep the bootstrap tiny, browser-native, and safe when storage is unavailable.

**Non-Goals:**

- No runtime translation, dynamic content swapping, or locale selector beyond the existing header links.
- No server-side `Accept-Language` negotiation, worker, framework, package dependency, or build step.
- No audience switching from the language control.
- No redirect away from `/es/` or `/es/cv/`.
- No language prompt or extra UI.

## Decisions

### Pre-rendered mirror navigation instead of in-place translation

Locale choice navigates to an existing same-audience HTML entry point. The served page remains the source of truth for copy, metadata, and no-JavaScript behavior.

Alternatives considered:

- Runtime translation of the current page: rejected because it would duplicate verified content in JavaScript and conflict with the static-entry-point contract.
- Dynamic client-side content swap: rejected for the same reason and for accessibility/SEO complexity.

### One-way negotiation from English entry points only

Only `/` and `/cv/` evaluate browser language. `/es/` and `/es/cv/` remain directly reachable and never auto-redirect to English.

Alternatives considered:

- Bidirectional negotiation on all four entry points: rejected because shared Spanish links and bookmarks would become unstable for English-preferred visitors.
- Portfolio-only redirection: rejected because recruiter visitors benefit from the same language match.

### Ordered browser preferences with first supported locale

The helper reads `navigator.languages` when available, falling back to a single `navigator.language` value. It normalizes each value, checks them in order, and maps `es` or `es-*` to Spanish and `en` or `en-*` to English. Unsupported languages are skipped; if no supported language is found, the English entry point stays in place.

Alternatives considered:

- Primary language only: rejected because it ignores common ordered bilingual preferences.
- Any Spanish value anywhere in the list: rejected because it can override a stronger English preference.

### Shared early classic script

Add one browser-native helper, `scripts/utils/localeBootstrap.js`, as a classic script in the `<head>` of all four pages after the `hreflang` links. The script:

```text
document language is English? --no--> only keep language-link listener
        |
       yes
        v
stored choice = en? --yes--> stay
        |
       no
        v
target locale = stored es or first supported browser language
        |
       es
        v
location.replace(spanish alternate URL)
(query/hash preserved)
        |
       no
        v
stay on English
```

The Spanish alternate URL comes from the existing `link[rel="alternate"][hreflang="es-MX"]`, so target paths stay relative to each page's base. A delegated click listener stores the locale from `hreflang` on `.header-lang-link` elements without preventing normal navigation.

Alternatives considered:

- Import from `scripts/main.js`: rejected because it runs after document parsing and can allow an English flash before redirect.
- Duplicate inline snippets in each HTML file: rejected because storage keys and locale rules would drift.
- Host-level negotiation: rejected because it requires new infrastructure and cannot stay purely static.

### Persistent explicit choice

The helper stores `en` or `es` under a single `jp-locale-preference` key in `localStorage`. Storage access is wrapped so a blocked or unavailable store does not prevent navigation. The helper ignores unknown stored values and behaves as if no choice exists.

Alternatives considered:

- Cookies: rejected because no server needs the value and cookies add unnecessary request/consent surface.
- Session-only storage: rejected because the chosen language should survive later visits.

### Replace navigation rather than push history

Auto-redirect uses `location.replace()` with the alternate URL plus the current query string and fragment. This preserves URL details and avoids leaving a back-button step that immediately redirects again.

## Risks / Trade-offs

- [English HTML is fetched before redirect] → Put the small script in `<head>` before body parsing and use `location.replace()` to minimize visible flicker.
- [Browser language may not reflect intent] → Explicit header choices win and persist; Spanish URLs are never redirected.
- [Storage may be unavailable] → Catch storage errors, still navigate on link activation, and fall back to browser detection on later visits.
- [Crawler or no-JavaScript clients see English] → Keep English as `x-default`, keep complete served content on every entry point, and do not add `noscript` refresh.
- [Relative paths differ by page depth] → Read target URLs from existing `hreflang` links instead of hardcoding paths.
- [Stored preference may become stale] → Treat the header links as the reset control; no migration or expiration is needed for this change.

## Migration Plan

- Add the shared locale bootstrap helper.
- Add one script tag to each of the four entry points after the alternate links.
- Update `README.md` conventions to document fresh-visit language detection and explicit-choice precedence.
- Deploy through the existing Pages workflow; no separate data migration is required.
- Roll back by removing the four script tags and the helper file.
