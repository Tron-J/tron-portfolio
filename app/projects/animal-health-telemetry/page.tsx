import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-shell";
import { ContactSection } from "@/components/contact-section";
import { ProjectMedia } from "@/components/project-media";
import { TelemetryDiagram } from "@/components/telemetry-diagram";

export const metadata: Metadata = {
  title: "Smart Collar — Sheep Health Monitoring",
  description: "Julius Joseph’s working sheep-monitoring collar: ESP32-C3 hardware, Arduino C++ firmware, MQTT, Supabase, and a Flutter mobile app.",
  alternates: { canonical: "/projects/animal-health-telemetry" },
};

export default function AnimalHealthTelemetry() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <div className="wrap case-hero">
          <Link className="text-link case-back" href="/#work"><ArrowLeft size={15} aria-hidden="true" /> Back to Work</Link>
          <p className="eyebrow" data-reveal>Smart Collar</p>
          <div className="case-hero-grid">
            <h1 data-reveal data-reveal-delay="80">Sheep health<br /><em>monitoring.</em></h1>
            <p className="case-intro" data-reveal data-reveal-delay="160">A connected collar for temperature, pulse, and activity monitoring, with a mobile app for viewing readings and alerts.</p>
          </div>
          <ul className="tags" aria-label="Project technologies">
            <li>ESP32-C3 Mini</li><li>Arduino C++</li><li>FreeRTOS</li><li>MQTT</li><li>Supabase</li><li>Flutter / Dart</li>
          </ul>
          <dl className="case-project-summary">
            <div><dt>My contribution</dt><dd>I designed and assembled the hardware, wrote the firmware, and built the mobile app, connecting the collar through a backend and Supabase.</dd></div>
            <div><dt>Current status</dt><dd>Active and running. The assembled collar, telemetry connection, and monitoring app have been demonstrated together.</dd></div>
          </dl>
          <div className="case-project-media project-media-grid">
            <ProjectMedia
              src="/projects/smart-collar/enclosure.webp"
              alt="The closed collar enclosure, with an optical sensor on its lid and a temperature-probe cable."
              caption="The closed enclosure, with the optical sensor and temperature-probe connection."
              eager
              delay={80}
            />
            <ProjectMedia
              src="/projects/smart-collar/app-dashboard.webp"
              alt="The Flutter monitoring dashboard, showing development readings and status cards."
              caption="The app’s monitoring dashboard. Displayed values are development data, not validated medical measurements."
              contain
              className="project-media--app"
              eager
              delay={160}
            />
          </div>
        </div>

        <div className="wrap case-architecture" id="architecture">
          <TelemetryDiagram />
        </div>

        <div className="wrap case-body">
          <aside className="case-toc" aria-label="Case study contents">
            <p className="eyebrow">Inside the project</p>
            <a href="#architecture">System architecture</a>
            <a href="#hardware">Collar hardware</a>
            <a href="#firmware">Firmware</a>
            <a href="#cloud-app">Cloud and mobile app</a>
            <a href="#demonstration">Functional demonstration</a>
            <a href="#boundaries">What the project establishes</a>
          </aside>

          <article className="case-article">
            <section data-reveal id="hardware">
              <h2>Collar hardware</h2>
              <p>I built the collar around an ESP32-C3 Mini, connecting a DS18B20 temperature sensor, a MAX30102 optical pulse sensor, and an MPU9250 motion sensor. An 18650 battery and TP4056 charging module supply power.</p>
              <p>The physical work included component selection, hand-wired perfboard assembly, and fitting the electronics, rechargeable battery, and probe cable into the collar enclosure.</p>
              <div className="case-media-pair">
                <ProjectMedia
                  src="/projects/smart-collar/assembly.webp"
                  alt="The open collar enclosure showing hand-wired perfboard, battery, controller, and motion sensor."
                  caption="The hand-wired assembly inside the collar enclosure."
                  delay={80}
                />
                <ProjectMedia
                  src="/projects/smart-collar/wiring.webp"
                  alt="Project wiring diagram connecting the controller, sensors, and power components."
                  caption="The project’s circuit and wiring arrangement."
                  contain
                  delay={160}
                />
              </div>
            </section>

            <section data-reveal id="firmware">
              <h2>Firmware</h2>
              <p>The Arduino C++ firmware handles sensor acquisition, basic activity rules, device status, and MQTT publication. FreeRTOS keeps sensing work separate from connectivity and publication.</p>
              <div className="implementation-list">
                <div><div><h3>Acquire and process readings</h3><p>Temperature uses OneWire and DallasTemperature. Optical samples support pulse estimation, while acceleration from the MPU9250 feeds threshold-based step and activity fields.</p></div></div>
                <div><div><h3>Coordinate five tasks</h3><p>The current sketch creates separate tasks for optical processing, motion, temperature, cloud publication, and Wi-Fi reconnection. The Arduino loop also services the MQTT connection.</p></div></div>
                <div><div><h3>Publish structured telemetry</h3><p>ArduinoJson assembles sensor readings and device-status fields. PubSubClient publishes them through MQTT over Wi-Fi, with reconnection handling alongside the sensor work.</p></div></div>
              </div>
            </section>

            <section data-reveal id="cloud-app">
              <h2>Cloud and mobile app</h2>
              <p>MQTT messages pass through the backend into Supabase, where readings can be stored and retrieved by the app. I built the mobile interface in Flutter and Dart, including sign-in, a monitoring dashboard, and an alert view.</p>
              <p>The alerts reflect configured rules applied to the readings. They provide monitoring prompts rather than a diagnosis or a trained machine-learning prediction.</p>
              <div className="case-media-pair">
                <ProjectMedia
                  src="/projects/smart-collar/app-sign-in.webp"
                  alt="The Flutter app’s account sign-in screen."
                  caption="The implemented account sign-in screen."
                  contain
                  className="project-media--app"
                  delay={80}
                />
                <ProjectMedia
                  src="/projects/smart-collar/app-alerts.webp"
                  alt="An alert detail card and the app’s mark-as-resolved action."
                  caption="Alert details and resolve action, showing development data. The displayed labels do not establish diagnostic accuracy."
                  contain
                  className="project-media--short"
                  delay={160}
                />
              </div>
            </section>

            <section data-reveal id="demonstration">
              <h2>Functional demonstration</h2>
              <p>The collar was assembled and fitted during functional testing. The work connects physical sensing, firmware, MQTT communication, stored readings, and the mobile interface in a single running system.</p>
              <ProjectMedia
                src="/projects/smart-collar/field-test.webp"
                alt="The completed collar being fitted to an animal during functional testing."
                caption="Fitting the collar during the project’s functional test."
                delay={80}
              />
            </section>

            <section data-reveal id="boundaries">
              <h2>What the project establishes</h2>
              <p>This project demonstrates a working hardware-to-app monitoring system. Its health and activity labels are rule-based; they do not establish medical accuracy, disease diagnosis, or validated behaviour classification.</p>
              <p>The functional demonstration does not establish battery endurance, enclosure protection, communication latency, or long-term field reliability.</p>
            </section>

            <Link className="text-link" href="/#work">Back to the portfolio <ArrowUpRight size={17} aria-hidden="true" /></Link>
          </article>
        </div>
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
