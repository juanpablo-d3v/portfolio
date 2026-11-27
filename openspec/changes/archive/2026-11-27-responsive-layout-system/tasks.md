# Tasks

## 1. Responsive foundation

- [x] 1.1 Reorder `styles/style.css` so `responsive.css` is imported after utilities and dialog styles, and verify the resulting import order in the file.
- [x] 1.2 Establish shared responsive bands at 640px, 768px, 1024px, and 1280px in the final responsive layer, and verify that each band is represented by an explicit rule group.
- [x] 1.3 Add shared container, padding, wrapping, and overflow-containment rules, and verify that all four entry points avoid horizontal document scrolling at 320px.
- [x] 1.4 Preserve Material 3 tokens, document language, locale metadata, language links, and audience links, and verify that responsive rules contain no color or font token replacements.

## 2. Mobile navigation

- [x] 2.1 Add a localized native disclosure menu with audience-specific section links to `index.html` and `es/index.html`, and verify that all portfolio navigation targets are present in served markup.
- [x] 2.2 Add a localized native disclosure menu with audience-specific section links to `cv/index.html` and `es/cv/index.html`, and verify that all recruiter navigation targets are present in served markup.
- [x] 2.3 Style the disclosure summary and expanded link panel in the final responsive layer, and verify visible focus, adequate hit area, and no header overflow at 320px and 768px.
- [x] 2.4 Extend `scripts/nav.js` to close the disclosure after in-page navigation when JavaScript is available, and verify that keyboard activation works and links remain usable with JavaScript disabled.

## 3. Header, hero, and shell

- [x] 3.1 Make the header logo, icon links, language link, PDF link, and share control shrink or wrap safely, and verify no overlap at 320px, 390px, and 768px on all four pages.
- [x] 3.2 Reflow hero copy and CTA groups into wrapped or stacked layouts, and verify that email, share, LinkedIn, PDF, and vacancy controls remain reachable at 320px.
- [x] 3.3 Replace fixed-height hero viewport behavior with a mobile-safe fallback, and verify that hero content remains visible when browser chrome reduces the visual viewport.

## 4. Portfolio section reflow

- [x] 4.1 Reflow portfolio services cards and CTA into stacked phone layouts and controlled multi-column tablet layouts, and verify both English and Spanish services sections at 320px, 640px, and 1024px.
- [x] 4.2 Reflow portfolio projects and skills cards with readable card widths and wrapped metadata, and verify that long Spanish labels do not overflow at 320px.
- [x] 4.3 Reflow the portfolio experience reveal control and experience cards into single-column narrow layouts, and verify that reveal state and static no-JS visibility still match the existing contract.

## 5. Recruiter section reflow

- [x] 5.1 Reflow recruiter experience, projects, and skills sections into phone and compact-tablet layouts, and verify that contact, LinkedIn, PDF, and vacancy actions remain reachable on both locales.
- [x] 5.2 Reflow certifications and interests into narrow-screen layouts with controlled gaps and wrapped text, and verify no clipping at 320px and 640px.
- [x] 5.3 Verify that the recruiter pages still contain no portfolio or services navigation after responsive markup changes at every breakpoint.

## 6. Dialogs and interactive controls

- [x] 6.1 Reflow the job-match dialog for narrow viewports with viewport-safe height, internal scrolling, wrapped long text, and reachable actions, and verify input, loading, result, and close states at 360px.
- [x] 6.2 Reflow the improvement dialog for narrow viewports with viewport-safe height, internal scrolling, wrapped long text, and reachable actions, and verify input, loading, result, and close states at 360px.
- [x] 6.3 Apply minimum 44px touch targets or equivalent spacing to icon-only and compact controls, and verify hit areas on header, hero, cards, dialogs, and footer at 390px.
- [x] 6.4 Preserve visible focus indicators for all interactive controls, and verify keyboard focus is visible in the mobile menu, dialogs, CTAs, and footer at narrow and wide widths.

## 7. Motion and text scaling

- [x] 7.1 Apply reduced-motion handling to global smooth scrolling, scripted scrolling, entrance animations, icon rotation, card transitions, and dialog transitions, and verify no tracked animation runs when reduced motion is requested.
- [x] 7.2 Preserve user zoom and increased text size behavior, and verify that all four entry points remain readable and horizontally scroll-free with increased text at 320px.

## 8. Documentation and integration verification

- [x] 8.1 Update `README.md` with responsive breakpoints, mobile-menu conventions, final responsive-layer import order, and no-framework constraints, and verify the documented rules match the implementation.
- [x] 8.2 Serve the repository locally and verify all four entry points, styles, scripts, and images return 200 responses at 320px, 360px, 390px, 640px, 768px, 1024px, and 1280px.
- [x] 8.3 Verify the responsive system with JavaScript enabled and disabled, and confirm that document language, alternate locale metadata, audience-specific navigation, language links, and PDF targets remain unchanged.
- [x] 8.4 Run `git diff --check` and any available project lint or validation commands, and verify there are no whitespace errors or project-specific validation failures.
