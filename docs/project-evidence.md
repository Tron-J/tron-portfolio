# Smart Collar: project and profile evidence

This document supersedes the earlier firmware-only assessment. That assessment was limited to the supplied sketch; it could not establish physical hardware or the app. The later project report and Julius Joseph's latest confirmation provide evidence of a running, assembled collar and connected monitoring app. Do not retain the old premise that hardware, backend, or mobile implementation is absent.

## Current public description

Julius designed and assembled a sheep-monitoring collar, wrote its Arduino C++ firmware, and built a Flutter/Dart app. Temperature, optical pulse, and motion sensing connect through an ESP32-C3 Mini, Wi-Fi/MQTT, a backend, and Supabase. The project is active and running, with physical assembly and a functional demonstration documented in the supplied report.

The system provides monitoring readings and rule-based alerts. It is not described as validated disease diagnosis or a trained machine-learning model. SpO₂ is not presented as a completed end-to-end feature.

## Source boundaries

| Source | Supports | Does not establish |
| --- | --- | --- |
| Latest user confirmation | Current active/running status; personal hardware, firmware, and Flutter app contribution; backend/Supabase scope. | Independent clinical or engineering performance metrics. |
| Supplied smart-collar project report | Hardware and wiring, physical assembly and enclosure, app screens, storage/communication implementation, functional testing. | Every broad claim or literature-review statement as a measured result of this implementation. |
| Current supplied Arduino sketch | Sensor interfaces, five FreeRTOS tasks, publication and reconnection paths, structured telemetry, configured rules. | Hardware accuracy, successful delivery guarantees, validated medical interpretation, or current cloud/app source code. |
| Supplied private CV plus latest corrections | Profile skills, completed internship, practical hardware experience, teamwork, and graduated education. | Independent evidence for the collar's performance or a public résumé download. |
| Supplied Coursera certificate | Exact completed ML course, providers, completion date, and public verification URL. | A degree from Stanford, advanced ML proficiency, or a trained model in the collar. |

The report informs this particular project's implementation and visuals. General Skills and About use Julius's CV, certificate, and direct confirmations instead of turning the collar report into his entire biography.

## Project implementation

| Area | Supported description |
| --- | --- |
| Hardware | ESP32-C3 Mini with DS18B20 temperature, MAX30102 optical pulse, and MPU9250 motion sensors; 18650 battery and TP4056 charging module. |
| Construction | Component selection, wiring, assembly, and enclosure integration. Photographs show interconnected modules and a hand-wired assembly, not a custom printed circuit board. |
| Sensor acquisition | OneWire/DallasTemperature for temperature, optical sample processing for pulse estimation, and acceleration processing for activity fields. |
| Task coordination | The current sketch creates five unpinned tasks with `xTaskCreate`: optical processing, motion, temperature, publication, and Wi-Fi reconnection. Do not describe them as pinned to specific processor cores. The Arduino loop also services MQTT. |
| Communication | Wi-Fi and PubSubClient MQTT, with ArduinoJson payload assembly and reconnection handling. Configured publication intervals are code settings, not latency or reliability measurements. |
| Storage and mobile app | Backend/Supabase storage connected to a Flutter/Dart interface with account sign-in, a monitoring dashboard, and alert views. |
| Functional demonstration | Assembled collar fitted to a sheep during functional testing, with sensing, communication, stored readings, and app presentation forming the demonstrated system. |
| Interpretation | Activity and health labels use configured rules. Displayed app data is development data, not validated medical measurement or evidence of diagnostic accuracy. |

## Report image provenance

Page references below are physical PDF page numbers, not the report's printed chapter-page numbering. The public site uses selected image exports in [the smart-collar media folder](../public/projects/smart-collar/), not the complete report.

| Physical PDF page | Evidence / selected media |
| --- | --- |
| 48 | Circuit and wiring diagram; exported as [wiring.webp](../public/projects/smart-collar/wiring.webp). |
| 52 | Open physical assembly and component integration; selected image exported as [assembly.webp](../public/projects/smart-collar/assembly.webp). |
| 53 | Closed enclosure; exported as [enclosure.webp](../public/projects/smart-collar/enclosure.webp). |
| 59 | Mobile sign-in and monitoring dashboard; exported as [app-sign-in.webp](../public/projects/smart-collar/app-sign-in.webp) and [app-dashboard.webp](../public/projects/smart-collar/app-dashboard.webp). |
| 61 | App alert detail and resolve action; selected image exported as [app-alerts.webp](../public/projects/smart-collar/app-alerts.webp). |
| 68 | Collar fitting during functional testing; exported as [field-test.webp](../public/projects/smart-collar/field-test.webp). |

Descriptions should match the selected image. Screenshot values are development data. The generated hero processor is separate concept artwork and must not be labelled as a photograph of this collar.

## Profile facts

- Julius Joseph uses Tron as his engineering brand. The approved public email is [juliusjoseph574@gmail.com](mailto:juliusjoseph574@gmail.com).
- He graduated with a BSc in Software Engineering from Nigerian Army University Biu. The latest user confirmation replaces the CV's older undergraduate and expected-graduation wording; no graduation date is invented.
- He completed the Embedded Systems and IoT internship at nHub Foundation in Jos from August 2025 to January 2026. The latest correction replaces the CV's anticipated-completion wording.
- The CV supports more than 30 Arduino/sensor/cloud hardware prototypes, gas-detection/RFID/environmental-monitoring examples, multidisciplinary teamwork, Python/C/C++, circuit interfacing/debugging, Blynk, and GitHub/version control. The count belongs in the internship narrative; the unsupported percentage-contribution claim is omitted.
- The separate certificate records completion of **Supervised Machine Learning: Regression and Classification**, authorized by DeepLearning.AI and Stanford Online and offered through Coursera, on 13 October 2026. Its [verification URL](https://coursera.org/verify/81ZXPUPQVMGF) is public. This is course completion rather than university enrollment or a degree.

## Claims that remain unsupported

- Clinical accuracy, disease diagnosis, validated behaviour classification, or a trained anomaly/disease model.
- Completed end-to-end SpO₂ integration; keep it out of headlines and demonstrated-feature lists.
- Measured battery life, waterproof or ingress-protection ratings, communication latency, uptime, long-term reliability, or deployment-scale outcomes.
- Verified TLS security, broker identity, production hardening, or a general security guarantee.
- Custom PCB fabrication, GPS tracking, or features not established by the current implementation evidence.

A functional demonstration is meaningful implementation evidence, but it does not supply those measurements. Website QA and production-build results validate the website; they do not independently test the collar hardware or medical claims.

## Source privacy and public exports

Keep the source PDFs, private CV, raw extraction text, personal address, private phone numbers, referee details, student identifiers, credentials, device/network identifiers, and private configuration out of public assets. Do not expose the complete CV through a résumé link. A download requires a separately approved public-safe export.

Only approved image crops and the public certificate verification link are used from the documents. Any future repository link must point to genuinely published, sanitized source. Raw telemetry or screenshot contents require their own privacy review before publication.
