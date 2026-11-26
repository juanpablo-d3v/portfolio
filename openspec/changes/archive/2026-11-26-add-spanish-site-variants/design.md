# Design

## Context

The site currently serves two static audience entry points, `/` and `/cv/`, with shared styles, scripts, images, and verified profile data. Visible content lives in served HTML; JavaScript owns dialog behavior, prompts, validation, and status text. See `proposal.md` for motivation and the delta specs for the behavior contract.

Constraints: vanilla HTML/CSS/JS ES modules, no bundler, no build step, no runtime translation service, existing Material 3 tokens, existing Material Symbols font, no hard-coded CSS palette colors, no CSS `url()`, and no features below roughly 90% browser support. `scripts/config.js` remains generated and gitignored.

## Goals / Non-Goals

**Goals:**

- Keep English pages as the unchanged global-market entry points.
- Serve fully formed Spanish portfolio and recruiter HTML at `/es/` and `/es/cv/`.
- Preserve one-way portfolio-to-CV discovery inside each locale.
- Keep locale switching as a plain same-audience link, not a runtime locale engine.
- Localize dialog text, AI prompts and output, email subjects, and the Spanish CV download.
- Keep canonical service IDs and result schemas unchanged.

**Non-Goals:**

- No client-side DOM translation or locale state machine.
- No translated URLs such as `/portafolio/` or `/curriculum/`.
- No changes to English copy, English result behavior, or the English PDF.
- No new service categories, claims, pricing, availability, testimonials, or booking flow.
- No backend, endpoint, analytics, persistence, or new runtime dependency.
- No redesign of the existing visual system.

## Decisions

### 1. Add static Spanish entry points

Create `/es/index.html` and `/es/cv/index.html` as complete mirrors of the English pages, with localized visible copy and correct relative asset paths. `/es/` is one directory deep and `/es/cv/` is two directories deep, so each page resolves shared styles, scripts, images, and the PDF from its own base path.

**Alternatives considered:**

- Runtime language toggle that rewrites the DOM: rejected because it conflicts with no-runtime-switching conventions, weakens no-JavaScript content, and doubles the testing surface of every interaction.
- A single bilingual page per audience: rejected because it blurs locale identity, complicates metadata, and makes direct sharing harder.
- Localized path names: rejected because `/es/` keeps the audience route stable across locales.

### 2. Use a same-audience header language link

Every page gets a small header link to the matching audience in the other locale: `/ <-> /es/` and `/cv/ <-> /es/cv/`. Audience discovery remains one-way: each portfolio footer links to its matching-locale CV, and neither CV links back to a portfolio. On the CV, the language link is not a portfolio menu item.

**Alternatives considered:**

- A global locale switcher on every page that also changes audience: rejected because it collapses the two axes and can expose portfolio links on recruiter pages.
- Footer-only language links: rejected because they are not discoverable early enough for a Spanish-speaking visitor.
- Browser-language auto-redirect: rejected because it overrides visitor intent and can send global-market visitors to the wrong locale.

### 3. Keep visible copy in HTML; localize only JavaScript-owned strings in data

The four HTML pages own their visible section copy. Shared JavaScript receives locale-specific strings for dialog labels, validation, counters, loading and failure messages, status announcements, result headings, email subjects, and prompts. Shared behavior stays in the existing modules; no module renders section content from data.

**Alternatives considered:**

- Translating the DOM at runtime from a dictionary: rejected because existing specs require complete served markup.
- Duplicating all dialog classes per locale: rejected because it risks behavior drift.
- Hard-coding locale branches inside dialog lifecycle code: rejected because it mixes presentation copy with state handling.

### 4. Separate canonical service IDs from Spanish presentation labels

