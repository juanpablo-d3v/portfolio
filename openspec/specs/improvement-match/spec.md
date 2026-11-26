# improvement-match Specification

## Purpose

Defines a portfolio-only guided improvement inquiry that interprets a visitor's goal, recommends one approved service category, and prepares an email-ready brief without presenting proof sections or inventing claims.

## Requirements

### Requirement: Improvement inquiry is portfolio-only and progressively enhanced

The portfolio page SHALL offer a client-facing improvement inquiry from the Services call to action. The recruiter page SHALL NOT present this inquiry. The existing email contact path SHALL remain available when JavaScript is unavailable. When JavaScript is available, activating the Services call to action SHALL open a modal dialog with the improvement input.

#### Scenario: Portfolio entry point

- **WHEN** a visitor activates the "Tell Me What to Improve" call to action on the portfolio page with JavaScript available
- **THEN** a modal dialog opens with the improvement input focused

#### Scenario: No-JavaScript contact path

- **WHEN** the portfolio page is loaded with JavaScript unavailable and the visitor activates the "Tell Me What to Improve" call to action
- **THEN** the visitor's email client opens an improvement inquiry to `hello@juanpablo.dev`

#### Scenario: Recruiter page unchanged

- **WHEN** the recruiter page is inspected
- **THEN** no improvement inquiry control or dialog is presented

### Requirement: Improvement dialog lifecycle is accessible and reset

The dialog SHALL be closeable with a visible close control and the Escape key, and focus SHALL return to the Services call to action after closing. Each time the dialog opens it SHALL show the empty input view with no previous answer, result, loading state, or error state. Focus SHALL move with each visible view.

#### Scenario: Closing the dialog

- **WHEN** the dialog is open and the visitor presses Escape or activates the close control
- **THEN** the dialog closes and focus returns to the Services call to action

#### Scenario: Reopening after a result

- **WHEN** the visitor reopens the dialog after viewing a result or while a request is in flight
- **THEN** the input view is shown with an empty field, no result, no loading indication, and focus in the input field

#### Scenario: Focus follows the visible view

- **WHEN** the loading or result view is displayed
- **THEN** keyboard focus moves into that view so the state is exposed to assistive technology

### Requirement: Improvement input is a single free-text field

The dialog SHALL provide one required free-text field for the visitor to describe what they want to improve. It SHALL enforce a maximum length, show a character counter, and present an inline validation message when the field is empty. No request SHALL be sent while the input is invalid.

#### Scenario: Empty submission

- **WHEN** the visitor submits the dialog with an empty improvement field
- **THEN** an inline validation message is shown and no AI request is sent

#### Scenario: Length limit

- **WHEN** the visitor types or pastes text beyond the field's maximum length
- **THEN** the field accepts only up to the limit and the counter indicates that the limit was reached

### Requirement: AI request is disclosed and narrowly scoped

The input view SHALL disclose that submitted text is sent to Google AI for improvement guidance and is not stored by the page. The request SHALL use only the submitted text, a curated portfolio profile, and a curated catalog of the four approved service categories and their approved benefit statements. It SHALL NOT include visitor-identifying data beyond the submitted text.

#### Scenario: Disclosure before submission

- **WHEN** the visitor views the improvement input
- **THEN** a privacy notice describing third-party AI processing is visible before submitting

#### Scenario: Request scope

- **WHEN** a valid improvement request is submitted
- **THEN** the AI request contains the submitted text and curated portfolio/service data only

### Requirement: Improvement result is structured and service-focused

The result SHALL contain an understood goal, one primary service from the exact approved categories "Web Applications", "Process Automation", "System Modernization", and "Support & Stability", a short reason that service may help, approved benefit items from the selected service, one to three clarifying questions that invite the visitor to answer in the email they send, and one suggested first step. The result SHALL NOT contain a numeric match score, a hiring verdict, matched-and-gap framing, or a proof-from-past-work section.

#### Scenario: Successful improvement result

- **WHEN** the AI service returns a valid improvement result
- **THEN** the result view shows the understood goal, primary service, reason, approved benefits, email-answer clarifying questions, and suggested first step without a score, verdict, or proof section

#### Scenario: Clarifying questions stay in the email

- **WHEN** the result view is shown
- **THEN** the clarifying questions are introduced as questions to answer in the email the visitor sends, and no copy tells the visitor to start another inquiry to answer them

#### Scenario: Invalid primary service

- **WHEN** the AI service returns a primary service outside the four approved categories
- **THEN** the result is treated as invalid and no recommendation is displayed

#### Scenario: Unsafe generated text

