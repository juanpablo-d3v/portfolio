# Proposal: Client Improvement Match

## Why

The portfolio Services section ends with a direct email link, but a visitor with a vague problem has no help turning that problem into a clear improvement request. A guided, customer-facing flow can make the first contact easier while keeping the response practical and free of unsupported claims.

## What Changes

- Enhance the existing "Tell Me What to Improve" CTA with a JavaScript-opened dialog while preserving the current mailto link as the no-JavaScript and failure fallback.
- Ask for one free-text description of what the visitor wants to improve, with a character limit, inline validation, and a disclosure that submitted text is processed by Google AI and not stored by the page.
- Reuse the existing Gemini request plumbing with a customer-specific prompt and strict response schema grounded in `portfolioProfile` and a curated service catalog.
- Return a service-fit result, not a hiring score: understood goal, one primary service from the four approved categories, why it may help, approved benefit keys, clarifying questions for the visitor to answer in the email they send, and a suggested first step.
- Render approved service benefits from the catalog; do not render a proof-from-past-work section. The model never authors capability claims, prices, timelines, testimonials, or guarantees.
- Prefill an `Improvement Inquiry` email with the visitor text and generated brief; never send automatically.
- Degrade honestly when Gemini is unavailable, rate-limited, timed out, or returns invalid data by returning to the input view with an email fallback and no fabricated recommendation.

## Capabilities

### New Capabilities

- `improvement-match`: Portfolio-only guided improvement inquiry that interprets a visitor goal, recommends one of the four approved service categories, and prepares an email-ready brief without presenting proof sections.

### Modified Capabilities

- `services-section`: Change the CTA behavior so the existing mailto action is progressively enhanced into the improvement dialog while the exact visible copy and no-JavaScript email path remain available.

## Impact

Affected portfolio behavior includes the Services CTA, a new dialog component, a customer-focused Gemini prompt/service, a curated service catalog, and token-based dialog styles. The recruiter page and vacancy comparison flow remain unchanged. No new runtime dependency, build step, external stylesheet, remote image, proof section, pricing data, availability claim, testimonial, booking link, or unsupported service claim is introduced. The Gemini key remains injected only through the existing deployment secret mechanism and is never committed.
