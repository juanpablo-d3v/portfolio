# Spec Delta

## Purpose

Defines how the static CV site serves two audience-specific entry points while sharing design tokens, assets, verified facts, and deployment infrastructure.

## ADDED Requirements

### Requirement: Audience-specific static entry points

The site SHALL serve two static HTML entry points: a portfolio at `/` for freelance and consulting inquiries, and a recruiter web CV at `/cv/` for employment-focused visitors. Each page SHALL present complete audience-specific content in served markup and remain usable without JavaScript. The site SHALL NOT use runtime audience switching to select between the two pages.

#### Scenario: Root is the portfolio

- **WHEN** a visitor opens the site root
- **THEN** the portfolio page is served with client-facing copy and no runtime audience selector

#### Scenario: Recruiter path is the web CV

- **WHEN** a visitor opens `/cv/`
- **THEN** the recruiter web CV is served with candidate-facing copy and employment-oriented actions

#### Scenario: Both pages work without JavaScript

- **WHEN** either entry point is loaded with JavaScript unavailable
- **THEN** its section content and navigation remain present in the served markup

### Requirement: Shared design and verified facts

Both entry points SHALL use the same design tokens, stylesheet collection, image assets, and verified profile facts. Visible claims SHALL be supported by existing real project, skill, experience, certification, or language data. The site SHALL NOT add rates, testimonials, booking links, or process claims that lack a verified source.

#### Scenario: Shared visual system

- **WHEN** both entry points are rendered
- **THEN** they use the same Material 3 token values, section styles, and local image assets

#### Scenario: Verified claims only

- **WHEN** copy on either entry point is reviewed
- **THEN** every project, skill, role, certification, and language claim is supported by existing verified data

### Requirement: Audience-specific navigation and calls to action

The portfolio page SHALL prioritize hero, selected work, technical skills, a discreet background-experience reveal, and a project-discussion contact path. Its hero SHALL NOT present the vacancy comparison control or LinkedIn option, and its header SHALL NOT present the download-resume control. The recruiter page SHALL prioritize vacancy comparison, technical skills, work history, projects, certifications, communication details, and CV download. The portfolio page SHALL include a discoverable cross-link to the recruiter page. The recruiter page SHALL NOT include a Portfolio menu item or footer cross-link.

#### Scenario: Portfolio call to action

- **WHEN** a visitor reviews the portfolio page
- **THEN** the primary contact action invites a project discussion and no vacancy comparison entry point is presented

#### Scenario: Portfolio hero and header controls

- **WHEN** the portfolio hero and header are inspected
- **THEN** no LinkedIn option, vacancy-match control, or download-resume control is presented

#### Scenario: Recruiter call to action

- **WHEN** a visitor reviews the recruiter page
- **THEN** vacancy comparison, LinkedIn, and CV download actions are available

#### Scenario: Cross-page discovery

- **WHEN** a visitor needs the recruiter view from the portfolio
- **THEN** a cross-link to `/cv/` is discoverable from the portfolio page

#### Scenario: Recruiter page has no portfolio cross-link

- **WHEN** the recruiter page is inspected
- **THEN** no menu or footer link to the portfolio page is presented

### Requirement: Progressive background experience reveal

The portfolio page SHALL omit communication/languages, certifications, and interests. It SHALL place a discreet "Background experience" control after technical skills and keep the experience section in served HTML. Without JavaScript the experience section SHALL be visible. With JavaScript available the experience section SHALL be collapsible and revealable in place, with the control exposing its expanded or collapsed state to assistive technology.

#### Scenario: Portfolio section set

- **WHEN** the portfolio page is inspected
- **THEN** communication/languages, certifications, and interests are absent and experience is available only after the background-experience control in the enhanced view

#### Scenario: JavaScript unavailable

- **WHEN** the portfolio page loads without JavaScript
- **THEN** the experience section is visible without requiring the reveal control

#### Scenario: Reveal in place

- **WHEN** a visitor activates the "Background experience" control with JavaScript available
- **THEN** the experience section is shown or hidden in place and the control's exposed state matches the visible state

### Requirement: Single-repository deployment

Both entry points SHALL be published from the same repository and Pages deployment. Shared assets SHALL resolve correctly from both root and nested paths. Adding the recruiter entry point SHALL NOT require a second repository, a build step, or a runtime dependency.

#### Scenario: Published entry points

- **WHEN** the site is deployed
- **THEN** both `/` and `/cv/` are reachable from the published artifact

#### Scenario: Shared asset resolution

- **WHEN** either entry point loads its styles, scripts, and images
- **THEN** every shared asset URL resolves from that page's base path
