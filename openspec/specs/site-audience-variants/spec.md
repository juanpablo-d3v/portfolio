# site-audience-variants Specification

## Purpose

Defines how the static CV site serves two audience-specific entry points while sharing design tokens, assets, verified facts, and deployment infrastructure.

## Requirements

### Requirement: Audience-specific static entry points

The site SHALL serve four static HTML entry points: an English portfolio at `/` and Spanish portfolio at `/es/` for freelance and consulting inquiries, and an English recruiter web CV at `/cv/` and Spanish recruiter web CV at `/es/cv/` for employment-focused visitors. Each page SHALL present complete audience-specific content in served markup and remain usable without JavaScript. The site SHALL NOT use runtime audience switching or runtime translation to select between the pages. Locale selection SHALL occur only through static links or same-audience navigation to one of these pre-rendered entry points.

#### Scenario: Root is the portfolio

- **WHEN** a visitor opens the site root with no applicable Spanish language preference
- **THEN** the English portfolio page is served with client-facing copy and no runtime audience or locale selector

#### Scenario: Recruiter path is the web CV

- **WHEN** a visitor opens `/cv/` with no applicable Spanish language preference
- **THEN** the English recruiter web CV is served with candidate-facing copy and employment-oriented actions

#### Scenario: Spanish paths are full mirrors

- **WHEN** a visitor opens `/es/` or `/es/cv/`
- **THEN** the corresponding Spanish portfolio or recruiter CV is served with complete audience-specific content in served markup

#### Scenario: Both pages work without JavaScript

- **WHEN** any entry point is loaded with JavaScript unavailable
- **THEN** its section content and navigation remain present in the served markup

### Requirement: Shared design and verified facts

All four entry points SHALL use the same design tokens, stylesheet collection, image assets, and verified profile facts. Spanish variants SHALL translate presentation copy without changing the underlying claims. Visible claims SHALL be supported by existing real project, skill, experience, certification, or language data. The site SHALL NOT add rates, testimonials, booking links, or process claims that lack a verified source.

#### Scenario: Shared visual system

- **WHEN** all four entry points are rendered
- **THEN** they use the same Material 3 token values, section styles, and local image assets

#### Scenario: Verified claims only

- **WHEN** copy on any entry point is reviewed
- **THEN** every project, skill, role, certification, and language claim is supported by existing verified data

### Requirement: Audience-specific navigation and calls to action

Each portfolio variant SHALL prioritize hero, a client-facing services menu, selected work, technical skills, a discreet background-experience reveal, and a project-discussion contact path. Its header SHALL include a localized Services link targeting the services section. Its hero SHALL NOT present the vacancy comparison control or LinkedIn option, and its header SHALL NOT present the download-resume control. Each recruiter variant SHALL prioritize vacancy comparison, technical skills, work history, projects, certifications, communication details, and CV download. Each portfolio variant SHALL include a discoverable cross-link to the matching-locale recruiter page. Each recruiter variant SHALL NOT include a Portfolio menu item, Services menu item, or footer cross-link. Every page SHALL include a header language link to the same audience in the other locale.

#### Scenario: Portfolio call to action

- **WHEN** a visitor reviews either portfolio page
- **THEN** the primary contact action invites a project discussion in that locale and no vacancy comparison entry point is presented

#### Scenario: Portfolio services navigation

- **WHEN** a visitor activates the localized Services navigation link on a portfolio page
- **THEN** the Services section is brought into view

#### Scenario: Portfolio hero and header controls

- **WHEN** either portfolio hero and header are inspected
- **THEN** no LinkedIn option, vacancy-match control, or download-resume control is presented

#### Scenario: Recruiter call to action

- **WHEN** a visitor reviews either recruiter page
- **THEN** vacancy comparison, LinkedIn, and CV download actions are available in that locale

#### Scenario: Cross-page discovery

- **WHEN** a visitor needs the recruiter view from a portfolio page
- **THEN** a cross-link to the matching-locale recruiter page is discoverable from that portfolio page

#### Scenario: Recruiter page has no portfolio cross-link

- **WHEN** either recruiter page is inspected
- **THEN** no menu or footer link to a portfolio page is presented and no Services menu item is presented

#### Scenario: Same-audience language link

- **WHEN** a visitor activates the header language link on any page
- **THEN** the browser opens the same audience variant in the other locale without changing audience

### Requirement: Progressive background experience reveal

Each portfolio variant SHALL omit communication/languages, certifications, and interests. It SHALL place a discreet localized background-experience control after technical skills and keep the experience section in served HTML. Without JavaScript the experience section SHALL be visible. With JavaScript available the experience section SHALL be collapsible and revealable in place, with the control exposing its expanded or collapsed state to assistive technology.

#### Scenario: Portfolio section set

- **WHEN** either portfolio page is inspected
- **THEN** communication/languages, certifications, and interests are absent and experience is available only after the localized background-experience control in the enhanced view

#### Scenario: JavaScript unavailable

- **WHEN** either portfolio page loads without JavaScript
- **THEN** the experience section is visible without requiring the reveal control

#### Scenario: Reveal in place

- **WHEN** a visitor activates the localized background-experience control with JavaScript available
- **THEN** the experience section is shown or hidden in place and the control's exposed state matches the visible state

### Requirement: Single-repository deployment

All four entry points and the Spanish CV PDF SHALL be published from the same repository and Pages deployment. Shared assets SHALL resolve correctly from root and nested paths. Adding the Spanish variants SHALL NOT require a second repository, a build step, a runtime translation service, or a runtime dependency.

