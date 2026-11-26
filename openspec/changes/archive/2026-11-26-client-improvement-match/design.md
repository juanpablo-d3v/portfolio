# Design

## Context

The portfolio Services section currently ends with a static `mailto:` call to action, while the recruiter page has a separate vacancy comparison flow with an existing Gemini request path, dialog state machine, cooldown, and token-based styling. This change adds a portfolio-only guided inquiry without changing the recruiter flow. See `proposal.md` for motivation and the delta specs for the behavior contract.

Constraints: vanilla HTML/CSS/JS ES modules, no bundler, no package scripts, no CDN or remote assets, existing Material 3 tokens, existing Material Symbols font, no hard-coded CSS palette colors, no CSS `url()`, and no features below roughly 90% browser support. `scripts/config.js` is generated/gitignored and supplied by deployment; its contents are never committed.

## Goals / Non-Goals

**Goals:**

- Turn the Services CTA into a progressively enhanced inquiry without weakening the no-JavaScript email path.
- Reuse proven recruiter-flow patterns for modal lifecycle, request cooldown, strict response validation, and graceful failure.
- Keep model output limited to classification and safe explanatory text while curated portfolio data supplies only approved benefit statements.
- Produce an editable email brief that improves first contact, frames clarifying questions as email replies, and never sends automatically.
- Keep portfolio and recruiter audiences isolated.

**Non-Goals:**

- No recruiter vacancy comparison changes.
- No new framework, build step, endpoint, backend, analytics, persistence, or external asset.
- No proof-from-past-work section in the result or email brief.
- No generic `Email me instead` control in a successful result view.
- No prices, availability, timelines, testimonials, booking links, match score, hiring verdict, or guaranteed outcome.
- No new service categories or capability claims beyond the approved Services copy and approved benefit statements.

## Decisions

### 1. Enhance the existing CTA instead of replacing it

Keep the Services CTA as an anchor with the exact mailto href and copy. JavaScript adds a click handler only on the portfolio page, opens the inquiry dialog, and preserves default anchor behavior when enhancement is unavailable or required APIs are missing.

**Alternatives considered:**

- Replace the anchor with a button: rejected because it weakens the no-JavaScript contact path.
- Put a second CTA next to the existing one: rejected because it adds visual clutter and copy drift.
- Enhance all pages through a shared global handler: rejected because it risks leaking the flow into the recruiter page.

### 2. Add a portfolio-specific dialog component with a reusable state machine

Create a dedicated improvement dialog module that follows the existing job-match dialog lifecycle: input view, loading view, result view, error fallback, Escape/close handling, focus return, and reset on reopen. The component remains independent from the recruiter modal to avoid cross-audience coupling.

**Alternatives considered:**

- Generalize one shared modal component for both audiences: rejected as premature abstraction that could change recruiter behavior.
- Reuse the recruiter modal markup directly: rejected because labels, input semantics, and result content differ.

### 3. Separate customer AI behavior from recruiter AI behavior

Add a customer-specific prompt and strict result validation rather than extending the recruiter prompt. Reuse only the generic Gemini request plumbing; if a shared request helper is extracted, the recruiter path must remain behaviorally unchanged.

**Alternatives considered:**

- Send the visitor text through the existing vacancy matcher prompt: rejected because it produces hiring-style scores and gaps.
- Duplicate all request code without extracting a helper: rejected because it increases config and error-handling drift.
- Call a new backend endpoint: rejected because the current deployment is static.

### 4. Treat a curated service catalog as the source of truth

Store the four approved service categories and their approved benefit statements in a static catalog. The AI chooses a category and supplies a short reason, clarifying questions framed as email replies, and a suggested first step. The page renders benefits from the catalog and does not render a proof section.

**Alternatives considered:**

- Let the model write capability or proof statements: rejected because it can invent engagements, metrics, prices, or testimonials.
- Store benefit statements in the prompt only: rejected because it is harder to test and easy to drift from the visible page.
- Derive benefit statements from raw CV data at runtime: rejected because it blurs approved service copy with generic capability claims.

### 5. Validate a narrow result contract before rendering

The response must contain exactly one approved service category, bounded plain-text fields, one to three clarifying questions framed as email replies, approved benefit keys, and one suggested first step. Any missing field, unknown category, unknown benefit key, oversized text, or unsupported claim marker invalidates the result and triggers the unavailable state.

**Alternatives considered:**

- Render best-effort partial results: rejected because partial model output can omit required fields or include unsafe text.
- Accept free-form prose: rejected because it is not reliably testable or safely renderable.

### 6. Degrade to contact, not to a fabricated recommendation

When Gemini is unconfigured, unavailable, rate-limited, timed out, or invalid, the dialog returns to the input view, shows a clear message, keeps the visitor text for retry, and exposes the email fallback. No service recommendation is displayed.

**Alternatives considered:**

- Show a generic default service: rejected because it would misrepresent a recommendation.
- Retry automatically: rejected because it can worsen rate limits and obscure failures.

### 7. Build the email brief from displayed data only

The email action constructs a `mailto:` URL with subject `Improvement Inquiry` and a body containing the visitor text plus the exact result content shown on the page. Clarifying questions explicitly tell the visitor to answer in that email, not by starting another inquiry. A successful result exposes only `Email this brief` and `Start another inquiry`; the generic direct email fallback stays in the input and failure views. The user's email client remains the sending surface.

**Alternatives considered:**

- POST directly to an email provider: rejected because there is no backend and no user consent step.
- Send through a third-party form service: rejected because it adds a dependency and privacy surface.

### 8. Keep styling token-only and scoped

Add a dedicated stylesheet for the inquiry dialog using existing color, typography, spacing, radius, elevation, and motion tokens. Import it once from the main stylesheet. Reuse existing Material Symbols conventions and mark decorative icons as hidden from assistive technology.

**Alternatives considered:**

- Reuse job-match CSS classes: rejected because future changes would couple two different audiences.
- Add inline styles: rejected because it bypasses the token system and makes maintenance harder.

## Risks / Trade-offs

- **Gemini selects the wrong service** → Present the result as a possible fit, include clarifying questions in the email brief, and keep approved benefits visible so the visitor can judge relevance.
- **Prompt injection in visitor text** → Include the text as data with explicit instruction boundaries, enforce strict schema validation, and render all model text as literal text.
- **AI quota, timeout, or config failure** → Keep the email fallback visible, show no recommendation, and expose a cooldown-protected retry.
- **Copy drift from the live page** → Keep exact Services copy and approved benefit statements in one curated catalog and validate them against the approved spec during implementation.
- **Native dialog unsupported or unavailable** → Do not intercept the CTA and let the mailto link work normally.
- **Accessibility regressions** → Preserve focus entry, focus return, Escape close, visible labels, status announcements, and an unavailable submit control that remains focusable.
- **Secret exposure** → Keep relying on generated gitignored config and deployment injection; never log config or request details.

## Migration Plan

- Deploy updated static assets atomically: HTML, main stylesheet import, new dialog stylesheet, new component/service/catalog modules, and main bootstrap guard.
- No server or data migration is required; the existing deployment secret mechanism continues to supply Gemini configuration.
- Rollback by removing the portfolio-only enhancement, its imports, and its styles; the Services CTA then returns to its original mailto behavior.
- Sync specs and archive the change only after implementation and validation are complete.

## Open Questions

None.
