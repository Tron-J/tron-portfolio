import { BrainCircuit, CircuitBoard, Code2, Braces, Smartphone, Wifi } from "lucide-react";
import "./profile-sections.css";

const skillGroups = [
  {
    title: "Hardware development",
    description: "Circuit design, sensor interfacing, and hands-on assembly, integration, and debugging.",
    skills: ["Circuit design", "Sensor interfacing", "Hardware debugging"],
    icon: CircuitBoard,
  },
  {
    title: "Embedded programming",
    description: "Device firmware in C and C++, using Arduino for sensor integration and control.",
    skills: ["C / C++", "Arduino", "Firmware development"],
    icon: Code2,
  },
  {
    title: "IoT & connected systems",
    description: "Connecting device functions to network services and mobile controls.",
    skills: ["Connected devices", "Blynk", "IoT integration"],
    icon: Wifi,
  },
  {
    title: "Python programming",
    description: "Writing scripts and working through programming problems in Python.",
    skills: ["Python", "Scripting", "Problem-solving"],
    icon: Braces,
  },
  {
    title: "Machine learning foundations",
    description: "Supervised learning foundations developed through structured coursework in regression and classification.",
    skills: ["Supervised learning", "Regression", "Classification"],
    icon: BrainCircuit,
  },
  {
    title: "Software & mobile development",
    description: "Application and mobile development, with version control and GitHub for organising code.",
    skills: ["Mobile development", "GitHub", "Version control"],
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
            <article className="skill-group profile-skill" key={group.title} data-reveal data-reveal-delay={index * 80} style={{ transitionDelay: `${index * 80}ms` }}>
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
