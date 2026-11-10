"use client";

import { useState } from "react";
import { Activity, Cloud, Cpu, Move3D, Smartphone, Thermometer, Wifi } from "lucide-react";
import "./telemetry-diagram.css";
import "./diagram-interactions.css";

const componentDetails = {
  temperature: {
    title: "DS18B20 · Temperature",
    description: "The DS18B20 temperature sensor connects to the ESP32-C3 through OneWire. The firmware uses DallasTemperature to request readings and checks for a disconnected sensor.",
    technology: "DS18B20 / OneWire / DallasTemperature",
  },
  optical: {
    title: "MAX30102 · Optical pulse sensing",
    description: "The MAX30102 supplies optical samples for pulse estimation. The firmware processes the infrared signal and tracks optical contact. These readings support the monitoring project; they are not validated clinical measurements.",
    technology: "MAX30102 / Optical pulse signal",
  },
  motion: {
    title: "MPU9250 · Motion sensing",
    description: "The MPU9250 supplies three-axis acceleration. The firmware applies offsets and uses acceleration magnitude and threshold-based step detection to derive activity fields.",
    technology: "MPU9250 / Three-axis acceleration",
  },
  firmware: {
    title: "ESP32-C3 Mini · Firmware",
    description: "Arduino C++ firmware runs on the ESP32-C3 Mini. Five FreeRTOS tasks separate optical processing, motion sensing, temperature acquisition, telemetry publication, and Wi-Fi reconnection. The Arduino loop services the MQTT connection.",
    technology: "ESP32-C3 Mini / Arduino C++ / FreeRTOS",
  },
  mqtt: {
    title: "Wi-Fi + MQTT · Communication",
    description: "The collar connects over Wi-Fi and publishes structured sensor and device-status messages through MQTT. ArduinoJson assembles the payloads and PubSubClient handles publication to the broker.",
    technology: "Wi-Fi / MQTT / ArduinoJson / PubSubClient",
  },
  cloud: {
    title: "Backend + Supabase · Storage",
    description: "The backend receives the collar telemetry and connects it to Supabase. This separates the device’s MQTT communication from the stored readings used by the mobile app.",
    technology: "Backend / Supabase",
  },
  app: {
    title: "Flutter + Dart · Monitoring app",
    description: "The mobile app provides sign-in, a monitoring dashboard, and alerts for reviewing the collar’s readings. It completes the path from the assembled sensing hardware to an interface for the person monitoring the sheep.",
    technology: "Flutter / Dart / Dashboard / Alerts",
  },
} as const;

type ComponentKey = keyof typeof componentDetails;

/** Interactive project architecture, not a live telemetry display. */
export function TelemetryDiagram({ compact = false }: { compact?: boolean }) {
  const [selected, setSelected] = useState<ComponentKey>("temperature");
  const detail = componentDetails[selected];
  const detailId = compact ? "telemetry-detail-compact" : "telemetry-detail-full";
  const nodeProps = (key: ComponentKey) => ({
    type: "button" as const,
    "aria-pressed": selected === key,
    "aria-controls": detailId,
    onClick: () => setSelected(key),
  });
  const connector = <div className="telemetry-connector" aria-hidden="true"><span /></div>;

  return (
    <figure className={`telemetry-diagram${compact ? " telemetry-diagram--compact" : ""}`} data-architecture>
      <div className="telemetry-heading"><span>System architecture</span><span>Select a component</span></div>
      <div className="telemetry-flow">
        <div className="telemetry-sensors" role="group" aria-label="Collar sensors">
          <button className="telemetry-sensor telemetry-node" {...nodeProps("temperature")}>
            <Thermometer size={23} strokeWidth={1.4} aria-hidden="true" />
            <span className="telemetry-node-copy"><strong>Temperature</strong><span>DS18B20</span></span>
          </button>
          <button className="telemetry-sensor telemetry-node" {...nodeProps("optical")}>
            <Activity size={23} strokeWidth={1.4} aria-hidden="true" />
            <span className="telemetry-node-copy"><strong>Optical pulse</strong><span>MAX30102</span></span>
          </button>
          <button className="telemetry-sensor telemetry-node" {...nodeProps("motion")}>
            <Move3D size={23} strokeWidth={1.4} aria-hidden="true" />
            <span className="telemetry-node-copy"><strong>Motion</strong><span>MPU9250</span></span>
          </button>
        </div>
        {connector}
        <button className="telemetry-stage telemetry-controller telemetry-node" {...nodeProps("firmware")}>
          <span className="telemetry-label">Firmware</span>
          <Cpu size={30} strokeWidth={1.3} aria-hidden="true" />
          <strong>ESP32-C3 Mini</strong>
          <span className="telemetry-stage-description">Arduino C++<br />FreeRTOS</span>
        </button>
        {connector}
        <button className="telemetry-stage telemetry-publisher telemetry-node" {...nodeProps("mqtt")}>
          <span className="telemetry-label">Communication</span>
          <Wifi size={30} strokeWidth={1.3} aria-hidden="true" />
          <strong>Wi-Fi / MQTT</strong>
          <span className="telemetry-stage-description">Telemetry messages</span>
        </button>
        {connector}
        <button className="telemetry-stage telemetry-cloud telemetry-node" {...nodeProps("cloud")}>
          <span className="telemetry-label">Storage</span>
          <Cloud size={30} strokeWidth={1.3} aria-hidden="true" />
          <strong>Backend</strong>
          <span className="telemetry-stage-description">Supabase</span>
        </button>
        {connector}
        <button className="telemetry-stage telemetry-app telemetry-node" {...nodeProps("app")}>
          <span className="telemetry-label">Mobile app</span>
          <Smartphone size={30} strokeWidth={1.3} aria-hidden="true" />
          <strong>Flutter / Dart</strong>
          <span className="telemetry-stage-description">Dashboard + alerts</span>
        </button>
      </div>
      <div className="telemetry-detail" id={detailId} aria-live="polite" aria-atomic="true">
        <h3>{detail.title}</h3>
        <p>{detail.description}</p>
        <span className="telemetry-detail-technology">{detail.technology}</span>
      </div>
      <figcaption className="telemetry-caption">Explore the working system, from the collar’s sensors to the monitoring app.</figcaption>
    </figure>
  );
}
