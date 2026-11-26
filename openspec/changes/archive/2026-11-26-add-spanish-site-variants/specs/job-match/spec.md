# Spec Delta

## ADDED Requirements

### Requirement: Spanish locale presentation preserves the comparison contract

On the Spanish recruiter CV, all visitor-facing vacancy-comparison strings SHALL be Mexican Spanish with a neutral/formal tone, including the hero entry point, dialog title and subtitle, privacy notice, field label and placeholder, validation text, counter, loading and failure messages, status announcements, result headings, verdict display, and action labels. The AI request SHALL instruct the model to return Spanish matched skills, gaps, and rationale while preserving the canonical verdict values and the 0-100 score schema. The Spanish result and failure views SHALL use the provided Spanish PDF for CV download actions; the English recruiter CV SHALL continue to use the existing English PDF. English behavior SHALL remain unchanged.

#### Scenario: Spanish comparison entry point

- **WHEN** a visitor activates the localized vacancy-comparison control on `/es/cv/` with JavaScript available
- **THEN** the comparison dialog opens with Spanish labels, notices, validation, and status text

#### Scenario: Spanish AI output

- **WHEN** a valid vacancy comparison is submitted from `/es/cv/`
- **THEN** the result is rendered in Spanish with the same score range, canonical verdict values, matched skills, gaps, rationale, and safety validation as English

#### Scenario: Spanish CV download

- **WHEN** a visitor uses a CV download action inside the Spanish comparison result or failure view
- **THEN** the provided Spanish PDF is downloaded and no score is fabricated

#### Scenario: English comparison unchanged

- **WHEN** the English recruiter CV is used after this change
- **THEN** its exact English copy, result behavior, and existing English PDF download remain unchanged
