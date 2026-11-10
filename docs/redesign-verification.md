# Local redesign verification

This records the earlier dark redesign. See [light coffee refinement](./light-refinement-verification.md) for the current palette, globe, screenshots, and verification.

Reviewed on 2026-11-09 at `http://127.0.0.1:5173/`. This work did not start repository synchronization, publishing, or deployment.

## Scope and visual review

The existing homepage, shared navigation, project presentation, and styles were updated in place. The existing case-study route, source-based evidence, build configuration, and motion controls remain. The reference portfolio was inspected for hierarchy, typography, hero composition, navigation, and project previews before implementation. See [design system](./design-system.md) for original local layout specifications and integration limitations.

Both the homepage and [animal-health case study](../app/projects/animal-health-telemetry/page.tsx) were opened and measured at 1440, 768, 390, and 320 CSS pixels. Full-page screenshots at desktop, tablet, and phone widths were visually inspected. The browser capture uses Windows display scaling, so exported PNG pixel dimensions are larger than their CSS viewport widths.

| Check | Result |
| --- | --- |
| Horizontal page overflow at all eight route/width combinations | None |
| Overflowing headings, broken images, missing local anchor targets | None |
| Published project cards | One telemetry project; no filters, counter, or empty state |
| Contact and résumé controls without supplied public details | Omitted, including Contact navigation |
| Mobile menu navigation | Closes after Work, Skills, and About |
| Escape | Closes menu and restores focus to its toggle |
| Resize to desktop | Closes menu and resets expanded state |
| Homepage section anchors and case-study contents | Reach the intended section below the header |
| Project link, case-study return, cross-page Work link | Passed |
| Skip link and keyboard focus styling | Visible on keyboard focus |
| Case-study next-steps disclosure | Opens with Enter |
| Back to top | Returns to scroll position zero |
| OS reduced motion | No running animations; all reveal content visible; smooth scrolling disabled |
| Pause/resume control | Pauses all running animation immediately, exposes reveal content, and resumes decorative animation |
| Console errors, failed requests, HTTP errors during clean browser runs | None |
| Header WebP, favicon tile, and touch icon | HTTP 200 |
| TypeScript: npm run typecheck | Passed |
| ESLint: npm run lint | Passed |
| Production: npm run build | Passed; existing non-blocking Vinext route-classification/plugin-timing notices |
| Editor diagnostics | No errors |

Two issues identified during QA were fixed: framework-intercepted section links did not reliably scroll, and paused reveal transitions could briefly continue. Section navigation now uses native anchors; menu resize handling also listens for resize events, and paused reveal content has no transition.

## Readability and limits

Palette contrast was calculated using relative luminance. Cream, muted text, and caramel on the three main dark surfaces range from 5.90:1 to 15.24:1, above the 4.5:1 normal-text threshold. Buttons reverse caramel and espresso for a 7.51:1 pair. This is a focused contrast, semantic, keyboard, and motion review, not a complete accessibility certification or screen-reader test.

The schematic is original architecture artwork, not a photograph, a fabricated hardware specification, or live readings. The case study distinguishes configured firmware behavior from measured hardware/field results. Firmware compilation, sensor calibration, hardware execution, and medical or ML validation were outside this website redesign.

## Finished layouts

| Page | Desktop | Tablet | Phone |
| --- | --- | --- | --- |
| Homepage | [Screenshot](../outputs/home-desktop.png) | [Screenshot](../outputs/home-tablet.png) | [Screenshot](../outputs/home-phone.png) |
| Case study | [Screenshot](../outputs/case-study-desktop.png) | [Screenshot](../outputs/case-study-tablet.png) | [Screenshot](../outputs/case-study-phone.png) |

## Files changed

| Files | Change |
| --- | --- |
| [Homepage](../app/page.tsx), [global styles](../app/globals.css) | Original espresso layout, concise introduction, featured work, skills, and compact About; matching case-study styling |
| [Engineering illustration](../components/engineering-scene.tsx), [illustration styles](../components/engineering-scene.css) | Accessible original schematic, responsive legend, restrained motion |
| [Project component](../components/project-collection.tsx), [project data](../lib/projects.ts), [skills](../components/skills-section.tsx) | Direct project presentation, per-project contribution/status, evidence-backed skill groups |
| [Shared shell](../components/site-shell.tsx), [Contact](../components/contact-section.tsx), [profile configuration](../lib/portfolio.ts) | Clean native section navigation, mobile behavior, minimal footer, conditional real contact links |
| [Metadata](../app/layout.tsx), [brand assets](./brand-assets.md) and the linked logo files | Real generated header mark and favicon/touch tiles |
| [README](../README.md), [design system](./design-system.md), this verification record | Current flow, local editing instructions, tokens, screenshots, and limitations |

## Personal information still needed

- A public email and approved GitHub/LinkedIn profile URLs to enable Contact.
- A short verified background: current work or education, interests, and professional direction for About.
- A real résumé file, only if a download button is wanted.

Figma installation/account setup remains incomplete, and no Figma document was created. The generated logo and export provenance are recorded in [brand assets](./brand-assets.md).
