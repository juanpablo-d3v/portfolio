# responsive-layout Specification

## Purpose

Defines the cross-page responsive behavior that keeps the static CV site readable, navigable, and visually coherent from small phones through desktop viewports.

## Requirements

### Requirement: Shared responsive viewport system

All four entry points SHALL use the same responsive breakpoints, container behavior, spacing rhythm, and no-overflow rules. The site SHALL apply layout changes at shared breakpoint widths including 640px, 768px, 1024px, and 1280px, and SHALL preserve the existing Material 3 design tokens and locale/audience semantics at every width. No entry point SHALL require horizontal document scrolling at viewport widths of 320px or greater.

#### Scenario: Narrow phone width

- **WHEN** any entry point is rendered at a 320px viewport width
- **THEN** its header, sections, and footer fit without horizontal document scrolling

#### Scenario: Shared breakpoint behavior

- **WHEN** any two entry points are rendered at the same breakpoint width
- **THEN** their container widths, section padding rhythm, and column-count changes follow the same responsive rules

#### Scenario: Token continuity

- **WHEN** responsive styles are applied at any breakpoint
- **THEN** the Material 3 colors, fonts, radii, and spacing tokens remain the same as the desktop presentation

#### Scenario: Locale and audience preservation

- **WHEN** the viewport width changes on any entry point
- **THEN** its document language, visible copy, audience-specific navigation, language link, and download target remain unchanged

### Requirement: Accessible mobile navigation

Each entry point SHALL expose its audience-specific navigation links on narrow viewports through a collapsible control with an accessible name and an exposed expanded or collapsed state. The control and its links SHALL be present in served markup, reachable by keyboard, and usable to reach the same section targets as the desktop navigation. When JavaScript is unavailable, the navigation links SHALL remain discoverable and reachable. When enhanced behavior is available, activating a navigation link SHALL close the menu as navigation occurs.

#### Scenario: Narrow viewport menu

- **WHEN** an entry point is rendered below the desktop navigation breakpoint
- **THEN** a labeled collapsible control exposes the audience-specific navigation links appropriate to that page

#### Scenario: Expanded state is exposed

- **WHEN** a visitor opens or closes the mobile menu
- **THEN** the control's exposed state matches whether its links are visible

#### Scenario: Keyboard access

- **WHEN** a keyboard user focuses the mobile menu control and its links
- **THEN** each control has a visible focus indicator and activates with the expected keyboard interaction

#### Scenario: JavaScript unavailable

- **WHEN** any entry point is loaded without JavaScript on a narrow viewport
- **THEN** its navigation links remain discoverable and reachable

#### Scenario: Navigation closes the menu

- **WHEN** enhanced JavaScript behavior is available and a visitor activates a mobile navigation link
- **THEN** the menu closes as the browser moves to the linked section

### Requirement: Responsive section reflow

The site SHALL reflow the header, hero, services, projects, skills, experience reveal, certifications, interests, and footer so primary content is never hidden solely because of viewport width. Narrow viewports SHALL use wrapping or single-column layouts; compact tablet widths SHALL use controlled two-column layouts where appropriate; wider viewports SHALL use the expanded multi-column presentation. Fixed dimensions SHALL NOT prevent text, cards, or controls from fitting within the viewport.

#### Scenario: Phone section stacking

- **WHEN** a portfolio or recruiter entry point is rendered on a phone-width viewport
- **THEN** its present sections stack or wrap so headings, body copy, cards, and controls remain fully readable

#### Scenario: Compact tablet grids

- **WHEN** services, skills, projects, or certifications are rendered at a compact tablet width
- **THEN** their cards use a controlled two-column layout or a single-column layout when two columns would reduce readability

#### Scenario: Wide viewport expansion

- **WHEN** an entry point is rendered at a wide desktop viewport
- **THEN** its sections use their expanded multi-column presentation without exceeding shared container limits

#### Scenario: Fixed-size element containment

- **WHEN** narrow viewport text or a fixed-width visual element would exceed available space
- **THEN** the element shrinks, wraps, or reflows instead of causing horizontal overflow

### Requirement: Responsive dialogs and interactive controls

The job-match and improvement dialogs SHALL remain usable on narrow screens. Dialog surfaces SHALL fit the visible viewport, scroll internally when content exceeds available height, and keep action controls reachable. Interactive controls including language links, share icons, PDF links, CTA icons, menu toggles, and footer links SHALL have touch-target areas of at least 44 CSS pixels or equivalent non-overlapping hit spacing. Focus indicators SHALL remain visible at every breakpoint.

#### Scenario: Narrow job-match dialog

- **WHEN** the job-match dialog is opened at a 360px viewport width
- **THEN** its input, actions, loading state, and result content fit within the viewport and remain reachable by scrolling

#### Scenario: Narrow improvement dialog

- **WHEN** the improvement dialog is opened at a 360px viewport width
- **THEN** its input, actions, loading state, and result content fit within the viewport and remain reachable by scrolling

#### Scenario: Touch targets

- **WHEN** a visitor uses a touch viewport
- **THEN** icon-only and text controls have at least 44 CSS pixels of usable hit area or equivalent separated spacing

#### Scenario: Visible focus

- **WHEN** a keyboard user focuses any menu, dialog, CTA, or footer control at any breakpoint
- **THEN** the focused control has a visible focus indicator

### Requirement: Responsive motion and accessibility preferences

Responsive behavior SHALL honor reduced-motion preferences and SHALL NOT block user zoom. Smooth scrolling, entrance animations, icon rotation, card transitions, and dialog transitions SHALL be reduced or disabled when reduced motion is requested. Viewport metadata SHALL allow user scaling.

#### Scenario: Reduced motion requested

- **WHEN** a visitor has requested reduced motion and opens any entry point
- **THEN** smooth scrolling, entrance animations, icon rotation, card transitions, and dialog transitions are reduced or disabled

#### Scenario: User scaling remains available

- **WHEN** a visitor zooms a narrow or wide viewport
- **THEN** no viewport metadata prevents scaling

#### Scenario: Increased text size

- **WHEN** text size is increased without changing viewport width
- **THEN** content reflows without losing controls or requiring horizontal document scrolling

### Requirement: Native responsive implementation

The responsive behavior SHALL be delivered with native HTML, CSS, and browser-supported JavaScript. It SHALL NOT require a CSS framework, JavaScript framework, build step, package install, or remote layout library.

#### Scenario: Direct file or static host load

- **WHEN** any entry point is opened directly or from a static host without a build step
- **THEN** its responsive layout and navigation behavior are available

#### Scenario: No external layout runtime

- **WHEN** an external CSS or JavaScript framework is unavailable
- **THEN** the responsive layout and navigation behavior continue to work
