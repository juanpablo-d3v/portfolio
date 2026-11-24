# Spec Delta

## MODIFIED Requirements

### Requirement: Featured projects section

The portfolio page SHALL include a dedicated section titled "Featured Projects & Solutions" with an accessible name and a URL fragment for direct navigation. It SHALL appear immediately after the hero and before technical skills as primary proof. The recruiter page SHALL include the same URL fragment in a section titled "Side Projects & Learning Experiments", placed after the experience timeline. Its copy SHALL frame the work as personal side projects or learning experiments and SHALL NOT imply concurrent commercial work alongside the candidate's current employment.

#### Scenario: Section location and heading

- **WHEN** the rendered page is inspected in document order
- **THEN** the projects section appears in the audience-specific position with "Featured Projects & Solutions" on the portfolio page and "Side Projects & Learning Experiments" on the recruiter page

#### Scenario: Portfolio section location

- **WHEN** the portfolio page is inspected in document order
- **THEN** the projects section appears between the hero and the technical skills section and contains a level-two heading "Featured Projects & Solutions"

#### Scenario: Recruiter section location

- **WHEN** the recruiter page is inspected in document order
- **THEN** the projects section appears after the experience timeline and contains a level-two heading "Side Projects & Learning Experiments"

#### Scenario: Recruiter project framing

- **WHEN** a visitor reads the recruiter projects section
- **THEN** the copy describes personal side projects or learning experiments and does not present them as concurrent commercial work

#### Scenario: Direct navigation

- **WHEN** a visitor opens either page with the projects fragment in the URL
- **THEN** the browser scrolls to that page's projects section
