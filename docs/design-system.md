# Tron: local design direction

The reference at https://kidarh-portfolio.netlify.app/ was opened and inspected before the earlier redesign. Its compact navigation, confident introductory typography, clear work CTA, and substantial project previews informed the hierarchy. Tron's copy, generated monogram, engineering artwork, palette, and composition are original.

This refinement uses the available Sites frontend design guidance and local implementation specifications. The approved Figma plugin is not installed or connected, so no Figma document or desktop/mobile Figma layouts were created. A configured Claude integration or CLI was unavailable; no Claude collaboration is claimed. No untrusted skills were installed.

## Reusable foundations

| Token | Value | Use |
| --- | --- | --- |
| Background | `#f7f3ed` | Warm cream page shell |
| Surface | `#fffcf7` | Soft ivory cards and controls |
| Selected surface | `#eee4d8` | Pale sand section and card separation |
| Primary text / selected accents | `#191715` | Warm near-black headings, body, and primary controls |
| Secondary text | `#66594f` | Supporting copy |
| Coffee accent | `#76523b` | Actions, headings, lines, and focus rings |
| Caramel accent | `#b88155` | Restrained decorative highlights |
| Border | `#d7c7b7` | Subtle card and section edges |

Typography uses the local Arial/Helvetica sans-serif stack, with no remote font dependency. Headings use tight spacing and strong weight; body copy stays readable and concise. Mono text is reserved for technical labels. A 1180px maximum content width, shorter section gaps, bounded paragraph widths, and consistent card padding coordinate the layout.

Near-black is reserved for readable text and selected controls or accents. Coffee carries secondary actions and focus presentation; caramel is restrained decoration. Cream and sand surfaces keep the page predominantly light. The [orb refinement report](./orb-refinement-verification.md) and [light refinement report](./light-refinement-verification.md) document earlier iterations; they do not verify the latest changes. Current browser QA and project checks are being run separately, with no pass result claimed here.

## Layout and components

- Desktop: 80px sticky header, paired introduction and generated processor artwork, Work with project details and real report-derived imagery, six skill groups, Experience & education, personal About with a supporting globe, and Contact. Detailed interactive architecture belongs in the case study.
- Tablet: fluid headings, narrower gutters, compact card padding, and a diagram that responds to its container.
- Phone: 72px header with a disclosure menu, stacked content, readable project details, and the smaller orb below the About copy with its own breathing room. The main layout stacks below 761px.
- Headings and navigation follow Work, Skills, Experience, About, and Contact. IntersectionObserver and throttled scroll measurements maintain an active section indicator with `aria-current`. The mobile disclosure menu closes after navigation and with Escape; Escape restores focus to its toggle.
- Primary buttons use cream text on warm near-black, with a visible focus ring and offset. Coffee appears on hover; secondary buttons use an outline.
- The project component receives its summary, contribution, technology tags, and active/running status from a typed record. Hardware, firmware, backend/Supabase, and Flutter/Dart contributions appear together. Real report-derived photographs and app screens support the Work preview, with captions distinguishing development data from validated measurements. The case study explains the complete architecture and evidence boundaries. One project needs no category filters or decorative count. Subtle borders and ivory/sand surfaces separate text and media.
- Six Skills cards cover hardware, embedded programming, IoT, Python, machine-learning foundations, and software/mobile development. Concise descriptions and tags replace proficiency scores. Experience & education records the completed internship, graduated degree, and verified certificate. The CV-supported 30+ prototypes remain part of the internship narrative rather than a standalone statistic.
- Navigation uses the original generated transparent `tron-mark.webp`, which was designed for cream backgrounds. Existing espresso favicon and touch-icon tiles remain unchanged.
- Contact identifies Julius Joseph and shows the approved public email, [juliusjoseph574@gmail.com](mailto:juliusjoseph574@gmail.com). The card has a mailto action and Copy email button with a polite live success message. Native selection provides a clipboard fallback; the visible address remains available if copying is unsupported. No contact form or message-delivery backend is implied. A résumé action requires a real configured file, and no profile URLs are invented.
- The footer contains only the copyright line, with mobile clearance for the fixed motion control.

## Visual roles and motion

The hero uses original generated artwork from [public/brand/embedded-scene.webp](../public/brand/embedded-scene.webp): an ivory circuit board with a dimensional processor, bronze connections, and three sensor connectors. The image is an engineering concept visual, not a photograph or representation of the project's actual hardware. Descriptive image alt text identifies the generated scene; there is no visible caption or separate replay control, and no text is baked into the artwork.

