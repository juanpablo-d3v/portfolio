# Spec Delta

## MODIFIED Requirements

### Requirement: Audience-specific navigation and calls to action

The portfolio page SHALL prioritize hero, a client-facing services menu, selected work, technical skills, a discreet background-experience reveal, and a project-discussion contact path. Its header SHALL include a "Services" navigation link targeting the services section. Its hero SHALL NOT present the vacancy comparison control or LinkedIn option, and its header SHALL NOT present the download-resume control. The recruiter page SHALL prioritize vacancy comparison, technical skills, work history, projects, certifications, communication details, and CV download. The portfolio page SHALL include a discoverable cross-link to the recruiter page. The recruiter page SHALL NOT include a Portfolio menu item, Services menu item, or footer cross-link.

#### Scenario: Portfolio call to action

- **WHEN** a visitor reviews the portfolio page
- **THEN** the primary contact action invites a project discussion and no vacancy comparison entry point is presented

#### Scenario: Portfolio services navigation

- **WHEN** a visitor activates the "Services" navigation link on the portfolio page
- **THEN** the Services section is brought into view

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
- **THEN** no menu or footer link to the portfolio page is presented and no Services menu item is presented
