import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/projects";
import { ProjectMedia } from "@/components/project-media";

export function ProjectCollection() {
  return (
    <div className="project-collection">
      {projects.map((project) => (
        <article
          className="featured-project"
          key={project.id}
          aria-labelledby={`${project.id}-title`}
          data-reveal
        >
          <div className="featured-project-body">
            <div className="featured-project-main">
              <h3 id={`${project.id}-title`} data-reveal data-reveal-delay="80">{project.title}</h3>
              <p>{project.summary}</p>
              <ul className="tags" aria-label="Project technologies">
                {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
              </ul>
              <Link className="button button-primary case-study-link" href={project.href}>
                Read the case study <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
            </div>

            <div className="featured-project-details">
              <dl>
                <div>
                  <dt>My contribution</dt>
                  <dd>{project.contribution}</dd>
                </div>
                <div>
                  <dt>Status</dt>
                  <dd>{project.statusNote}</dd>
                </div>
              </dl>
            </div>
          </div>
          <div className="featured-visual">
            <div className="project-media-grid">
              <ProjectMedia
                src="/projects/smart-collar/field-test.webp"
                alt="The assembled collar being fitted to an animal during functional testing."
                caption="Fitting the assembled collar during functional testing."
                className="project-media--field"
                contain
                delay={80}
              />
              <ProjectMedia
                src="/projects/smart-collar/app-dashboard.webp"
                alt="The Flutter monitoring dashboard, showing development readings and status cards."
                caption="The app’s monitoring dashboard, showing development data rather than validated medical readings."
                className="project-media--app"
                contain
                delay={160}
              />
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
