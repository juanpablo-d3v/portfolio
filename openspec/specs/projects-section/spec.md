# projects-section Specification

## Purpose

Presents verified production projects directly on the CV landing page so a recruiter can see deliverables and outcomes before reading the chronological experience timeline, starting with one real entry and leaving room for more as verified project data and images are supplied.

## Requirements

### Requirement: Featured projects section

The portfolio page SHALL include a dedicated section titled "Featured Projects & Solutions" with an accessible name and a URL fragment for direct navigation. It SHALL appear immediately after the hero and before technical skills as primary proof. The recruiter page SHALL include the same URL fragment in a section titled "Side Projects & Learning Experiments", placed after the experience timeline. Its copy SHALL frame the work as personal side projects or learning experiments and SHALL NOT imply concurrent commercial work alongside the candidate's current employment.

#### Scenario: Section location and heading

- **WHEN** the rendered page is inspected in document order
- **THEN** the projects section appears in the audience-specific position with "Featured Projects & Solutions" on the portfolio page and "Side Projects & Learning Experiments" on the recruiter page

#### Scenario: Portfolio section location

- **WHEN** the portfolio page is inspected in document order
- **THEN** the projects section appears between the hero and the technical skills section and contains a level-two heading "Featured Projects & Solutions"

#### Scenario: Recruiter section location

- **WHEN** the recruiter page is inspected in document order
- **THEN** the projects section appears after the experience timeline and contains a level-two heading "Side Projects & Learning Experiments"

#### Scenario: Recruiter project framing

- **WHEN** a visitor reads the recruiter projects section
- **THEN** the copy describes personal side projects or learning experiments and does not present them as concurrent commercial work

#### Scenario: Direct navigation

- **WHEN** a visitor opens either page with the projects fragment in the URL
- **THEN** the browser scrolls to that page's projects section

### Requirement: Featured case studies

The section SHALL present at least one case-study entry using verified real project data and SHALL support adding more entries as they are verified. Each entry SHALL expose a category label, a client or organization with status or period, a title, a narrative, three highlight items, a set of technology labels, and a local placeholder image covering the full card behind a left-to-right token-based gradient scrim, with content aligned left and the right side of the image visible.

#### Scenario: Case studies are visible

- **WHEN** the projects section is viewed on a desktop viewport
- **THEN** every case-study entry is visible with its category, client, status or period, title, narrative, three highlights, technology labels, and a full-card local placeholder background with a left-to-right gradient scrim and left-aligned content

#### Scenario: Entry links to its project site

- **WHEN** a visitor activates the "View site" link on the Fresnal Comala entry
- **THEN** the browser opens the verified Fresnal Comala project site

### Requirement: Content fidelity

Case-study narratives and labels SHALL describe only verified real project data supplied for the section. The section SHALL NOT introduce new quantified claims, tool versions, client descriptors, or runtime characteristics that are unsupported by the supplied data. Placeholder imagery SHALL NOT introduce client logos, claims, or metrics until a verified real project image is supplied.

#### Scenario: Claims match supplied project content

- **WHEN** each case-study narrative is compared with the supplied project details
- **THEN** every stated technology, client, status or timeframe, and outcome is supported by the supplied details

#### Scenario: Placeholder adds no claims

- **WHEN** a case-study placeholder image is inspected
- **THEN** it conveys no project-specific claim, client logo, metric, or tool version

### Requirement: Native styling, no remote assets, and local placeholder imagery

The section SHALL render using the page's existing stylesheet collection and design tokens. It SHALL NOT require a CSS framework, a CDN stylesheet, a remote background image, a Stitch asset, or any new JavaScript. It SHALL use one local placeholder image asset with a gradient overlay built from existing design tokens rather than new palette colors.

#### Scenario: No external styling or imagery dependency

- **WHEN** the page is loaded with network access limited to the page's own origin and its configured font and icon sources
- **THEN** the projects section remains fully styled and legible with no remote background image request or Stitch asset request

#### Scenario: Placeholder media present

- **WHEN** the projects section is viewed
- **THEN** each card shows the same local placeholder image across the full card, with a left-to-right token-based gradient scrim and left-aligned content leaving the image visible on the right, and no card fetches a remote or Stitch-hosted image

#### Scenario: Left-aligned content preserves image detail

- **WHEN** a case study is viewed on a desktop viewport
- **THEN** its metadata, title, narrative, highlights, and technology labels occupy the left portion of the card while the right portion of the placeholder background remains visible through the gradient scrim

#### Scenario: Existing image rules unchanged

- **WHEN** a cold-cache browser loads the page
- **THEN** the image request set is unchanged except for one local placeholder asset loaded below the fold, and the hero, technical-stack, and TCS logo requests and priorities are unchanged

### Requirement: Static future replacement

When real project data and images are provided, each case study SHALL be replaceable by editing served HTML and local files only, without adding a JavaScript module, framework, build step, or external dependency.

#### Scenario: Swap placeholder for real content

- **WHEN** a real project image and its verified copy replace a placeholder entry
- **THEN** the card keeps its section structure, design tokens, accessibility behavior, and no-JavaScript visibility

### Requirement: Navigation and progressive enhancement

The page navigation SHALL include a link targeting the featured projects section. All section content SHALL be present in the served markup and usable with JavaScript disabled. Any reveal animation SHALL be handled by the page's existing section reveal behavior without blocking content.

#### Scenario: Navigation link

- **WHEN** a visitor activates the "Projects" navigation link
- **THEN** the featured projects section is brought into view

#### Scenario: JavaScript unavailable

- **WHEN** the page is loaded with JavaScript disabled
- **THEN** all case studies, their highlights, their technology labels, and their placeholder media are visible without any permanently hidden or placeholder-only loading state

### Requirement: Responsive and accessible presentation

The case-study entries and their highlight items SHALL remain readable and non-overlapping from mobile through desktop widths. Headings SHALL follow the page's hierarchy, decorative icons and placeholder images SHALL NOT be announced as content, and interactive elements SHALL be keyboard reachable.

#### Scenario: Narrow viewport

- **WHEN** the page is viewed at a 375px-wide viewport
- **THEN** each case study, its three highlight items, and its placeholder media are fully visible without horizontal overflow

#### Scenario: Assistive technology

- **WHEN** a screen reader encounters a case study
- **THEN** it announces the heading, category, client, narrative, highlights, and technology labels, and does not announce decorative icons or the placeholder image as separate content