#### Scenario: Published entry points

- **WHEN** the site is deployed
- **THEN** `/`, `/cv/`, `/es/`, and `/es/cv/` are reachable from the published artifact

#### Scenario: Shared asset resolution

- **WHEN** any entry point loads its styles, scripts, and images
- **THEN** every shared asset URL resolves from that page's base path

#### Scenario: Spanish CV download

- **WHEN** a visitor activates the CV download action on `/es/cv/`
- **THEN** the provided Spanish PDF is downloaded while `/cv/` continues to use the existing English PDF

### Requirement: Locale-specific presentation

The site SHALL serve Spanish variants of both audience entry points using Mexican Spanish that preserves all verified facts. English variants SHALL remain the global-market versions. Each page SHALL declare its own language and expose alternate locale links for the same audience through standard HTML metadata. Spanish copy SHALL use a direct `tú` tone on the portfolio and a neutral/formal tone on the recruiter CV, while established technology names and product names remain unchanged.

#### Scenario: Spanish locale identity

- **WHEN** a Spanish entry point is served
- **THEN** its document language is `es-MX` and its visible copy is Mexican Spanish

#### Scenario: Locale metadata

- **WHEN** an English or Spanish entry point is inspected
- **THEN** it exposes alternate language metadata for the matching audience in the other locale

#### Scenario: Verified localization

- **WHEN** Spanish copy is reviewed
- **THEN** every project, skill, role, certification, language, and technology claim matches the verified facts used by the English variant

#### Scenario: English pages remain unchanged

- **WHEN** an English entry point is served after this change
- **THEN** its language, copy, audience behavior, and actions remain unchanged

### Requirement: Browser language entry-point negotiation

The site SHALL enhance only `/` and `/cv/` with same-audience locale negotiation when JavaScript is available and no explicit locale choice is stored. It SHALL inspect the browser's ordered language preferences in order, treat region variants beginning with `es` as Spanish and beginning with `en` as English, and use the first supported locale. If Spanish is selected, the site SHALL navigate to `/es/` from `/` and to `/es/cv/` from `/cv/`. If English is selected or no supported locale is present, the site SHALL remain on the current English entry point. The site SHALL NOT negotiate locale from `/es/` or `/es/cv/`.

#### Scenario: Spanish preference on portfolio root

- **WHEN** a visitor opens `/` with ordered browser languages `es-MX, en-US` and no explicit locale choice
- **THEN** the browser opens `/es/` with the same audience

#### Scenario: Spanish preference on recruiter CV

- **WHEN** a visitor opens `/cv/` with ordered browser languages `es-419` and no explicit locale choice
- **THEN** the browser opens `/es/cv/` with the same audience

#### Scenario: English preference wins when ordered first

- **WHEN** a visitor opens `/` or `/cv/` with ordered browser languages `en-GB, es-MX` and no explicit locale choice
- **THEN** the browser remains on the English entry point

#### Scenario: Unsupported language before Spanish is skipped

- **WHEN** a visitor opens `/` or `/cv/` with ordered browser languages `fr-FR, es-MX, en` and no explicit locale choice
- **THEN** the browser opens the matching Spanish entry point

#### Scenario: No supported language falls back to English

- **WHEN** a visitor opens `/` or `/cv/` with ordered browser languages `fr-FR` and no explicit locale choice
- **THEN** the browser remains on the English entry point

#### Scenario: Spanish entry points are authoritative

- **WHEN** a visitor opens `/es/` or `/es/cv/` with any browser languages and no explicit locale choice
- **THEN** the browser remains on the requested Spanish entry point

#### Scenario: Redirect preserves URL details

- **WHEN** a visitor opens `/cv/?source=share#experience` with a Spanish preference and no explicit locale choice
- **THEN** the browser opens `/es/cv/?source=share#experience`

### Requirement: Explicit language choice persistence

The site SHALL treat activation of a header language link as an explicit locale choice and SHALL persist that choice for later visits. An explicit choice SHALL override browser-language negotiation on all English entry points. The site SHALL NOT change audience when storing or applying a locale choice. If persistence is unavailable, the selected navigation SHALL still complete.

#### Scenario: Spanish link records a preference

- **WHEN** a visitor activates the ES header link on `/` or `/cv/`
- **THEN** the site records Spanish as the explicit choice and opens the same-audience Spanish entry point

#### Scenario: Saved Spanish choice overrides browser language

- **WHEN** a visitor with a saved Spanish choice opens `/` or `/cv/` with any browser languages
- **THEN** the browser opens the matching Spanish entry point

#### Scenario: English link records a preference

- **WHEN** a visitor activates the EN header link on `/es/` or `/es/cv/`
- **THEN** the site records English as the explicit choice and opens the same-audience English entry point

#### Scenario: Saved English choice prevents auto-redirect

- **WHEN** a visitor with a saved English choice opens `/` or `/cv/` with Spanish-preferred browser languages
- **THEN** the browser remains on the English entry point

#### Scenario: Language choice preserves audience

- **WHEN** a visitor activates the EN header link on `/es/` or `/es/cv/`
- **THEN** the browser opens `/` or `/cv/` respectively, without changing audience

#### Scenario: Persistence unavailable

- **WHEN** browser storage is unavailable and a visitor activates a header language link
- **THEN** the requested same-audience language page still opens