- **WHEN** the AI service returns result text that is malformed, overly long, or includes unsupported claims
- **THEN** the page does not display the invalid text and uses the unavailable state

### Requirement: Result uses approved benefit statements only

The result view SHALL present only approved benefit statements from the selected service. It SHALL NOT present a proof-from-past-work section, prices, timelines, testimonials, availability counters, performance metrics, or guarantees.

#### Scenario: Approved benefits only

- **WHEN** a successful result is displayed
- **THEN** the benefits come from the selected catalog entry and no proof section is displayed

#### Scenario: No unsupported result claims

- **WHEN** the result view is inspected
- **THEN** it contains no price, timeline, testimonial, availability counter, performance metric, or guarantee

### Requirement: Result prepares an email brief without sending automatically

The result view SHALL offer a control that opens an `Improvement Inquiry` email to `hello@juanpablo.dev` with a body containing the visitor's submitted text, understood goal, primary service, reason, approved benefits, clarifying questions framed as questions to answer in that email, and suggested first step. The body SHALL NOT contain a proof section. The page SHALL NOT send email automatically.

#### Scenario: Email-ready brief

- **WHEN** the visitor activates the email brief control after a successful result
- **THEN** the email client opens with subject `Improvement Inquiry` and a prefilled brief containing the submitted text and displayed result content without a proof section

#### Scenario: Clarifying questions in the email

- **WHEN** the visitor reads the clarifying questions in the result or email brief
- **THEN** the copy says to answer any that apply in the email and that no new inquiry is needed

#### Scenario: Visitor review

- **WHEN** the email client opens with the prefilled brief
- **THEN** the visitor can edit the message before sending

### Requirement: Result view offers another inquiry only

The result view SHALL provide a control to start another inquiry and the `Email this brief` control. It SHALL NOT display the generic `Email me instead` control after a successful response. The direct email fallback SHALL remain available in the input and failure views. Starting another inquiry SHALL clear the previous text, hide the result, show the empty input view, and focus the input field. Starting another inquiry SHALL be presented only for a new, separate request, not as the way to answer the clarifying questions.

#### Scenario: Starting another inquiry

- **WHEN** the visitor activates the start-another control
- **THEN** the field is empty, the input view is shown, focus moves to the field, and no previous result remains visible

#### Scenario: Another inquiry is not required for clarification

- **WHEN** the visitor wants to answer a clarifying question
- **THEN** the email brief path is available and the start-another control is not presented as required for that answer

#### Scenario: No generic fallback in successful result

- **WHEN** a successful result is displayed
- **THEN** the result actions show `Email this brief` and `Start another inquiry` without an `Email me instead` control

#### Scenario: Direct email fallback outside the result

- **WHEN** the input or failure view is shown
- **THEN** the visitor can start an email to `hello@juanpablo.dev` with the subject `Improvement Inquiry` without requiring another AI request

### Requirement: AI failures degrade without inventing a result

When the AI service is unconfigured, unreachable, rate-limited, times out, returns an invalid response, or cannot be read safely, the dialog SHALL return to the input view, show an explanatory message, keep the email fallback available, and display no recommendation. The visitor SHALL be able to retry after a short cooldown.

#### Scenario: Service unavailable

- **WHEN** the AI service cannot complete the request
- **THEN** the dialog returns to the input view with an unavailable message and email fallback and shows no service recommendation

#### Scenario: Invalid response

- **WHEN** the AI response fails strict validation
- **THEN** no understood goal, service category, benefit, question, or first step from that response is displayed

### Requirement: Cooldown feedback is presented in the submit control

While the submission cooldown is active, the submit control SHALL display the remaining seconds in its label and SHALL be exposed as unavailable to assistive technology while remaining keyboard focusable. When the cooldown ends, the submit control SHALL return to its normal label and accept submissions.

#### Scenario: Cooldown countdown

- **WHEN** an improvement attempt starts a cooldown
- **THEN** the submit control shows the remaining seconds and does not send another request

#### Scenario: Cooldown expires

- **WHEN** the remaining cooldown reaches zero
- **THEN** the submit control returns to its normal label and accepts a new submission

### Requirement: Model-provided content is rendered safely

All model-provided text SHALL be rendered as plain text. The page SHALL NOT interpret model output as HTML, execute it, treat it as instructions, or allow it to alter page content outside the result view.

#### Scenario: Plain-text rendering

- **WHEN** the AI response contains text with markup or special characters
- **THEN** the result displays that text as literal text and page structure is unchanged

#### Scenario: Untrusted visitor input

- **WHEN** the visitor text contains instructions or markup-like content
- **THEN** it is treated only as improvement text and cannot change the prompt contract or page behavior
