# Spec Delta

## MODIFIED Requirements

### Requirement: Services contact call to action

The Services section SHALL close with the refreshed approved Stitch CTA heading, body, and button label. With JavaScript unavailable, the button SHALL open an improvement inquiry email to `hello@juanpablo.dev` with the subject `Improvement Inquiry`. With JavaScript available, activating the button SHALL open the portfolio improvement inquiry dialog while the email path SHALL remain available through that dialog and as a failure fallback. The visible heading, body, and button label SHALL NOT change.

#### Scenario: Closing call to action

- **WHEN** a visitor reaches the end of the Services section
- **THEN** the heading says "Not sure where to start? Tell me what you want to improve.", the body says "No technical jargon or formal specs required — let's have a quick, practical chat about your goals.", and the button says "Tell Me What to Improve"

#### Scenario: Services email action

- **WHEN** JavaScript is unavailable and a visitor activates the "Tell Me What to Improve" button
- **THEN** the browser starts an email to `hello@juanpablo.dev` with the subject `Improvement Inquiry`

#### Scenario: Enhanced improvement inquiry

- **WHEN** a visitor activates the "Tell Me What to Improve" button with JavaScript available
- **THEN** the portfolio improvement inquiry dialog opens without changing the Services copy or card content

#### Scenario: Email fallback remains available

- **WHEN** the improvement inquiry cannot produce a result
- **THEN** the visitor can still start an email to `hello@juanpablo.dev` with the subject `Improvement Inquiry`
