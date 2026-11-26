# Tasks

## 1. Portfolio structure and navigation

- [x] 1.1 Add a "Services" link with `href="#services"` to the portfolio header navigation before the Projects link and verify that `/cv/` has no Services link.
- [x] 1.2 Add a static `<section class="services-section" id="services" aria-labelledby="services-title">` immediately after the hero and before the projects section, and verify `index.html` document order is hero, Services, projects, skills, experience.
- [x] 1.3 Add the "Services & Solutions" level-two heading with `id="services-title"` and the approved intro copy, and verify the visible text matches the services-section spec exactly.
- [x] 1.4 Add four service cards in the approved order with exact category labels, subtitles, short leads, "What You Get" lists, and "Great Fit" footers, and verify no long body paragraphs or technology footers remain.
- [x] 1.5 Add the closing CTA with the exact heading, body, and "Tell Me What to Improve" label, and verify its `mailto:hello@juanpablo.dev?subject=Improvement%20Inquiry` target.

## 2. Native responsive styling

- [x] 2.1 Create `styles/services.css` with section, title, intro, grid, and card styles built only from existing Material 3 color, typography, radius, spacing, and transition tokens, and verify the file contains no hard-coded palette colors, CSS `url()`, CDN import, or remote asset reference.
- [x] 2.2 Style card icons, category badges, headings, checklists, and "Great Fit" footers to match the existing project/skill card language, and verify decorative icons are hidden from assistive technology.
- [x] 2.3 Style the closing CTA using the same token-based surface, border, radius, and focus treatment as existing links, and verify the CTA is keyboard reachable with a visible focus state.
- [x] 2.4 Add section-scoped responsive rules for card grid reflow and CTA stacking, and verify the section remains readable and non-overlapping at 375px, 768px, and desktop widths.
- [x] 2.5 Import `styles/services.css` from `styles/style.css` in the section stylesheet sequence before responsive and utility overrides, and verify the local stylesheet resolves from the served page.

## 3. Integration verification

- [x] 3.1 Verify the portfolio works with JavaScript disabled: all Services cards, checklists, "Great Fit" footers, and CTA are visible and the header link scrolls to `#services`.
- [x] 3.2 Verify no new JavaScript module, runtime dependency, form, booking tool, Tailwind/CDN stylesheet, Stitch asset, or remote service image was introduced.
- [x] 3.3 Verify `/cv/` files remain unchanged by this change and contain no Services section or Services navigation link.
- [x] 3.4 Run `git diff --check` and verify no whitespace errors in the implementation diff.
- [x] 3.5 Run `openspec validate add-services-section --strict` and verify the change passes strict validation.

## 4. Polished Stitch services refresh

- [x] 4.1 Replace the section intro and all four card copy with the refreshed Stitch text from the services-section spec and verify every exact string is present.
- [x] 4.2 Remove the superseded long body paragraphs and technology footer markup, rename the "Great Fit If" label to "Great Fit", and verify none of the old copy or labels remain in the Services section.
- [x] 4.3 Update the CTA heading, body, button label, and mailto target to the refreshed Stitch version and verify the exact `Improvement Inquiry` subject.
- [x] 4.4 Refine `styles/services.css` to the polished compact typography, spacing, and footer treatment while keeping token-only styling and responsive rules, and verify no hard-coded colors, CSS `url()`, or CDN imports were added.
- [x] 4.5 Run `git diff --check` and `openspec validate add-services-section --strict`, then verify the apply progress reaches 20/20 tasks complete.
