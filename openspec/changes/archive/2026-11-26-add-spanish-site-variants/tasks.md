# Tasks

## 1. Spanish asset and locale data foundation

- [x] 1.1 Add the visitor-provided Spanish resume as `ResumeJPSM-es.pdf` at the repository root and verify it is a readable PDF available for `/es/cv/` to link.
- [x] 1.2 Add a locale-string data module under `scripts/data/` for Spanish dialog labels, notices, validation, counters, status text, action labels, mailto subjects, and approved Spanish service labels; verify the four canonical service IDs remain `Web Applications`, `Process Automation`, `System Modernization`, and `Support & Stability` and no English dialog string changes.
- [x] 1.3 Add locale metadata values for English and Spanish page identity and same-audience alternate routes; verify the mapping is `/ <-> /es/` and `/cv/ <-> /es/cv/` with no audience change.

## 2. Static Spanish entry points

- [x] 2.1 Add `es/index.html` as a complete Spanish portfolio mirror with `lang="es-MX"`, localized metadata, a header language link, a localized Services navigation link, all existing sections in served HTML, and a footer cross-link to `/es/cv/`; verify the served markup contains complete content without JavaScript and no runtime locale selector.
- [x] 2.2 Add `es/cv/index.html` as a complete Spanish recruiter mirror with `lang="es-MX"`, localized metadata, a header language link, localized navigation and hero actions, vacancy comparison, skills, experience, projects, certifications, communication, interests, and a download action pointing to `ResumeJPSM-es.pdf`; verify there is no Portfolio menu item, Services item, or portfolio footer link.
- [x] 2.3 Add same-audience header language links to `index.html` and `cv/index.html`; verify `/` links to `/es/`, `/cv/` links to `/es/cv/`, and all English copy and controls remain unchanged.
- [x] 2.4 Verify every shared stylesheet, script module, image, and PDF URL resolves from `/`, `/cv/`, `/es/`, and `/es/cv/` with no missing asset.

## 3. Spanish improvement inquiry

- [x] 3.1 Update the improvement prompt builder to request Spanish visitor-facing output on the Spanish portfolio while keeping the existing schema, bounds, forbidden-claim checks, and canonical service IDs; verify the English prompt path is unchanged.
- [x] 3.2 Wire Spanish locale strings and approved Spanish service labels into the improvement dialog; verify the Spanish CTA says `Dime qué mejorar`, the dialog opens with Spanish labels, a successful result shows `Aplicaciones web`, `Automatización de procesos`, `Modernización de sistemas`, or `Soporte y estabilidad`, and the email brief uses subject `Consulta de mejora`.
- [x] 3.3 Verify Spanish counter, validation, privacy, loading, failure, status, result-action, and cooldown labels while the shared cooldown still blocks repeat requests across locale switches; verify no English visitor-facing string remains in the Spanish inquiry flow.

## 4. Spanish vacancy comparison

- [x] 4.1 Update the vacancy comparison prompt builder to request Spanish matched skills, gaps, and rationale on `/es/cv/` while keeping the 0-100 score, canonical verdict values, and validation unchanged; verify the English prompt path is unchanged.
- [x] 4.2 Wire Spanish locale strings and the Spanish PDF download into the job-match dialog; verify the Spanish hero control opens a localized dialog, results and failure views use Spanish text and link to `ResumeJPSM-es.pdf`, and English behavior stays unchanged.
- [x] 4.3 Verify Spanish field validation, counter, privacy notice, loading and failure text, status announcements, result headings, verdict display, action labels, and cooldown feedback; verify focus movement and no-result failure behavior remain intact.

## 5. Deployment and integration verification

- [x] 5.1 Update `.github/workflows/pages.yml` so the Pages artifact copies `es`, `es/cv`, and `ResumeJPSM-es.pdf` alongside the existing site files; verify the prepared `_site` artifact contains all eight expected routes/assets: `/`, `/cv/`, `/es/`, `/es/cv/`, both PDFs, styles, and scripts.
- [x] 5.2 Update `README.md` with the four local routes, the Spanish PDF asset, and the one-way discovery/language-link conventions; verify the documented `python3 -m http.server 8080` flow opens all four listed URLs.
- [x] 5.3 Verify the full static site with JavaScript enabled and disabled across all four routes, including language links, one-way audience discovery, complete served markup, asset resolution, localized dialog success/failure paths, PDF downloads, and unchanged English pages.
- [x] 5.4 Run final checks with `git diff --check`, `openspec validate add-spanish-site-variants --strict`, and a served-page review; verify no secrets, unsupported claims, new dependencies, build step, runtime translation service, or unintended English-page changes were introduced.
