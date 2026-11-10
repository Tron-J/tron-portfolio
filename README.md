# Tron portfolio

Portfolio for Julius Joseph, who uses Tron as his engineering brand. The homepage introduces his background in hardware, firmware, software, and machine-learning foundations in a light coffee palette. The featured Smart Collar project is a working sheep-monitoring system spanning assembled hardware, firmware, cloud storage, and a mobile app.

## Design and interactions

- Warm cream `#f7f3ed` backgrounds, ivory `#fffcf7` surfaces, pale sand `#eee4d8`, warm near-black `#191715` text and selected controls, and restrained coffee/caramel accents carry the visual identity. Most of the page remains light.
- The header uses the original generated transparent `tron-mark.webp` for light backgrounds. Existing espresso favicon and touch-icon tiles remain unchanged. Asset provenance, exports, and the generation prompt are recorded in [docs/brand-assets.md](./docs/brand-assets.md).
- The visitor flow moves from the introduction to Work, Skills, Experience, About, and Contact, with navigation in that order. The active section receives a visual indicator and `aria-current`. The mobile menu closes after navigation and with Escape. The footer contains a single copyright line. A résumé action remains hidden because the supplied private CV is not approved as a public download.
- EngineeringScene uses the original generated artwork at [public/brand/embedded-scene.webp](./public/brand/embedded-scene.webp). The ivory board, bronze processor, and sensor connectors are concept artwork, not a photograph of the project's physical hardware. A stable camera and undistorted image preserve the artwork's geometry. The introduction settles into place, then sensor points illuminate in sequence, aligned SVG trace packets travel toward the processor, and the processor responds with restrained highlights. The signal sequence loops every 7.2 seconds. A shared wrapper moves the image and overlays together through a smooth 8px vertical float every 3.6 seconds. Motion starts automatically when the artwork is ready and follows the existing Pause/Resume control, offscreen and tab visibility, and reduced-motion preferences. The image retains descriptive alt text without a visible caption or separate replay control.
- Work shows the actual project registry directly, without filters, counters, or future-project placeholders. Smart Collar — Sheep Health Monitoring is active and running. Julius's contribution includes hardware design and assembly, ESP32-C3 firmware, and a Flutter/Dart app connected through MQTT, a backend, and Supabase. The homepage uses real project photographs and an app screenshot extracted from the supplied report; the case study explains implementation, functional demonstration, and remaining measurement limits.
- Skills covers Hardware development, Embedded programming, IoT & connected systems, Python programming, Machine learning foundations, and Software & mobile development. Descriptions and tags are grounded in the supplied CV, certificate, and latest user confirmations; the collar is not used as the sole source for the whole profile. No proficiency scores or unsupported advanced ML tools are listed.
- Experience & education records the completed nHub Foundation internship in Jos (August 2025–January 2026), the graduated BSc in Software Engineering from Nigerian Army University Biu, and the completed Supervised Machine Learning: Regression and Classification certificate from DeepLearning.AI/Stanford Online through Coursera (13 October 2026). The CV-supported 30+ hardware prototypes, project examples, and teamwork appear in the internship narrative, not as decorative statistics.
- The case-study architecture diagram contains keyboard-accessible nodes for three sensors, ESP32-C3/FreeRTOS firmware, Wi-Fi/MQTT, backend/Supabase, and Flutter/Dart. Each updates a factual explanation with announced feedback. It explains the running system rather than displaying live measurements.
- About introduces Julius as a Software Engineering graduate and describes his nHub experience and hardware, firmware, and Python interests beside AboutGlobe. The supporting bronze orb remains visually secondary to the hero. It uses a faceted core, a fine outer wire shell, restrained highlights, and a few orbital details, with a stable tilt and smooth rotation. A static fallback covers initialisation or canvas failure; reduced motion receives a still version. The visual makes no claim about location, clients, or global reach, ignores pointer events, and stops its animation loop offscreen, on an inactive tab, and when paused. On phones, it sits below the copy.
- Contact displays Julius Joseph and the approved public email, [juliusjoseph574@gmail.com](mailto:juliusjoseph574@gmail.com). Send email opens a mail application; Copy email provides an accessible success message and a selection-based fallback if the Clipboard API is unavailable.
- Shorter section gaps, bounded text widths, consistent card proportions, and subtle borders keep the light homepage and case study visually coherent.
- CSS motion, a reading-progress indicator, and interaction feedback support the flow. Scroll entrances use a 750ms translation with 80ms stagger increments; content remains visible by default and never depends on an opacity reveal. Whole-figure hero parallax is scroll-driven and capped at 12px on desktop and 6px on phones, preserving image/overlay alignment. A visible pause control and the device's reduced-motion preference stop decorative motion. Focus and anchor navigation settle content instead of leaving it moving under interaction.
- Available Sites frontend design guidance informed the local refinement. The approved Figma plugin is not installed or connected, so no Figma document was created. A Claude integration or CLI was unavailable, and no Claude collaboration is claimed. No untrusted skill was installed.

