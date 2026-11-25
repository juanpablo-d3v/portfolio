# Design

## Context

See `proposal.md` for motivation. The portfolio is a static two-page site with shared tokens in `styles/base.css`, section-scoped stylesheets imported by `styles/style.css`, and served HTML as the source of visible content. The current portfolio order is hero, projects, skills, then a progressive background-experience reveal. The refreshed Stitch source expresses a polished, quick-readable Services design with shorter copy, compact cards, and a simpler CTA, so its copy can be reused while its styling is translated into the site's Material 3 token system.

## Goals / Non-Goals

**Goals:**

- Add the approved Services section between hero and featured projects in served markup.
- Expose the section through a portfolio-only "Services" header link and `#services` fragment.
- Preserve the exact refreshed Stitch copy and CTA behavior.
- Reuse the existing typography, icon, color, radius, spacing, and transition tokens.
- Keep the section readable and operable without JavaScript from mobile through desktop widths.

**Non-Goals:**

- No changes to `/cv/`, audience data, job matching, profile config generation, or deployment.
- No Tailwind, CDN CSS, Stitch assets, remote images, new font sources, framework, build step, or runtime dependency.
- No new JavaScript module or JavaScript-rendered service content.
- No rewriting the Stitch copy into longer marketing text or alternate service labels.
- No long body paragraphs, "Great Fit If" labels, or technology footers from the superseded draft.
- No changes to featured project cards beyond moving their position in document order.

## Decisions

- **Add static HTML directly to `index.html`.**
  The section is portfolio-specific, content is fixed, and both audience specs require visible served markup. An alternative of rendering cards from a data module would add JavaScript dependence and duplicated audience logic without a maintenance benefit for one fixed section.

- **Create `styles/services.css` and import it from `styles/style.css`.**
  This follows the existing section-based CSS organization used by `projects.css`, `skills.css`, and `experience.css`. A single large edit to `sections.css` would blur section boundaries; using utility classes from a framework would violate project constraints.

- **Adopt the compact Stitch card structure.**
  Each card uses category, subtitle, one short lead, a three-item "What You Get" list, and a plain "Great Fit" footer. The superseded long body paragraphs and technology footers were removed in Stitch, so restoring them would contradict the approved design. Alternatives that kept the longer draft content were rejected.

- **Translate Stitch styling to existing tokens.**
  Stitch surface/primary/secondary/tertiary colors and radii map to `--md-sys-color-surface-container*`, `--md-sys-color-on-surface*`, `--md-sys-color-primary`, `--md-sys-color-secondary`, `--md-sys-color-tertiary`, `--md-sys-color-outline-variant`, and `--radius-*`. Gradients, borders, and footers stay token-based. Reusing Stitch's literal colors or inline styles would create a second visual system.

- **Use a responsive CSS grid with section-scoped media queries.**
  Cards use a native grid comparable to `skills.css`, with a narrower minimum card width and reduced gap from the polished Stitch version. Narrow-viewport rules provide single-column cards and CTA stacking without adding responsive JavaScript or external CSS plugins.

- **Use Material Symbols already configured for the site.**
  Card and CTA icons are decorative, marked hidden from assistive technology, and colored through tokens. This avoids raster images and remote Stitch assets while matching the existing icon pipeline.

- **Use a static mailto CTA.**
  The CTA matches the refreshed Stitch URL and keeps the contact path consistent with the static portfolio. A form, booking tool, or client-side controller would add dependencies and unverified process claims.

- **Keep the recruiter page untouched.**
  The recruiter page has its own priority order and must not gain a Services menu item. A shared component or cross-page insertion was rejected because the requirement is explicitly portfolio-only.

## Risks / Trade-offs

- The new section pushes project proof further down the page → mitigate with the "Services" header link, a clear `#services` fragment, compact card spacing, and a direct CTA.
- The refreshed copy is shorter but cards can still have uneven list lengths → use uniform card structure, equal grid alignment, and consistent "Great Fit" footers.
- Stitch colors and radii do not exactly match the live Material 3 palette → translate by role and token rather than copying literal values.
- Adding icons introduces visual noise → keep them decorative, token-colored, and `aria-hidden="true"`.
- A new stylesheet adds one import and one local CSS file → keep all service-specific rules in that file and avoid global selector changes.
- Served copy must remain exact → treat the refreshed spec scenarios as the copy checklist during implementation and review.

## Migration Plan

- Update the Services copy, card structure, and CTA in `index.html` to the refreshed Stitch version.
- Refine `styles/services.css` to the polished compact spacing and typography while keeping token-only styling and responsive rules.
- Verify the new section order, exact copy, accessible names, decorative icon handling, mailto CTA, and no-JavaScript visibility.
- Verify `/cv/` remains unchanged and contains no Services navigation link.
- Run repository validation and `openspec validate add-services-section --strict`.
- Roll back by reverting the `index.html`, `styles/style.css`, and `styles/services.css` changes; no data migration or deployment infrastructure change is involved.