The improvement schema keeps the exact canonical IDs `Web Applications`, `Process Automation`, `System Modernization`, and `Support & Stability`. The Spanish catalog presentation maps them to `Aplicaciones web`, `Automatización de procesos`, `Modernización de sistemas`, and `Soporte y estabilidad`. Benefits remain approved catalog items rendered in the active locale. The Spanish mailto subject is `Consulta de mejora`; English stays `Improvement Inquiry`.

**Alternatives considered:**

- Translating the IDs returned by the model: rejected because it breaks strict validation and existing English behavior.
- Maintaining two unrelated catalogs: rejected because benefit keys and approval state would drift.
- Showing English service names on Spanish pages: rejected because it leaves a visible English island in the Spanish result.

### 5. Localize AI prompts and output without changing schemas

Both prompt builders instruct the model to write visitor-facing text in the active locale. The response schemas, bounds, forbidden-claim checks, and canonical enum values remain identical. Spanish output is validated with the same rules as English output; locale affects language only, not the contract.

**Alternatives considered:**

- Leaving prompts in English and translating results in the browser: rejected because it adds a translation surface and can distort meaning.
- Creating separate result schemas per locale: rejected because it invites validation drift.

### 6. Use a Spanish PDF supplied by the visitor

`/es/cv/` links to `ResumeJPSM-es.pdf`, supplied by the visitor before implementation. The English CV continues to link to `ResumeJPSM.pdf`. If the supplied file has another name, it is renamed to this artifact name during implementation so paths stay stable.

**Alternatives considered:**

- Translating the English PDF automatically: rejected because credential and role wording needs verified human review.
- Keeping the English PDF on both CV pages: rejected because it breaks the Spanish deliverable at the download action.
- Removing the download action from `/es/cv/`: rejected because it weakens the recruiter flow.

### 7. Keep shared cooldown state across locales

Existing cooldown keys remain shared across locales. Switching language pages does not reset a cooldown, so a visitor cannot bypass quota limits by changing locale.

**Alternatives considered:**

- Locale-scoped cooldown keys: rejected because it allows repeated AI requests by switching pages.
- Removing cooldown on Spanish pages: rejected because it diverges from existing safety behavior.

### 8. Add locale metadata and deploy atomically

Each page declares `lang="en"` or `lang="es-MX"` and exposes `alternate` hreflang links for the matching audience in the other locale. The Pages workflow copies the new directories and Spanish PDF into `_site` alongside the existing artifact. README route documentation is updated with the four URLs.

**Alternatives considered:**

- Relying only on visible language links: rejected because search engines and assistive technology need explicit locale signals.
- Adding a build or sitemap generator: rejected because the site intentionally has no build step.

## Risks / Trade-offs

- **Copy drift across four pages** → Use a page-by-page translation review against verified facts and the English source; keep claims identical and only localize presentation.
- **Relative path mistakes at `/es/` and `/es/cv/`** → Verify styles, scripts, images, PDF, and module imports from every route.
- **AI output leaks English into Spanish pages** → Put locale instructions in both prompts and add browser checks for Spanish result text.
- **English behavior regression** → Keep canonical IDs, schemas, English strings, and the English PDF unchanged; verify both English routes after implementation.
- **Spanish PDF unavailable at implementation time** → Treat the supplied asset as an input gate; do not substitute the English PDF.
- **Duplicate page maintenance** → Accept static duplication as the cost of no build step and complete served HTML; keep locale-specific JavaScript strings centralized.
- **Shared cooldown surprises a visitor who switches locale** → Accept as quota protection and document it in design, not as a user-facing error.

## Migration Plan

Add the Spanish HTML, PDF asset, locale-string data, prompt changes, workflow copy entries, and documentation in one change. Deploy all updated static files atomically so language links never point to missing routes. Roll back by removing the `/es/` routes, the Spanish PDF, and the workflow/documentation entries; English pages and shared behavior remain intact. No server, data, or secret migration is required.

## Open Questions

None. The Spanish PDF artifact name is fixed as `ResumeJPSM-es.pdf` for this change.