## Local development

Use Node.js 22.13.0 or newer. Run commands from this project folder.

On a fresh checkout, use the configured dependency installer:

```sh
npm run install:ci
```

This helper respects the Sites execution profile and lockfile. Do not overlap installers. Working dependencies do not need reinstalling before every preview.

```sh
npm run dev
```

Open the URL printed by the server. The portable profile normally starts at `http://localhost:5173`. Keep previews on loopback. Stop the server with `Ctrl+C`; select another port with `npm run dev -- --port 5174`.

Before sharing changes:

```sh
npm run typecheck
npm run lint
npm run build
```

The build generates output in `dist/`. A successful website build does not establish firmware operation or sensor accuracy.

## Files to edit

| File | Purpose |
| --- | --- |
| [app/page.tsx](./app/page.tsx) | Homepage sections and visitor flow. |
| [app/globals.css](./app/globals.css) | Colors, type, spacing, responsive layout, and motion. |
| [components/engineering-scene.tsx](./components/engineering-scene.tsx) | Decorative processor artwork for the hero. |
| [components/engineering-scene.css](./components/engineering-scene.css) | EngineeringScene presentation and animation. |
| [public/brand/embedded-scene.webp](./public/brand/embedded-scene.webp) | Generated hero concept artwork. |
| [components/telemetry-diagram.tsx](./components/telemetry-diagram.tsx) | Interactive, source-based project architecture explanations. |
| [components/contact-section.tsx](./components/contact-section.tsx) | Public email actions and copy feedback. |
| [components/contact-section.css](./components/contact-section.css) | Contact card presentation and responsive styles. |
| [components/site-shell.tsx](./components/site-shell.tsx) | Branding, section navigation, mobile menu, and minimal footer. |
| [components/site-shell-enhancements.css](./components/site-shell-enhancements.css) | Active navigation and focus presentation. |
| [components/about-globe.tsx](./components/about-globe.tsx) | Dimensional About orb, static fallback, canvas lifecycle, and offscreen/reduced-motion handling. |
| [components/about-globe.css](./components/about-globe.css) | Orb size, light presentation without a flat halo, and pointer isolation. |
| [components/motion-system.tsx](./components/motion-system.tsx) | Progressive motion, reading progress, and pause control. |
| [components/scroll-motion.css](./components/scroll-motion.css) | Visible-by-default section entrances, whole-figure depth, and architecture accents. |
| [components/skills-section.tsx](./components/skills-section.tsx) | Six supported skill categories, descriptions, and tags. |
| [components/experience-section.tsx](./components/experience-section.tsx) | Completed internship, education, and verified certificate. |
| [components/profile-sections.css](./components/profile-sections.css) | Skills and experience composition and responsive layout. |
| [lib/projects.ts](./lib/projects.ts) | Typed project records and categories. |
| [components/project-collection.tsx](./components/project-collection.tsx) | Featured project preview, contribution, limits, and case-study link. |
| [components/project-media.tsx](./components/project-media.tsx) | Responsive report-derived project photographs and app screenshots. |
| [public/projects/smart-collar/](./public/projects/smart-collar/) | Selected project-report images used on the homepage and case study. |
| [app/projects/animal-health-telemetry/page.tsx](./app/projects/animal-health-telemetry/page.tsx) | Embedded-systems case study. |
| [lib/portfolio.ts](./lib/portfolio.ts) | Shared portfolio details and contact settings. |
| [app/layout.tsx](./app/layout.tsx) | Shared page shell and metadata. |
| [docs/project-evidence.md](./docs/project-evidence.md) | Supported project facts and limits on claims. |
| [docs/brand-assets.md](./docs/brand-assets.md) | Generated monogram provenance, header/favicon exports, and source prompt. |

Keep existing build and hosting helpers when editing the site's presentation or content.

## Adding a project

