# Spec Delta

## ADDED Requirements

### Requirement: Spanish locale presentation preserves the improvement contract

On the Spanish portfolio, all visitor-facing improvement-inquiry strings SHALL be Mexican Spanish with a direct `tú` tone, including the Services call to action, dialog title and subtitle, privacy notice, field label and placeholder, validation, counter, loading and failure messages, status announcements, result headings, approved benefit labels, clarifying-question framing, first-step label, and action labels. The AI request SHALL instruct the model to return Spanish result text, and the result SHALL be validated against the same schema and approved canonical service IDs as the English flow. Spanish service labels SHALL come from the approved catalog presentation layer, and the Spanish email subject SHALL be `Consulta de mejora`. English behavior SHALL remain unchanged.

#### Scenario: Spanish inquiry entry point

- **WHEN** a visitor activates the Spanish Services call to action "Dime qué mejorar" with JavaScript available
- **THEN** the improvement dialog opens with Spanish labels, notices, validation, and status text

#### Scenario: Spanish AI output

- **WHEN** a valid improvement request is submitted from the Spanish portfolio
- **THEN** the result is rendered in Spanish using the same schema, canonical service IDs, approved benefits, and safety validation as English

#### Scenario: Spanish email brief

- **WHEN** a visitor activates the Spanish email brief control after a successful result
- **THEN** the email client opens a message to `hello@juanpablo.dev` with subject `Consulta de mejora` and a body containing the displayed Spanish result content

#### Scenario: English inquiry unchanged

- **WHEN** the English portfolio is used after this change
- **THEN** its exact English copy, subject `Improvement Inquiry`, canonical service IDs, and result behavior remain unchanged

## MODIFIED Requirements

### Requirement: Improvement inquiry is portfolio-only and progressively enhanced

Each portfolio page SHALL offer a client-facing improvement inquiry from the Services call to action. On the English portfolio the call to action says "Tell Me What to Improve"; on the Spanish portfolio it says "Dime qué mejorar". Neither recruiter page SHALL present this inquiry. The existing email contact path SHALL remain available when JavaScript is unavailable, using subject `Improvement Inquiry` on the English portfolio and `Consulta de mejora` on the Spanish portfolio. When JavaScript is available, activating the Services call to action SHALL open a modal dialog with the improvement input in that page's locale.

#### Scenario: Portfolio entry point

- **WHEN** a visitor activates the localized Services call to action on either portfolio page with JavaScript available
- **THEN** a modal dialog opens with the improvement input focused and localized labels

#### Scenario: No-JavaScript contact path

- **WHEN** either portfolio page is loaded with JavaScript unavailable and the visitor activates the localized call to action
- **THEN** the visitor's email client opens an improvement inquiry to `hello@juanpablo.dev` with the locale-appropriate subject

#### Scenario: Recruiter page unchanged

- **WHEN** either recruiter page is inspected
- **THEN** no improvement inquiry control or dialog is presented

### Requirement: Improvement result is structured and service-focused

The result SHALL contain an understood goal, one primary service whose canonical ID is exactly one of "Web Applications", "Process Automation", "System Modernization", and "Support & Stability", a short reason that service may help, approved benefit items from the selected service, one to three clarifying questions that invite the visitor to answer in the email they send, and one suggested first step. Spanish pages SHALL render localized approved labels for those canonical IDs: "Aplicaciones web", "Automatización de procesos", "Modernización de sistemas", and "Soporte y estabilidad". The result SHALL NOT contain a numeric match score, a hiring verdict, matched-and-gap framing, or a proof-from-past-work section.

#### Scenario: Successful improvement result

- **WHEN** the AI service returns a valid improvement result
- **THEN** the result view shows the understood goal, localized primary service label, reason, approved benefits, email-answer clarifying questions, and suggested first step without a score, verdict, or proof section

#### Scenario: Spanish service labels

- **WHEN** a successful result is displayed on the Spanish portfolio
- **THEN** the displayed service and benefit labels are the approved Spanish presentation labels while the canonical ID remains one of the four approved English IDs

#### Scenario: Clarifying questions stay in the email

- **WHEN** the result view is shown
- **THEN** the clarifying questions are introduced as questions to answer in the email the visitor sends, in that page's locale, and no copy tells the visitor to start another inquiry to answer them

#### Scenario: Invalid primary service

- **WHEN** the AI service returns a primary service outside the four approved canonical IDs
- **THEN** the result is treated as invalid and no recommendation is displayed

#### Scenario: Unsafe generated text

- **WHEN** the AI service returns result text that is malformed, overly long, or includes unsupported claims
- **THEN** the page does not display the invalid text and uses the locale-appropriate unavailable state

### Requirement: Result prepares an email brief without sending automatically

The result view SHALL offer a control that opens an email to `hello@juanpablo.dev` with a subject of `Improvement Inquiry` on the English portfolio and `Consulta de mejora` on the Spanish portfolio. The body SHALL contain the visitor's submitted text, understood goal, localized primary service label, reason, approved benefits, clarifying questions framed as questions to answer in that email, and suggested first step. The body SHALL NOT contain a proof section. The page SHALL NOT send email automatically.

#### Scenario: Email-ready brief

- **WHEN** the visitor activates the email brief control after a successful result
- **THEN** the email client opens with the locale-appropriate subject and a prefilled brief containing the submitted text and displayed result content without a proof section

#### Scenario: Clarifying questions in the email

- **WHEN** the visitor reads the clarifying questions in the result or email brief
- **THEN** the copy says in that page's locale to answer any that apply in the email and that no new inquiry is needed

#### Scenario: Visitor review

- **WHEN** the email client opens with the prefilled brief
- **THEN** the visitor can edit the message before sending

### Requirement: Result view offers another inquiry only

The result view SHALL provide a control to start another inquiry and an email-brief control. The English labels SHALL be `Email this brief` and `Start another inquiry`; the Spanish labels SHALL be `Enviar este resumen por correo` and `Hacer otra consulta`. The result view SHALL NOT display the generic email-me-instead control after a successful response. The direct email fallback SHALL remain available in the input and failure views with the locale-appropriate subject. Starting another inquiry SHALL clear the previous text, hide the result, show the empty input view, and focus the input field. Starting another inquiry SHALL be presented only for a new, separate request, not as the way to answer the clarifying questions.

#### Scenario: Starting another inquiry

- **WHEN** the visitor activates the localized start-another control
- **THEN** the field is empty, the input view is shown, focus moves to the field, and no previous result remains visible

#### Scenario: Another inquiry is not required for clarification

- **WHEN** the visitor wants to answer a clarifying question
- **THEN** the localized email brief path is available and the start-another control is not presented as required for that answer

#### Scenario: No generic fallback in successful result

- **WHEN** a successful result is displayed
- **THEN** the result actions show the localized email-brief and start-another labels without a generic email-me-instead control

#### Scenario: Direct email fallback outside the result

- **WHEN** the input or failure view is shown
- **THEN** the visitor can start an email to `hello@juanpablo.dev` with the locale-appropriate subject without requiring another AI request
