# Tasks

## 1. Service catalog and result contract

- [x] 1.1 Remove proof references from `scripts/data/serviceCatalog.js` and keep the four approved service categories with approved benefit keys/statements only; verify the catalog imports successfully, contains exactly "Web Applications", "Process Automation", "System Modernization", and "Support & Stability", and has no proof fields.
- [x] 1.2 Add strict improvement-result validation and bounded plain-text handling; verify a valid sample passes while missing fields, unknown services, unknown benefit keys, oversized text, and score fields are rejected.

## 2. Customer AI request

- [x] 2.1 Update the portfolio improvement prompt in `scripts/services/improvementService.js` so clarifying questions are framed as questions the visitor answers in the email they send, not by starting another inquiry; verify the prompt contains no proof, vacancy-matching, score, pricing, timeline, or testimonial instructions.
- [x] 2.2 Send the improvement request through the existing Gemini configuration and generic request plumbing without changing recruiter behavior; verify a successful manual request returns the required result fields.
- [x] 2.3 Normalize unavailable, rate-limited, timed-out, unconfigured, and invalid responses into a no-result failure state; verify each simulated failure produces no recommendation and exposes the email fallback.

## 3. Dialog markup and interaction

- [x] 3.1 Remove the proof section and the generic `Email me instead` control from the result actions in `index.html`, and label clarifying questions as email answers with the copy "Questions to answer in your email" and "Answer any that apply in the email you send; no new inquiry is needed."; verify the Services section heading, body, button label, and mailto href remain exact and no proof element remains.
- [x] 3.2 Intercept the Services CTA on the portfolio page only and open the dialog when enhancement APIs are available; verify the link still opens an `Improvement Inquiry` email with JavaScript disabled and opens the dialog with JavaScript enabled.
- [x] 3.3 Implement dialog lifecycle, focus entry, focus return, Escape close, view-status focus movement, and full reset on reopen; verify keyboard-only open, submit, close, and reopen flows leave no stale state.
- [x] 3.4 Implement required-field validation and maximum-length enforcement with an inline message and live counter; verify empty submission sends no request and pasted text truncates at the limit.

## 4. Token-based styling

- [x] 4.1 Remove proof-only selectors from `styles/improvement-dialog.css` and keep responsive token-only styles for all remaining dialog views and status states; verify the CSS contains no proof selectors, hard-coded palette colors, `url()`, CDN imports, or remote assets.
- [x] 4.2 Re-import the stylesheet from `styles/style.css` if needed and reuse existing Material Symbols conventions with decorative icons hidden from assistive technology; verify the portfolio page renders without layout regressions at desktop and mobile widths.

## 5. Result and email brief

- [x] 5.1 Render the successful result using model text only for understood goal, reason, email-answer clarifying questions, and first step while deriving benefits from the catalog; verify no proof section appears and no score, price, timeline, testimonial, availability, metric, or guarantee appears.
- [x] 5.2 Add the email brief in the successful result and keep the direct email fallback only in the input and failure views; verify the successful result shows only `Email this brief` and `Start another inquiry` with no `Email me instead`, the brief uses subject `Improvement Inquiry`, addresses `hello@juanpablo.dev`, contains the visitor text plus displayed result content, omits proof, frames clarifying questions as email replies, remains editable, and never sends automatically.
- [x] 5.3 Implement start-another, retry, and cooldown behavior; verify start-another clears state and focuses the field while the cooldown label counts down, blocks extra requests, and returns to the normal label at zero.

## 6. Bootstrap and integration verification

- [x] 6.1 Initialize the improvement dialog only on the portfolio page and only when required APIs exist; verify the recruiter page loads unchanged and contains no improvement controls.
- [x] 6.2 Verify the end-to-end success path in a browser from CTA to result to editable email brief, including approved benefits, email-answer clarifying questions, no proof section, no `Email me instead` control in the result, and keyboard navigation.
- [x] 6.3 Verify the end-to-end failure paths in a browser for unconfigured, unavailable, malformed, and unknown-service responses, including retry, cooldown, and email fallback.
- [x] 6.4 Run final checks with `git diff --check`, `openspec validate client-improvement-match --strict`, and a served-page review; verify `/cv/` is unchanged and no assets, dependencies, secrets, proof section, or unsupported claims were added.
