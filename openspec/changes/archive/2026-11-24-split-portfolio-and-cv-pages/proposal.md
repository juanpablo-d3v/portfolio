# Proposal

## Why

The current single page mixes two different goals: attracting freelance/consulting work and supporting a recruiter-led hiring process. One hero, one navigation, and one set of calls to action cannot clearly answer both "what can you build for my team?" and "why should you be hired?" The site needs two audience-specific entry points while keeping one shared design system and one verified source of facts.

## What Changes

- **BREAKING**: `index.html` becomes the freelance/consultant portfolio at `/`, aimed at enterprise web teams, with a hero, featured projects, technical skills, a discreet "Background experience" reveal control, and a minimal footer.
- The portfolio hero omits the vacancy-match control and LinkedIn option, and the portfolio header omits the download-resume control. The recruiter page keeps all three.
- The portfolio page omits communication/languages, certifications, and interests. Those sections remain on the recruiter page.
- Add `cv/index.html` as the recruiter/employment web CV at `/cv/`, derived from the current page and keeping the vacancy match feature, CV download, skills, experience, certifications, communication details, and projects reframed as side or learning experiments after the experience timeline.
- Add a reveal-in-place experience control after technical skills on the portfolio page. With JavaScript disabled the experience section remains visible; with JavaScript enabled it is collapsed and revealed by the control.
- Share the existing Material 3 tokens, section styles, scripts, and image assets between both pages; keep visible section content in served HTML so both pages work without JavaScript.
- Reframe visible copy to verified facts only: real Fresnal case study, existing technical skills, and employment history. Do not add rates, testimonials, booking links, or process claims that are not currently supported.
- Move the "Match a vacancy" entry point and candidate-framed `cvProfile.js` copy to the recruiter page; introduce variant-aware profile data so the AI comparison retains candidate framing only where it is used.
- Add a one-way cross-link from the portfolio to the recruiter CV, omit the Portfolio menu and footer links from the recruiter page, and update page metadata, navigation, README, and the GitHub Pages artifact step to publish both entry points.
- Add spec coverage for two static audience variants and update the existing projects-section, job-match, and web-modular-structure requirements that change with the split.

## Capabilities

### New Capabilities

- `site-audience-variants`: Two static, audience-specific entry points sharing design and verified facts: a focused portfolio at `/` and a full recruiter web CV at `/cv/`.

### Modified Capabilities

- `projects-section`: The portfolio keeps "Featured Projects & Solutions" as primary proof; the recruiter page uses "Side Projects & Learning Experiments" after experience and frames the work as personal side projects or learning experiments.
- `job-match`: The vacancy comparison entry point is recruiter-only and must not appear on the portfolio page.
- `web-modular-structure`: Shared profile data becomes variant-aware while preserving static HTML as the source of visible content and the existing no-build module conventions.

## Impact

- `index.html`: rewritten as the portfolio page.
- `cv/index.html`: new recruiter page derived from the current structure.
- `styles/` and `scripts/`: shared assets with small variant-specific profile support and a progressive-enhancement reveal handler; no new framework, bundler, or runtime dependency.
- `scripts/data/cvProfile.js`: variant-aware or split profile copy for the vacancy comparison prompt.
- `.github/workflows/pages.yml`: publish `cv/` alongside `/`.
- `README.md`, page metadata, navigation, and the one-way portfolio-to-CV cross-link.
- Durable specs for audience variants, projects, vacancy matching, and modular structure.
