# Proposal

## Why

The portfolio currently moves directly from the hero into project proof without explicitly stating which client services are available. The refreshed Stitch reference supplies a polished, quicker-to-read "Services & Solutions" section that explains the engagement menu before visitors evaluate selected work.

## What Changes

- Add a static portfolio-only Services section titled "Services & Solutions" immediately after the hero and before featured projects.
- Use the refreshed approved Stitch copy and labels: the section intro, four compact cards (Web Applications, Process Automation, System Modernization, Support & Stability), short leads, "What You Get" lists, "Great Fit" footers, and the closing CTA; do not restore the removed long body paragraphs or technology footers.
- Add a portfolio header navigation link labeled "Services" targeting the new section.
- Implement the section with semantic served HTML, existing Material 3 design tokens, a new section-scoped stylesheet, and local Material Symbols already used by the site.
- Keep `/cv/` unchanged and do not add Tailwind, CDN CSS, remote images, new runtime dependencies, or JavaScript required for content visibility.
- Update the audience-variant requirements so the portfolio priority and navigation include the new client-facing service menu.
- Update the projects-section requirement so featured projects remain before technical skills but follow the new Services section.

## Capabilities

### New Capabilities

- `services-section`: portfolio-only static service menu using the approved Stitch copy, four outcome-led cards, section CTA, and native styling.

### Modified Capabilities

- `site-audience-variants`: portfolio page priority and navigation now include a service menu while the recruiter page remains unchanged.
- `projects-section`: portfolio featured projects move from immediately after the hero to immediately after Services and still before technical skills.

## Impact

- `index.html`: add the Services section after the hero and add the "Services" header link.
- `styles/services.css`: new native CSS for the section, cards, callouts, CTA, and responsive behavior.
- `styles/style.css`: import the new section stylesheet in the established order.
- `styles/responsive.css` or section-scoped media queries: narrow-viewport behavior for the card grid and CTA.
- OpenSpec specs: add `services-section` delta and update `site-audience-variants` and `projects-section` deltas.
- No API, dependency, build-step, runtime audience switching, or `/cv/` content changes.