The hero camera stays fixed. A short, smooth settle introduces the board without stretching or perspective-distorting the raster. A shared wrapper moves the raster and SVG layers together in an 8px vertical float with a smooth 3.6-second loop. SVG overlays share the artwork's 1536 × 1024 coordinate system: sensor connections illuminate in sequence, signal packets follow aligned traces toward the processor, and restrained warm highlights show a processor response. The sensor sequence continues in 7.2-second loops with packets fading before they wrap. Animation starts automatically when the artwork is ready. The artwork and overlays cannot intercept clicks. Text and nearby buttons stay separate and stationary.

The hero uses the existing Pause/Resume, offscreen, and inactive-tab hooks. Reduced motion removes the float, settle, and animated overlays, leaving the complete generated artwork and page content visible. All illustration layers scale together with the responsive container. Scroll-driven parallax translates the complete figure rather than individual layers and is capped at 12px on desktop and 6px on phones. It runs on scroll/resize updates rather than a continuous JavaScript rendering loop.

Work uses a functional-test photograph and mobile dashboard screenshot from the supplied project report. The case study adds enclosure, assembly, wiring, sign-in, and alert images and the interactive system architecture: DS18B20, MAX30102, and MPU9250 sensors → ESP32-C3/FreeRTOS firmware → Wi-Fi/MQTT → backend/Supabase → Flutter/Dart. Keyboard-accessible component buttons expose factual explanations. Selected state is expressed with `aria-pressed`, and the detail panel announces changes politely. The diagram has restrained connection accents when entering view; it is not a live measurement display. Configured timing and development app data are distinguished from validated performance.

About introduces Julius Joseph as the person behind Tron, a Software Engineering graduate of Nigerian Army University Biu, and a former nHub intern with hardware, firmware, and Python interests. It is a personal introduction rather than another collar description. AboutGlobe remains secondary to the hero. The dimensional bronze orb develops the existing SignalField motif through a faceted core, a fine outer wire shell, restrained highlights, and a limited set of points and orbital details. Foreground and background geometry have distinct contrast. Its container has no large beige background halo. A fixed tilt and steady rotation retain a stable silhouette; the orb remains smaller than the hero artwork. It makes no claim about clients, location, reach, or impact. Its isolated container, fallback, and canvas ignore pointer events.

The orb has a static fallback before canvas initialisation and keeps a polished still frame for reduced motion. It cancels its animation loop when offscreen, when the tab is inactive, or when the site's pause control is active. Its size follows the container and its pixel ratio and paint frequency are capped.

Section entrances use 750ms translate-only motion with 80ms stagger increments, capped at 400ms delay. Content is fully visible by default, including before observation, with JavaScript disabled, or if enhancement fails. Entrances do not hide text through opacity. Keyboard focus, hash navigation, history restoration, pause, and reduced motion settle content to a readable stationary state. Existing hero and orb motion remain independently coordinated within these controls.

## Evidence and remaining content

The Smart Collar description combines the supplied Arduino C++ firmware, latest user confirmation of a running hardware-to-app system, and the project report. PDF pages 48, 52, 53, 59, 61, and 68 support selected hardware/wiring, assembled enclosure, app-screen, and functional-test visuals. Only selected image exports are public; the complete report is not copied into site assets. Report evidence extends the earlier firmware-only review to physical assembly, MQTT communication, backend/Supabase, and the Flutter/Dart monitoring app.

Functional demonstration does not establish clinical accuracy, disease diagnosis, validated behaviour classification, battery life, ingress protection, latency, or long-term reliability. The project's health/activity labels remain rule-based, and app screenshots show development data. SpO₂ is not presented as a completed end-to-end feature.

The supplied private CV supports broader hardware/software skills, internship prototype experience, teamwork, and GitHub/version control. Latest user corrections establish that the nHub Foundation internship in Jos was completed from August 2025 to January 2026 and that the BSc Software Engineering degree is complete; the CV's older anticipated wording is not used. The separate certificate supports Supervised Machine Learning: Regression and Classification, authorized by DeepLearning.AI and Stanford Online through Coursera, completed 13 October 2026, with [public verification](https://coursera.org/verify/81ZXPUPQVMGF). No advanced ML results are inferred from course completion.

Julius Joseph's name, Tron brand, approved email, verified background, and demonstrated project contribution support the profile. The CV's private address, phone numbers, and referee details are excluded, and there is no public link to the raw CV or source PDFs. A public-safe résumé export and genuine professional-profile URLs remain optional outstanding content; their controls stay hidden until approved.

This refinement is local only. Repository synchronisation, hosting changes, publishing, and deployment are outside its scope.
