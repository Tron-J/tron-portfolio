import { ArrowUpRight, FileText } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-shell";
import { EngineeringScene } from "@/components/engineering-scene";
import { ProjectCollection } from "@/components/project-collection";
import { SkillsSection } from "@/components/skills-section";
import { ExperienceSection } from "@/components/experience-section";
import { ContactSection } from "@/components/contact-section";
import { portfolio } from "@/lib/portfolio";
import { AboutGlobe } from "@/components/about-globe";

export default function Home() {
  return <>
    <SiteHeader />
    <main id="main-content">
      <section className="landing-hero wrap" aria-labelledby="hero-heading">
        <div className="hero-copy">
          <h1 id="hero-heading" className="hero-title"><span>Hi, I’m Julius.</span><span>I build <em>connected</em></span><span><em>devices.</em></span></h1>
          <p className="hero-description">I design and build devices, from the electronics and embedded code to the software people use.</p>
          <div className="hero-actions"><a className="button button-primary" href="#work">View my work <ArrowUpRight size={18} aria-hidden="true" /></a>{portfolio.resumeUrl && <a className="button button-secondary" href={portfolio.resumeUrl}>Résumé <FileText size={17} aria-hidden="true" /></a>}</div>
        </div>
        <EngineeringScene />
      </section>
      <section id="work" className="work-section section-block" aria-labelledby="work-heading">
        <div className="wrap">
          <div className="section-intro" data-reveal><h2 id="work-heading">Work</h2></div>
          <ProjectCollection />
        </div>
      </section>
      <SkillsSection />
      <ExperienceSection />
      <section id="about" className="about-section section-block" aria-labelledby="about-heading">
        <div className="wrap about-layout" data-reveal>
          <div className="about-copy">
            <h2 id="about-heading">About</h2>
            <p className="about-lead">I’m Julius Joseph, known as Tron, a developer focused on embedded systems, artificial intelligence, and machine learning.</p>
            <p>I have hands-on experience with hardware development, circuit design, sensor integration, embedded firmware, IoT systems, and Python programming.</p>
          </div>
          <AboutGlobe />
        </div>
      </section>
      <ContactSection />
    </main>
    <SiteFooter />
  </>;
}

