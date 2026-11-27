# Proposal

## Why

Spanish-preferring visitors currently land on the English portfolio or CV even though complete Mexican Spanish mirrors exist. The site can improve first impressions without translation infrastructure by choosing the appropriate pre-rendered entry point when no explicit language choice exists.

## What Changes

- Add browser-language negotiation to the two English entry points only: `/` may redirect to `/es/`, and `/cv/` may redirect to `/es/cv/`.
- Use the visitor's ordered `navigator.languages` list; the first supported locale wins, with `es-*` selecting Spanish, `en-*` selecting English, and other languages falling back to English.
- Persist an explicit EN or ES choice made through the existing header language links; a saved choice takes precedence over browser detection on later visits.
- Keep `/es/` and `/es/cv/` authoritative: Spanish entry points never auto-redirect to English.
- Preserve the static-site model: no runtime translation, no audience switching, no server-side negotiation, no dependency, and English remains the no-JavaScript and `x-default` fallback.
- Amend the existing audience-variant contract so entry-point locale negotiation is distinguished from prohibited runtime locale or audience switching.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `site-audience-variants`: Replace the blanket prohibition on runtime locale switching with a narrow allowance for JavaScript-enhanced, same-audience entry-point negotiation; add requirements for explicit choice persistence, English-only redirect scope, ordered language preference handling, and no-JavaScript fallback.

## Impact

- Affected entry points: `index.html`, `cv/index.html`, `es/index.html`, and `es/cv/index.html`.
- Affected shared code: a new browser-native locale bootstrap helper under `scripts/utils/`; `scripts/data/localeStrings.js` and `scripts/main.js` remain unchanged.
- Affected documentation: `README.md` conventions for entry points and language links.
- No API changes, package dependencies, build steps, runtime translation service, or server-side hosting changes.
