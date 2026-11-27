# Design

## Context

See `proposal.md` for motivation. The current site uses shared Material 3 tokens and section-oriented CSS, but responsive rules are split across section files and a single early `responsive.css` block. The only navigation markup is `.header-nav-desktop`, which is hidden below 768px with no replacement. The Stitch reference is useful for responsive structure and density, but its Tailwind utilities and alternate palette are not compatible with this project's no-framework constraint and existing visual system.

## Goals / Non-Goals

**Goals:**

- Give all four entry points one coherent responsive system from 320px through wide desktop widths.
- Provide discoverable, accessible narrow-viewport navigation without adding a framework or build step.
- Make section layouts, dialogs, and interactive controls usable at narrow widths and larger text sizes.
- Preserve audience, locale, content, verified facts, and Material 3 tokens at every breakpoint.
- Reduce cascade ambiguity by establishing one final responsive layer.

**Non-Goals:**

- No visual rebrand, palette swap, or font replacement from the Stitch reference.
- No new CSS framework, JS framework, package install, bundler, or remote layout runtime.
- No changes to profile data, verified claims, language negotiation, or AI service behavior.
- No redesign of desktop information architecture beyond what is needed for responsive reflow.

## Decisions

### Use native disclosure markup for mobile navigation

Each entry point will gain a narrow-viewport navigation disclosure using native `<details>` and `<summary>` semantics, with audience-specific links in served markup. A small progressive-enhancement handler will close the disclosure when a link is activated; without JavaScript the links remain reachable and the disclosure still works.

Alternatives considered:

- Button plus JavaScript-only menu: familiar, but basic navigation would depend on JavaScript and still require ARIA state synchronization.
- Always-visible scrollable nav strip: simple and no-JS friendly, but consumes permanent vertical space and weakens the hero experience.
- Fixed bottom navigation: thumb-friendly, but visually heavy and more likely to cover content or dialogs.

Rationale: native disclosure provides keyboard support and expanded/collapsed semantics for free, matching the no-framework constraint and the requirement that navigation remain available without JavaScript.

### Move the shared responsive layer to the end of the cascade

`styles/style.css` will import `responsive.css` after utilities and dialog styles. Section stylesheets keep base presentation and tightly scoped component rules; shared breakpoint changes, shell layout, overflow containment, focus/touch sizing, and motion overrides live in the final responsive layer.

Alternatives considered:

- All media queries in one file: easy to audit, but creates a large file detached from component context.
- Responsive rules only beside section styles: most local, but inconsistent breakpoints and repeated overrides make cascade conflicts harder to control.

Rationale: the hybrid approach preserves modular base styles while giving responsive behavior a predictable final authority.

### Translate Stitch structure, not its framework output

The implementation will translate Stitch's stacking rhythm, container behavior, card density, and breakpoint intent into existing class names and custom properties. Tailwind utility strings, the Tailwind CDN, the Stitch palette, and the Inter/Fira Code typography stack will not be imported.

Alternatives considered:

- Copy generated Tailwind markup: fastest visual match, but violates the no-framework constraint and duplicates a parallel styling system.
- Full visual rebrand to Stitch tokens: higher fidelity to the reference, but changes the shared Material 3 identity and expands the spec impact.

Rationale: the request is for responsive layout and UX, not a new visual identity.

### Standardize breakpoint bands

The responsive layer will use shared breakpoint bands at 640px, 768px, 1024px, and 1280px. Layouts will use fluid primitives such as `clamp`, `minmax`, `flex-wrap`, and container-relative widths so they behave between breakpoints instead of only at exact widths.

Typical bands:

- Below 640px: single-column sections, stacked cards, full-width primary actions.
- 640px to 767px: compact card grids and reduced padding, with mobile navigation still present.
- 768px to 1023px: desktop navigation and two-column card grids where readable.
- 1024px and above: expanded multi-column presentation with existing container caps.
- 1280px and above: widest approved grid density.

### Preserve accessibility while increasing density

The responsive layer will add explicit focus-visible treatment, minimum touch targets of 44 CSS pixels or equivalent spacing, reduced-motion handling for all animated surfaces, and viewport metadata that allows zoom. Scroll behavior and animation modules will respect `prefers-reduced-motion` instead of only CSS transitions.

### Keep locale and audience behavior immutable

Responsive markup will be mirrored across all four entry points with localized labels and identical section targets. Mechanical changes may not alter document language, alternate locale metadata, header language links, portfolio/recruiter cross-links, PDF targets, or verified copy.

## Risks / Trade-offs

- [Duplicated disclosure markup across four HTML files] → Keep the structure identical and localized; verify all four entry points in the test matrix.
- [Native `<details>` styling can vary by browser] → Use conservative CSS with explicit summary focus and marker removal; validate keyboard and touch behavior.
- [Moving `responsive.css` later can override dialog or utility styles unintentionally] → Audit the full cascade and keep overrides scoped to responsive concerns.
- [Spanish labels are longer than English labels] → Test header, nav, buttons, and cards at 320px and increased text size on Spanish pages.
- [Denser mobile cards can reduce readability] → Prefer stacking over forcing two columns when text would become cramped.
- [Reduced-motion behavior spans CSS and JS] → Add a shared `matchMedia` check for scripted scrolling and animations rather than relying only on CSS.
- [Dialogs were not present in the Stitch reference] → Design narrow-screen behavior directly from the current dialog contracts and accessibility requirements.
- [A final responsive layer may become large] → Keep only cross-cutting and breakpoint-level rules there; leave component-specific base styling in section files.

## Migration Plan

1. Introduce the mobile disclosure markup and shared responsive hooks in all four HTML entry points.
2. Reorder the stylesheet import so the shared responsive layer is last.
3. Consolidate breakpoint, shell, overflow, touch-target, and reduced-motion rules in `responsive.css`.
4. Adjust section-level base styles only where a component cannot reflow through shared rules.
5. Add progressive JavaScript to close the disclosure after in-page navigation and to respect reduced motion for scripted effects.
6. Verify at 320px, 360px, 390px, 640px, 768px, 1024px, and 1280px on all four entry points, with JavaScript enabled and disabled.
7. Roll back by reverting the change commit; no content, data, or deployment migration is required.