Add a record to the typed `projects` array in [lib/projects.ts](./lib/projects.ts), including a unique `id`, display `number`, title, supported category, summary, status, personal `contribution`, verification `statusNote`, `href`, and technology tags. The current category types are `Embedded systems` and `Machine learning`. Contribution and status details are rendered from each project record, so each entry must describe its own work and evidence.

Create the matching case-study route at `app/projects/<slug>/page.tsx`, and make its path match the record's `href`. Explain the problem, your contribution, engineering choices, evidence, and limitations. Give new work an appropriate preview instead of reusing the telemetry architecture for an unrelated project, then check the homepage and case-study link. Add only actual work that is ready to share; no ML entry is needed until a real project is available.

## Contact and remaining content

Julius Joseph has approved [juliusjoseph574@gmail.com](mailto:juliusjoseph574@gmail.com) for publication. His full name, Tron brand, and email are configured in [lib/portfolio.ts](./lib/portfolio.ts). The Contact section and navigation item are enabled on the homepage and case study. There is no contact form or message-delivery backend; mailto links open the visitor's email application. The Copy email button writes the public address to the clipboard, reports success, and offers a selection-based fallback. Add GitHub or LinkedIn URLs only when genuine public profiles are supplied.

Before public launch, supply or confirm:

- Any GitHub or LinkedIn profiles that should be public.
- A public-safe résumé export, if a download is wanted. Do not expose the supplied private CV or its address, phone numbers, or referee details.
- ML project evidence: problem, data permissions, personal contribution, evaluation, measured results, and approved code/demo links.
- Any additional approved project demonstrations or sanitized repository links.
- Further verified biography, professional availability, and future project descriptions.

Use real evidence for employers, metrics, testimonials, and project outcomes. Do not add fabricated live sensor readings or placeholder contact links. The collar's health and activity labels use configured rules; the working system is not presented as a trained ML model or a validated medical assessment. App screenshots show development data.

## Local review

Earlier review records are in the [orb-refinement report](./docs/orb-refinement-verification.md), [light-refinement report](./docs/light-refinement-verification.md), and [dark redesign report](./docs/redesign-verification.md). Those reports document their respective iterations and do not establish verification of the latest profile, project-media, architecture, or motion changes. Final browser QA and project checks for this refinement are being run separately; this document does not claim they have passed. Reusable palette, typography, layout, and component specifications are in [the design system](./docs/design-system.md).

This iteration is local only, with no repository synchronisation, hosting changes, publishing, or deployment. Use the local preview at `http://127.0.0.1:5173` for review while the development server is running. Public email actions are enabled; professional-profile and résumé controls remain hidden until genuine links or a document are supplied.

For substantial updates:

1. Review the homepage and case study at desktop, tablet, and phone widths.
2. Check navigation, keyboard focus, contrast, readability, and horizontal overflow.
3. Check the hero's automatic settle, float, and sensor sequence, globe, offscreen pause, tab inactivity, manual pause, and reduced-motion behaviour.
4. Check interactive architecture nodes, active section navigation, mobile menu behaviour, configured project and email links, and Copy email feedback. Check any profile or résumé links if supplied.
5. Run the type check, lint check, and production build, then review the local preview.

Keep firmware credentials, private device/network details, local environment files, and runtime state out of public assets. Back up authored source and approved assets. Periodically review descriptions and contact links.

## Verification limits

The project description combines the supplied firmware, Julius's latest confirmation that the system is active and running, and the supplied project report. PDF pages 48, 52, 53, 59, 61, and 68 support the hardware/wiring, assembled enclosure, application screens, and functional-test visuals. The site uses selected image exports rather than publishing the complete report. Firmware inspection alone was read-only and did not establish hardware execution; the later report and user confirmation provide the broader system evidence.

The private CV supports internship work, practical prototype experience, programming tools, and collaboration. Latest user corrections supersede its older undergraduate and anticipated-completion wording. The separate Coursera certificate supports the exact course, provider, completion date, and public verification link. Private address, phone numbers, referee information, the full CV, and raw source documents are not public assets.

Functional demonstration does not establish clinical accuracy, disease diagnosis, validated behaviour classification, measured ML performance, battery life, ingress protection, latency, or long-term reliability. SpO₂ is not presented as a completed end-to-end feature. The internship's 30+ prototype count is CV-supported experience; no unsupported percentage contribution is published. Keep new claims within their source evidence.
