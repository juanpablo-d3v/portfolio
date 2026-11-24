# Spec Delta

## MODIFIED Requirements

### Requirement: Maintainable Imports and Exports

Shared utilities SHALL be placed in a utils/ folder, imported as needed, and not duplicated among per-section modules. Audience-specific profile copy used by feature modules SHALL be exposed as named variants from the shared data module rather than duplicated across modules. Visible page content SHALL remain in served HTML instead of being rendered from JavaScript data.

#### Scenario: Smooth scroll logic

- **WHEN** a section requires smooth scrolling
- **THEN** it imports the shared smoothScroll utility from utils/, not a new local implementation

#### Scenario: Variant-aware profile copy

- **WHEN** a feature module needs profile copy for a specific audience
- **THEN** it imports the corresponding named variant from the shared data module

#### Scenario: Visible content remains static

- **WHEN** either audience page is served without JavaScript
- **THEN** its section content is still present in the HTML
