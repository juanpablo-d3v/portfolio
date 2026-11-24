# Spec Delta

## MODIFIED Requirements

### Requirement: Vacancy comparison is reachable from the hero

The recruiter page SHALL present a vacancy comparison entry point in its hero section that opens a modal dialog containing the vacancy input. The portfolio page SHALL NOT present a vacancy comparison entry point. The entry point SHALL be exposed only when JavaScript is available. The dialog SHALL be closeable with a visible close control and the Escape key, and focus SHALL return to the entry point after closing. Each time the dialog opens it SHALL show the input view with the vacancy field cleared and no result or loading state from a previous comparison.

#### Scenario: Opening the comparison

- **WHEN** a visitor activates the hero comparison control on the recruiter page
- **THEN** a modal dialog with the vacancy input opens and keyboard focus moves into it

#### Scenario: Closing the comparison

- **WHEN** the dialog is open and the visitor presses Escape or activates the close control
- **THEN** the dialog closes and focus returns to the hero comparison control

#### Scenario: No-JavaScript fallback

- **WHEN** the recruiter page loads with JavaScript unavailable
- **THEN** the comparison entry point is not shown and the email and CV download controls remain available

#### Scenario: Reopening after a comparison

- **WHEN** the visitor reopens the dialog after viewing a result or while a comparison is in flight
- **THEN** the input view is shown with an empty vacancy field, no result and no loading indication, and keyboard focus moves to the vacancy field

#### Scenario: Portfolio has no comparison entry point

- **WHEN** the portfolio page is inspected
- **THEN** no vacancy comparison entry point is presented to the visitor
