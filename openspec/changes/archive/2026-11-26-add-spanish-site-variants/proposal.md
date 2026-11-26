# Proposal: Add Spanish Site Variants

## Why

The portfolio and web CV are English-only, which fits global freelance discovery, but the visitor's current professional network is in Mexico. Spanish static mirrors make both audiences useful to local contacts without weakening the English pages used for global-market opportunities.

## What Changes

- Add `/es/` as a full Spanish portfolio mirror and `/es/cv/` as a full Spanish recruiter CV mirror, with complete section content in served HTML and no runtime language switching.
- Add a small header language link on all four pages that maps to the same audience in the other locale: `/ <-> /es/` and `/cv/ <-> /es/cv/`.
- Preserve one-way audience discovery within each locale: each portfolio links to its CV, and neither CV links back to a portfolio.
- Translate visible copy into Mexican Spanish: `tú` tone on the portfolio, neutral/formal tone on the recruiter CV, established technical product names left intact, and all verified facts kept unchanged.
- Localize JavaScript-owned strings for both AI dialogs: labels, placeholders, counters, validation, loading/failure/status text, prompts, and generated result text.
- Keep the four canonical English service category IDs for schema validation while rendering Spanish category labels, benefits, and email subjects on `/es/`.
- Link `/es/cv/` to the provided Spanish PDF (`ResumeJPSM-es.pdf` assumed); keep `ResumeJPSM.pdf` on the English CV.
- Publish all four entry points and the Spanish PDF from the same repository and Pages artifact, with locale metadata for search engines and assistive technology.
- Update project documentation to describe the four entry points and the new asset.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `site-audience-variants`: Expand from two English entry points to four static locale/audience entry points, add same-audience language links, and keep shared assets, verified facts, no-JS content, and one-way audience discovery.
- `improvement-match`: Add Spanish presentation and Spanish AI output for the portfolio inquiry while preserving the exact canonical service IDs and the English behavior.
- `job-match`: Add Spanish presentation and Spanish AI output for the recruiter comparison while preserving the existing result contract and the English behavior.

## Impact

Affected files include new Spanish HTML entry points, a user-provided Spanish PDF asset, locale-aware dialog strings and prompts, the Pages artifact copy list, and README route documentation. The English pages, shared design tokens, shared verified profile data, Gemini key injection, and no-build/static deployment model remain unchanged. No framework, runtime translation layer, backend, new service category, price, testimonial, booking link, or unsupported claim is introduced.
