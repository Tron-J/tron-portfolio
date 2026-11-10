import { BrainCircuit, CircuitBoard, Code2, Braces, Smartphone, Wifi } from "lucide-react";
import "./profile-sections.css";

const skillGroups = [
  {
    title: "Hardware Development",
    description: "Circuit design, sensor interfacing, and hands-on assembly, integration, and debugging.",
    skills: ["Circuit Design", "Sensor Interfacing", "Hardware Debugging"],
    icon: CircuitBoard,
  },
  {
    title: "Embedded Programming",
    description: "Device firmware in C and C++, using Arduino for sensor integration and control.",
    skills: ["C / C++", "Arduino", "Firmware Development"],
    icon: Code2,
  },
  {
    title: "IoT & Connected Systems",
    description: "Connecting device functions to network services and mobile controls.",
    skills: ["Connected Devices", "Blynk", "IoT Integration"],
    icon: Wifi,
  },
  {
    title: "Python Programming",
    description: "Writing scripts and working through programming problems in Python.",
    skills: ["Python", "Scripting", "Problem-Solving"],
    icon: Braces,
  },
  {
    title: "Machine Learning",
    description: "Supervised learning methods for regression and classification, developed through structured coursework.",
    skills: ["Supervised Learning", "Regression", "Classification"],
    icon: BrainCircuit,
  },
  {
    title: "Software & Mobile Development",
    description: "Application and mobile development, with version control and GitHub for organising code.",
    skills: ["Mobile Development", "GitHub", "Version Control"],
    icon: Smartphone,
  },
] as const;

export function SkillsSection() {
  return (
    <section id="skills" className="skills-section section-block" aria-labelledby="skills-heading">
      <div className="wrap">
        <div className="section-intro" data-reveal>
          <h2 id="skills-heading">Skills</h2>
        </div>
        <div className="skills-grid">
          {skillGroups.map((group, index) => (
            <article className="skill-group profile-skill" key={group.title} data-reveal data-reveal-delay={index * 80}>
              <group.icon className="profile-skill-icon" size={25} strokeWidth={1.5} aria-hidden="true" />
              <h3>{group.title}</h3>
              <p>{group.description}</p>
              <ul className="profile-skill-tags" aria-label={`${group.title} skills`}>
                {group.skills.map((skill) => <li key={skill}>{skill}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
