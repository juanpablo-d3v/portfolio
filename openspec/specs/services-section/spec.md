# services-section Specification

## Purpose

Defines the portfolio-only quick-readable service menu that explains client engagement options before featured project proof using the refreshed Stitch copy and native static markup.

## Requirements

### Requirement: Portfolio services section

The portfolio page SHALL include a dedicated section titled "Services & Solutions" with an accessible name and the URL fragment `#services`. It SHALL appear immediately after the hero and before the featured projects section, with all content present in served HTML. The recruiter page SHALL NOT include this section or link to it.

#### Scenario: Section location and heading

- **WHEN** the portfolio page is inspected in document order
- **THEN** the Services section appears immediately after the hero, before the featured projects section, with a level-two heading "Services & Solutions"

#### Scenario: Direct navigation

- **WHEN** a visitor opens the portfolio page with the `#services` fragment in the URL
- **THEN** the browser scrolls to the Services section

#### Scenario: Recruiter page unchanged

- **WHEN** the recruiter page is inspected
- **THEN** no Services section or Services navigation link is present

### Requirement: Approved service menu content

The Services section SHALL present four compact cards in this order with the refreshed approved Stitch copy: Web Applications, Process Automation, System Modernization, and Support & Stability. Each card SHALL expose its category, subtitle, short lead statement, "What You Get" list, and "Great Fit" footer. Each card SHALL NOT include a separate long body paragraph or a technology footer. The section intro and card copy SHALL NOT be paraphrased, shortened, or replaced with alternative service labels.

#### Scenario: Section intro

- **WHEN** a visitor reads the Services section intro
- **THEN** it says "Practical web solutions built around how your business actually runs. Clear interfaces, automated data flow, and dependable systems—delivered without technical friction."

#### Scenario: Web Applications card

- **WHEN** a visitor reads the first service card
- **THEN** it is labeled "Web Applications", subtitled "Custom Web Apps & Dashboards", led by "Easy-to-use web tools and visual dashboards built around how your business actually works.", lists "Guided forms and clear screens for staff or customers", "Simple tables and filters to track activity fast", and "Smooth performance on desktop and mobile", and ends with "Great Fit: You want a custom portal, booking/request flow, or live status view."

#### Scenario: Process Automation card

- **WHEN** a visitor reads the second service card
- **THEN** it is labeled "Process Automation", subtitled "Systems & Process Automation", led by "Connect your screens, rules, and data so routine work happens automatically instead of by hand.", lists "Custom internal tools for requests, schedules, and approvals", "Automatic data flow between tools and services", and "Organized, reliable storage for business records", and ends with "Great Fit: Your team spends too much time copying data across spreadsheets or emails."

#### Scenario: System Modernization card

- **WHEN** a visitor reads the third service card
- **THEN** it is labeled "System Modernization", subtitled "Modernizing Outdated Systems", led by "Upgrade slow or aging software step by step without disrupting daily operations.", lists "Safe, gradual upgrades instead of risky full rewrites", "Cleaner code and clear notes for future updates", and "Faster, more dependable everyday performance", and ends with "Great Fit: Your current system feels outdated, slow, or hard to change."

#### Scenario: Support & Stability card

- **WHEN** a visitor reads the fourth service card
- **THEN** it is labeled "Support & Stability", subtitled "Bug Fixes & Ongoing Support", led by "Practical help to fix nagging issues, clean up data, and keep your site or system steady.", lists "Fast troubleshooting for bugs and recurring glitches", "Data cleanup and routine system/server upkeep", and "Reliable ongoing support as needs come up", and ends with "Great Fit: You have lingering bugs, messy data, or no dedicated tech help."

### Requirement: Services contact call to action

The Services section SHALL close with the refreshed approved Stitch CTA heading, body, and button label. The button SHALL open an improvement inquiry email to `hello@juanpablo.dev` with the subject `Improvement Inquiry`.

#### Scenario: Closing call to action

- **WHEN** a visitor reaches the end of the Services section
- **THEN** the heading says "Not sure where to start? Tell me what you want to improve.", the body says "No technical jargon or formal specs required — let's have a quick, practical chat about your goals.", and the button says "Tell Me What to Improve"

#### Scenario: Services email action

- **WHEN** a visitor activates the "Tell Me What to Improve" button
- **THEN** the browser starts an email to `hello@juanpablo.dev` with the subject `Improvement Inquiry`

### Requirement: Static accessible presentation

The Services section SHALL render with the site's existing stylesheet collection and design tokens. It SHALL NOT require a CSS framework, CDN stylesheet, remote image, Stitch asset, or JavaScript for content visibility. All service content SHALL remain visible with JavaScript disabled. Decorative icons SHALL NOT be announced as content, headings SHALL follow the page hierarchy, and interactive elements SHALL be keyboard reachable.

#### Scenario: No external styling or imagery dependency

- **WHEN** the portfolio page is loaded with network access limited to the page's own origin and its configured font and icon sources
- **THEN** the Services section remains fully styled and legible with no framework, CDN stylesheet, remote image, or Stitch asset request

#### Scenario: JavaScript unavailable

- **WHEN** the portfolio page is loaded with JavaScript disabled
- **THEN** all service cards, checklists, "Great Fit" footers, and CTA content are visible

#### Scenario: Assistive technology

- **WHEN** a screen reader encounters the Services section
- **THEN** it announces the section heading, intro, card headings, card content, and CTA while not announcing decorative icons as separate content

#### Scenario: Responsive presentation

- **WHEN** the Services section is viewed from mobile through desktop widths
- **THEN** cards, lists, "Great Fit" footers, and CTA remain readable and non-overlapping without horizontal overflow
