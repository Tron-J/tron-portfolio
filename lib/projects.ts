export type ProjectCategory = "Embedded systems" | "Machine learning";

export interface PortfolioProject {
  id: string;
  number: string;
  title: string;
  category: ProjectCategory;
  summary: string;
  status: string;
  contribution: string;
  statusNote: string;
  href: string;
  tags: readonly string[];
}

/** Add a project here when its work and case study are ready to share. */
export const projects: readonly PortfolioProject[] = [
  {
    id: "animal-health-telemetry",
    number: "01",
    title: "Smart Collar — Sheep Health Monitoring",
    category: "Embedded systems",
    summary:
      "A working collar and mobile app for viewing a sheep’s temperature, pulse, and activity, connected through Wi-Fi and MQTT.",
    status: "Active and running",
    contribution:
      "Designed and assembled the hardware, wrote the ESP32-C3 firmware, and built the Flutter app, connecting the collar through a backend and Supabase.",
    statusNote:
      "Active and running, with the collar assembled and the monitoring app implemented.",
    href: "/projects/animal-health-telemetry",
    tags: ["ESP32-C3", "Arduino C++", "MQTT", "Supabase", "Flutter / Dart"],
  },
];
