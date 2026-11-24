# Tasks

## 1. Recruiter page scaffold

- [x] 1.1 Create `cv/index.html` from the current `index.html` before rewriting the root page; verify the new file still contains the experience timeline, projects, certifications, communication details, vacancy dialog, LinkedIn, CV download, and footer.
- [x] 1.2 Update asset URLs in `cv/index.html` to resolve from the nested path; verify `styles/style.css`, `scripts/main.js`, and representative images return no 404s when the page is served at `/cv/`.
- [x] 1.3 Set recruiter-specific page metadata and navigation; verify the title and description use candidate framing and no Portfolio menu or footer link is presented.

## 2. Portfolio page structure and controls

- [x] 2.1 Rewrite the root hero with client-facing enterprise web delivery copy; verify the vacancy-match control and LinkedIn option are absent while the email and GitHub actions remain.
- [x] 2.2 Remove the download-resume control from the portfolio header; verify no download-resume link is present in the portfolio header while `/cv/` still has one.
- [x] 2.3 Order the portfolio page as hero, featured projects, technical skills, "Background experience" control, experience, and minimal footer; verify the DOM order on the rendered page.
- [x] 2.4 Remove communication/languages, certifications, and interests from the portfolio page; verify none of those sections appears there while all remain on `/cv/`.
- [x] 2.5 Set portfolio-specific page metadata, navigation, and a footer cross-link to `/cv/`; verify the title and description use consultant framing and the cross-link resolves correctly.
- [x] 2.6 Keep visible copy limited to verified facts already supported by the project; verify no rates, testimonials, booking links, availability counters, or invented process claims appear on the portfolio page.

## 3. Reveal behavior and shared data

- [x] 3.1 Add named portfolio and candidate profile variants to `scripts/data/cvProfile.js`; verify both exports exist and shared facts are not duplicated between them.
- [x] 3.2 Update the vacancy comparison prompt path to import the candidate variant; verify `buildPrompt` still receives candidate-framed copy and never receives portfolio-framed copy.
- [x] 3.3 Add a small section module for the "Background experience" control and initialize it only where the control exists; verify the portfolio toggles the experience section without JavaScript errors and `/cv/` remains unaffected.
- [x] 3.4 Verify progressive enhancement for the reveal: with JavaScript disabled the experience section is visible, and with JavaScript enabled it is collapsed after load and toggles in place.
- [x] 3.5 Verify the reveal control exposes expanded/collapsed state to assistive technology and keeps keyboard operation working; verify the visible state and exposed state match after repeated activations.
- [x] 3.6 Verify visible section content remains in both HTML files; verify all intended sections are present with JavaScript disabled on both pages.

## 4. Styling and responsive behavior

- [x] 4.1 Add shared styles for the discreet reveal control and any portfolio-specific framing; verify both pages use existing Material 3 tokens and add no new palette colors or remote assets.
- [x] 4.2 Check both entry points at desktop and 375px-wide viewports; verify headings, cards, navigation, reveal control, and the portfolio cross-link remain readable and non-overlapping with no horizontal overflow.
- [x] 4.3 Check heading hierarchy and accessible names on both pages; verify each page has one main landmark, a level-one hero heading, and labelled navigation and sections.

## 5. Deployment and documentation

- [x] 5.1 Update `.github/workflows/pages.yml` to copy `cv/` into `_site`; verify the prepared artifact contains both `index.html` and `cv/index.html` plus shared folders.
- [x] 5.2 Update `README.md` to describe the two URLs, shared assets, variant-aware profile data, and the progressive experience reveal; verify the documented local serve steps work for both `/` and `/cv/`.
- [x] 5.3 Verify generated deployment configuration remains reachable by the recruiter page only; verify the portfolio page neither requests the AI config module nor exposes vacancy-match controls.

## 6. Integration verification

- [x] 6.1 Serve the site locally and inspect both pages with network logging; verify shared CSS, JS, fonts, icons, and images resolve without unexpected 404s or remote image requests.
- [x] 6.2 Exercise vacancy comparison on `/cv/` and confirm its absence on `/`; verify the dialog resets on reopen, degrades without a key, and keeps email and CV download fallbacks available.
- [x] 6.3 Verify the final page inventories: portfolio has no vacancy match, LinkedIn, download-resume, communication, certifications, or interests; recruiter page retains all of them.
- [x] 6.4 Run `git diff --check` and `openspec validate split-portfolio-and-cv-pages --strict`; verify both commands pass before implementation is considered complete.

## 7. Recruiter projects and link refinement

- [x] 7.1 Move the projects section after the experience timeline in `cv/index.html`; verify DOM order and that the `#projects` fragment still resolves.
- [x] 7.2 Rename the recruiter projects heading to "Side Projects & Learning Experiments" and rewrite its intro and card framing as personal side projects or learning experiments; verify no copy implies concurrent commercial work.
- [x] 7.3 Remove the Portfolio menu item and footer cross-link from `cv/index.html`; verify no link to `/` remains on the recruiter page.
- [x] 7.4 Update `README.md` to document the one-way portfolio-to-CV cross-link and the recruiter project framing; verify both entry points still serve all required sections.
- [x] 7.5 Re-run responsive, no-JavaScript, network, and validation checks; verify both pages pass with no horizontal overflow and `git diff --check` is clean.
