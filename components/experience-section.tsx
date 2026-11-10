import { ArrowUpRight } from "lucide-react";

export function ExperienceSection() {
  return (
    <section id="experience" className="experience-section section-block" aria-labelledby="experience-heading">
      <div className="wrap">
        <div className="section-intro" data-reveal><h2 id="experience-heading">Experience & Education</h2></div>
        <div className="experience-grid">
          <article className="profile-record experience-record" data-reveal data-reveal-delay="0">
            <h3>nHub Foundation</h3>
            <p className="profile-record-meta">August 2025–January 2026</p>
            <p className="profile-record-role">Embedded Systems and IoT Intern</p>
            <p>Worked with a multidisciplinary team to design and implement 30+ hardware prototypes using Arduino, sensors, and cloud platforms.</p>
            <ul className="experience-highlights">
              <li>Developed gas-detection, RFID access-control, and environmental-monitoring prototypes.</li>
              <li>Worked on circuit design, sensor interfacing, assembly, integration, and debugging.</li>
            </ul>
          </article>
          <div className="profile-record-stack">
            <article className="profile-record" data-reveal data-reveal-delay="80" style={{ transitionDelay: "80ms" }}>
              <p className="eyebrow">Education</p>
              <h3>BSc Software Engineering</h3>
              <p className="profile-record-institution">Nigerian Army University Biu</p>
            </article>
            <article className="profile-record certificate-record" data-reveal data-reveal-delay="160" style={{ transitionDelay: "160ms" }}>
              <p className="eyebrow">Certificate</p>
              <h3>Supervised Machine Learning: Regression and Classification</h3>
              <p className="profile-record-institution">DeepLearning.AI · Stanford Online</p>
              <p className="profile-record-meta">Coursera</p>
              <a className="text-link certificate-link" href="https://coursera.org/verify/81ZXPUPQVMGF" target="_blank" rel="noopener noreferrer" aria-label="Verify Supervised Machine Learning certificate on Coursera">Verify Certificate <ArrowUpRight size={16} aria-hidden="true" /></a>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
