# Light coffee refinement

This records the earlier light-palette pass. See [dimensional orb refinement](./orb-refinement-verification.md) for the current About visual, copy, screenshots, and motion capture.

Updated locally on 2026-11-10. Preview: `http://127.0.0.1:5173/`. No repository synchronization, publishing, or deployment was performed.

## Changes

- [Shared styles](../app/globals.css) now use warm cream `#f7f3ed`, ivory `#fffcf7`, pale sand `#eee4d8`, espresso text `#33251d`, coffee accents `#76523b`, and restrained caramel `#b88155` details. The case study and [telemetry diagram](../components/telemetry-diagram.css) share the light system.
- [Homepage](../app/page.tsx) uses plain Work, Skills, and About headings, a shorter introduction, and one factual About paragraph. The professional disciplines appear once in the introduction.
- [Hero artwork](../components/engineering-scene.tsx) and [its styles](../components/engineering-scene.css) now form a decorative processor illustration. Sensor-to-MQTT labels were removed, leaving one explanatory architecture on the homepage.
- [Featured work](../components/project-collection.tsx) puts the project description, contribution, and actual status before the architecture. [Project data](../lib/projects.ts) keeps implemented firmware separate from unverified hardware/field performance.
- [AboutGlobe](../components/about-globe.tsx) and [its scoped styles](../components/about-globe.css) adapt the existing SVG globe's latitude/longitude motif into a slowly rotating Canvas2D wireframe. It is at most 300px wide, smaller than the hero illustration, with no geographic reach claims.
- [Header](../components/site-shell.tsx) reuses the original generated dark monogram designed for light backgrounds. The existing favicon tiles are retained.
- [Skills](../components/skills-section.tsx) and [case-study headings](../app/projects/animal-health-telemetry/page.tsx) use direct section names. Substantive firmware evidence and limitations remain.

No real project photograph or screenshot was found in the supplied materials. The website uses accurate original architecture artwork and clearly described decorative illustrations.

## Verification

| Check | Result |
| --- | --- |
| Homepage and case study at 1440, 768, 390, and 320 CSS pixels | No horizontal overflow, overflowing headings, broken images, or missing anchor targets |
| Visual review | Desktop, tablet, and phone layouts inspected in the browser |
| Rendered homepage text contrast | 51 samples checked; minimum 4.64:1, no failures |
| Globe offscreen | Frame count stable at 2 → 2 over 450ms |
| Globe visible | Frame count 7 → 27 over 650ms, approximately 30 paints/second |
| Pause control | Globe frame count stable at 29 → 29 over 450ms |
| Reduced motion | Static globe frame stable at 34 → 34 over 450ms; decorative CSS animation disabled |
| Canvas containment | Canvas and container bounds match; overflow hidden; pointer-events none |
| Mobile navigation | Work, Skills, and About reach their sections and close the menu |
| Escape and desktop resize | Menu closes; Escape returns focus to toggle |
| Keyboard | Skip link/focus ring visible; case-study disclosure opens with Enter |
| Project route, return link, back to top | Passed |
| Browser errors, failed requests, HTTP errors during clean layout runs | None |
| Final preview reload | A generated SVG-ID hydration mismatch was found and fixed; two subsequent clean reloads recorded no console errors or failed requests |
| ESLint | Passed after correcting an unescaped apostrophe in the artwork description |
| Production build | Passed; only non-blocking Vinext timing/route-classification notices |
| Editor diagnostics | No errors |
| TypeScript typecheck | Passed |

The globe stops its requestAnimationFrame loop under reduced motion, manual pause, hidden-tab state, and offscreen state. Resize can repaint a static frame for sharpness. Observers, listeners, and pending animation frames are cleaned up on unmount; missing observer APIs use a passive bounds fallback. No new dependency or asset download is required.

The decorative hero SVG is rendered on the server with stable accessibility IDs. Removing its unnecessary client boundary resolved the final-reload hydration warning without changing the visual layout.

This is a focused browser, contrast, motion, and keyboard review, not a full accessibility certification. Website checks do not validate the firmware on hardware.

## Screenshots

- [Desktop hero](../outputs/light-hero-desktop.png)
- [About and globe](../outputs/light-about-globe.png)
- [Tablet homepage](../outputs/light-home-tablet.png)
- [Mobile homepage](../outputs/light-home-mobile.png)
- [Desktop case study](../outputs/light-case-study.png)

Screenshots were captured with reduced motion for stable composition. Windows display scaling makes their pixel dimensions larger than their CSS viewport widths.

## Missing information and integrations

- A short verified background: current work or study, interests, and professional direction. About remains brief until those details are supplied.
- Public email and approved GitHub/LinkedIn links; optionally a real résumé file. Contact and résumé controls remain omitted while unconfigured.
- Approved project photographs or screenshots, if available later.

The approved Figma catalog entry was checked and remains not installed, with the earlier setup still pending. Complete the approved installation and Figma account authorization to enable its design tools. No Figma document was created. The available Sites frontend-design guidance and local browser workflow supported this refinement; no untrusted skills were installed.
