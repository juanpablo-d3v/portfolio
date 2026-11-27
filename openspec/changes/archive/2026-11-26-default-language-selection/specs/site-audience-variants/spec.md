# Spec Delta

## MODIFIED Requirements

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

## ADDED Requirements

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
