import { Fragment } from "react";
import Nav from "@/components/Nav";
import ProjectCarousel from "@/components/ProjectCarousel";
import ResumeMenu from "@/components/ResumeMenu";
import Reveal from "@/components/Reveal";
import LocalTime from "@/components/LocalTime";
import CopyEmail from "@/components/CopyEmail";
import ScrollText from "@/components/ScrollText";
import { projects } from "@/data/projects";
import { site } from "@/data/site";

const GitHubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.1c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.9 1.3 1.9 1.3 1.1 1.9 2.9 1.3 3.6 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.6 18.3 5 18.3 5c.7 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .5Z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.7 4.8 6.1V21h-4v-5.5c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V21h-4V9Z" />
  </svg>
);

// Loose, hand-drawn-looking underline
const Scribble = () => (
  <svg className="scribble" viewBox="0 0 300 20" preserveAspectRatio="none" aria-hidden="true">
    <path d="M3 13c38-5 79-8 124-7 47 1 70 4 112 3 21-1 40-3 58-5" />
  </svg>
);

// Splits a phrase into words that rise in one after another
const rise = (text: string, start: number) =>
  text.split(" ").map((w, i) => (
    <Fragment key={`${start}-${i}`}>
      <span className="w" style={{ "--i": start + i } as React.CSSProperties}>{w}</span>{" "}
    </Fragment>
  ));

export default function Home() {
  const before = site.headline.before.split(" ").length;
  return (
    <>
      <Nav />

      <main id="top">
        <section className="container hero">
          <div>
            <p className="status mono enter" style={{ animationDelay: "0ms" }}>
              <span className="dot" />
              <span>
                {site.status} · {site.location} · <span className="nowrap"><LocalTime timeZone={site.timezone} /></span>
              </span>
            </p>

            <h1>
              {rise(site.headline.before, 0)}
              <span className="w" style={{ "--i": before } as React.CSSProperties}>
                <span className="mark">
                  {site.headline.highlight}
                  <Scribble />
                </span>
              </span>{" "}
              {rise(site.headline.after, before + 1)}
            </h1>

            <p className="lead enter" style={{ animationDelay: "220ms" }}>{site.intro}</p>
            <div className="actions enter" style={{ animationDelay: "340ms" }}>
              <a href="#projects" className="btn btn-primary">
                See my work <span className="arrow">&darr;</span>
              </a>
              <a href={site.github} className="btn btn-outline" target="_blank" rel="noreferrer">
                <GitHubIcon /> GitHub
              </a>
              <a href={site.linkedin} className="btn btn-outline" target="_blank" rel="noreferrer">
                <LinkedInIcon /> LinkedIn
              </a>
            </div>
          </div>
          <div className="photo-wrap enter" style={{ animationDelay: "200ms" }}>
            <div className="photo">
              {site.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={site.photo} alt={site.name} />
              ) : (
                <span className="placeholder">[ Your photo — friendly, plain background ]</span>
              )}
            </div>
          </div>
        </section>

        <section id="projects" className="container section">
          <Reveal className="section-head">
            <h2 className="lift"><span><span className="idx mono">01</span>Selected projects</span></h2>
            <a href={site.github} className="mono small muted" target="_blank" rel="noreferrer">
              {projects.length} projects · more on GitHub
            </a>
          </Reveal>
          <Reveal>
            <ProjectCarousel projects={projects} />
          </Reveal>
        </section>

        <section id="about" className="about-band">
          <div className="container about">
            <Reveal>
              <h2 className="lift"><span><span className="idx mono">02</span>About</span></h2>
              <ScrollText paragraphs={site.about} />
            </Reveal>
            <dl className="skills">
              {site.skills.map((group, gi) => (
                <Reveal key={group.label} delay={gi * 90}>
                  <dt className="eyebrow">{group.label}</dt>
                  <dd>{group.items.join(" · ")}</dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </section>

        <section id="experience" className="container section experience-section">
          <Reveal className="section-head">
            <h2 className="lift"><span><span className="idx mono">03</span>Experience</span></h2>
          </Reveal>
          <div className="jobs">
            {site.experience.map((job, i) => (
              <Reveal key={job.company} delay={i * 90} className="job">
                <div className="job-head">
                  <div>
                    <h3>{job.role}</h3>
                    <p className="job-company">{job.company}</p>
                  </div>
                  <span className="job-dates mono">{job.dates}</span>
                </div>
                <ul className="job-points">
                  {job.points.map((pt) => (
                    <li key={pt.slice(0, 24)}>{pt}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="contact" className="container section">
          <Reveal className="contact">
            <div>
              <h2 className="lift"><span><span className="idx mono">04</span>Let&rsquo;s talk.</span></h2>
              <p>{site.contact}</p>
            </div>
            <div className="contact-side">
              <div className="actions">
                <a href={`mailto:${site.email}`} className="btn btn-primary">Email me</a>
                <ResumeMenu label="Download resume" className="btn-outline" up caret={false} />
              </div>
              <CopyEmail email={site.email} />
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="container footer">
        <span>© {new Date().getFullYear()} {site.name} · {site.location}</span>
        <span className="mono">Built with Next.js · Deployed on Vercel</span>
      </footer>
    </>
  );
}
