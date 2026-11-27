# Proposal

## Why

The four static entry points currently rely on scattered, partial responsive rules, and the only in-page navigation disappears below 768px without a replacement. The updated Stitch reference shows a denser mobile layout and clearer breakpoint behavior that should be translated into the existing site without introducing a CSS or JS framework.

## What Changes

- Add a cross-cutting responsive layout capability for all four entry points: `/`, `/cv/`, `/es/`, and `/es/cv/`.
- Introduce an accessible collapsible mobile menu that exposes the audience-specific navigation links on narrow viewports while preserving the existing desktop navigation semantics.
- Define a coherent responsive system for header, hero, services, projects, skills, experience reveal, certifications, interests, footer, and both AI dialogs.
- Translate Stitch's responsive structure, spacing rhythm, card density, and stacking behavior into vanilla CSS while preserving the current Material 3 design tokens.
- Consolidate shared responsive rules into a final responsive layer so they can override earlier utilities and dialog styles, while section stylesheets retain their base presentation rules.
- Improve narrow-screen usability with safer wrapping, controlled overflow, adequate tap targets, readable typography, and reduced-motion coverage.

## Capabilities

### New Capabilities

- `responsive-layout`: Cross-page responsive behavior for the static site, including breakpoint-driven layout, mobile navigation, section reflow, dialog sizing, touch and focus targets, and motion preferences.

### Modified Capabilities

None.

## Impact

- HTML: all four entry points gain the mobile navigation structure and any required viewport-safe markup hooks.
- CSS: `styles/style.css`, `styles/responsive.css`, and section stylesheets across header, hero, sections, skills, services, projects, experience, certifications, interests, footer, utilities, and dialogs.
- JavaScript: `scripts/nav.js` and related progressive-enhancement modules may gain mobile-menu state handling; no external dependencies.
- Compatibility: no build step, CSS framework, JS framework, or new runtime service. Existing locale bootstrap, content, and verified profile data remain unchanged.
