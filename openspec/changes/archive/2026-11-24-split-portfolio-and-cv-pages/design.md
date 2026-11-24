# Design

## Context

The site currently has one static `index.html` serving mixed freelance/consultant and recruiter signals. All styling and behavior are shared through `styles/style.css` and ES modules loaded by `scripts/main.js`. The GitHub Pages workflow publishes only `index.html` plus shared folders. The vacancy comparison is implemented as a recruiter-oriented feature and depends on a generated config module.

See proposal.md for motivation and the spec deltas for observable behavior. This design focuses on the file layout, asset sharing, and deployment approach.

## Goals / Non-Goals

**Goals:**

- Serve the portfolio at `/` and the recruiter CV at `/cv/` from one repository and one Pages deployment.
- Keep both pages fully static, browser-native, and readable without JavaScript.
- Reuse the existing Material 3 tokens, section styles, scripts, and image assets.
- Keep visible content grounded in verified facts already present in the project.
- Preserve the vacancy comparison on the recruiter page only.
- Keep the portfolio page focused on hero, projects, technical skills, and a revealable background experience section.
- Keep the recruiter projects section after experience and framed as personal side projects or learning experiments.
- Keep maintenance cost low by making the recruiter page a close derivative of the current page.

**Non-Goals:**

- Creating a second repository or second GitHub Pages site.
- Introducing a build step, templating engine, framework, or runtime dependency.
- Rendering page sections from JavaScript data.
- Adding rates, testimonials, booking links, availability counters, or invented process claims.
- Showing communication/languages, certifications, or interests on the portfolio page; the recruiter page keeps them.
- Rewriting the recruiter page beyond the agreed section reorder and project framing; the vacancy flow, CV download, and communication details remain unchanged.
- Adding a runtime audience toggle or query-parameter mode switch.

## Decisions

### 1. Two static entry points instead of one page with a mode switch

The portfolio is the default at `/`; the recruiter page lives at `/cv/`.

A runtime toggle would keep one URL but would weaken no-JavaScript behavior, complicate metadata and social previews, and risk flicker or state bugs. Two static pages make the audience explicit and keep each page's content in served HTML.

Alternative considered: one `index.html` with CSS/JS switching. Rejected because the project values progressive enhancement and static simplicity.

### 2. Keep the recruiter page close to the current page

`cv/index.html` starts from the current page structure. Its job-match dialog, CV download, experience timeline, skills, certifications, and communication details remain. Projects move after the experience timeline and are reframed as personal side projects or learning experiments. Changes are limited to audience-specific hero copy, metadata, navigation, asset paths, section order, and project framing; no Portfolio menu or footer link is kept on this page.

Alternative considered: fully restructuring the recruiter page. Rejected because it expands risk without changing the already strong recruiter flow.

### 3. Duplicate HTML, share everything else

Only the two HTML entry points are audience-specific. `styles/`, `scripts/`, `images/`, and `assets/` remain shared. Generated configuration stays in its current shared location because the Pages artifact is shared.

Alternative considered: extracting shared HTML fragments into a JavaScript renderer. Rejected because it would remove content from served HTML and add runtime complexity. A build-time templating step is also rejected because the project has no build tooling.

### 4. Variant-aware profile data for the AI prompt

The shared profile module exposes named variants: a candidate profile for recruiter comparison and a portfolio/consulting profile for any future non-AI use. The vacancy comparison imports the candidate variant only. Visible page copy remains in each HTML file.

Alternative considered: keeping a single candidate-framed profile. Rejected because the portfolio page would then carry language such as "availability for roles" that conflicts with its consultant framing.

### 5. Audience-specific controls and subtle cross-links

Each page keeps a navigation focused on its own sections. The portfolio hero keeps the email and GitHub actions but drops the vacancy-match control and LinkedIn option; its header drops the download-resume control. The recruiter page keeps the vacancy match, LinkedIn, and CV download but drops the Portfolio menu item and footer link. A quiet footer cross-link on the portfolio points to the recruiter view only. No top-level mode switch is added.

Alternative considered: mirroring all controls on both pages. Rejected because it reintroduces mixed audience signals.

### 6. Progressive reveal for background experience

The portfolio page places a discreet "Background experience" control after technical skills. The experience section remains in served HTML and is visible when JavaScript is unavailable. When JavaScript is available, a small section module collapses the experience section after load and toggles it in place, exposing expanded/collapsed state to assistive technology.

Alternative considered: a separate experience URL. Rejected because the user wants the information kept in the portfolio flow. Hiding it permanently without JavaScript is also rejected because it would remove content from non-JS visitors.

### 7. One deployment artifact

The Pages workflow copies both `index.html` and `cv/` into `_site`. Shared asset paths are written relative to each entry point: root assets resolve directly from `/`, and nested assets resolve with `../` from `/cv/`.

Alternative considered: a separate repository and Pages site. Rejected because the confirmed goal is shared design and shared verified facts; duplication would create two places to update the same information.

## Risks / Trade-offs

- **Markup duplication** -> Keep section markup identical where behavior is identical, and document that visible content lives in each HTML file.
- **Copy drift** -> Use a short review checklist for skills, experience, certifications, languages, and project facts when updating either page.
- **Relative asset path mistakes** -> Verify both entry points in a browser and check network requests for 404s.
- **Shared config artifact** -> The portfolio page must not load the vacancy comparison module or expose its controls; the generated config remains needed only by the recruiter page.
- **Reveal control accessibility** -> Use a real button with expanded state and a controlled region; verify keyboard operation and the no-JavaScript visible fallback.
- **Mixed metadata** -> Set distinct page title, description, and theme metadata for each entry point.
- **Perceived concurrent work** -> Frame recruiter projects as personal side projects or learning experiments after experience, so they read as technical evidence rather than current commercial commitments.
- **Rollback complexity** -> Keep the previous workflow and `index.html` recoverable from version control; rollback restores the prior artifact step and root page.

## Migration Plan

1. Create `cv/index.html` from the current `index.html` before rewriting the root page, preserving its recruiter flow and dialog markup.
2. Rewrite `index.html` as the portfolio page with hero, selected work, technical skills, the "Background experience" reveal control, experience content, and a minimal footer. Omit vacancy match, LinkedIn, download-resume, communication/languages, certifications, and interests from this page.
3. Adjust metadata and navigation; keep the portfolio-to-CV footer cross-link, remove the recruiter Portfolio menu and footer links, and move and reframe the recruiter projects section after experience.
4. Add variant-aware profile export(s) and update the vacancy comparison import.
5. Update shared styles and add the small section module needed for the reveal control, using existing tokens only.
6. Update the Pages artifact step to copy `cv/`, then update README deployment notes.
7. Verify both pages at desktop and mobile widths, with JavaScript enabled and disabled, and confirm shared assets resolve without 404s.
8. Deploy and smoke-test `/` and `/cv/`; rollback by restoring the prior root page and workflow from version control.
