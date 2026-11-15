"use client";

import { useEffect, useRef, useState } from "react";
import type { Project } from "@/data/projects";

export default function ProjectCard({
  project,
  active = true,
  onProgress,
}: {
  project: Project;
  active?: boolean;
  onProgress?: (fraction: number) => void;
}) {
  const video = useRef<HTMLVideoElement>(null);
  const [onScreen, setOnScreen] = useState(false);

  // Only the visible project's demo plays, and it starts from the top when you switch to it
  useEffect(() => {
    const el = video.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const el = video.current;
    if (!el) return;
    if (active && onScreen) el.play().catch(() => {});
    else el.pause();
  }, [active, onScreen]);

  useEffect(() => {
    if (active && video.current) video.current.currentTime = 0;
  }, [active]);

  // Report how far through the demo we are, so the project tab can fill up as it plays
  useEffect(() => {
    if (!active || !onProgress) return;
    const el = video.current;
    if (!el) { onProgress(1); return; }
    let frame = 0;
    const tick = () => {
      if (el.duration) onProgress(el.currentTime / el.duration);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, onProgress]);

  return (
    <article className="card">
      <div className={`card-media theme-${project.theme}`}>
        {project.video ? (
          <video
            ref={video}
            src={project.video}
            poster={project.image}
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={`${project.title} demo`}
          />
        ) : project.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={project.image} alt={project.title} />
        ) : (
          // Layout not designed yet: a quiet skeleton instead of placeholder text
          <div className="skeleton" role="img" aria-label={`${project.title} preview coming soon`}>
            <div className="skeleton-grid">
              {Array.from({ length: 6 }, (_, i) => (
                <span key={i} className="skeleton-tile" style={{ animationDelay: `${i * 120}ms` }} />
              ))}
            </div>
            <div className="skeleton-lines">
              <span className="skeleton-line" style={{ width: "62%" }} />
              <span className="skeleton-line" style={{ width: "38%" }} />
            </div>
            <span className="skeleton-note mono">preview in progress</span>
          </div>
        )}
      </div>
      <div className="card-body">
        <p className="eyebrow accent">{project.category}</p>
        <h3>{project.title}</h3>
        <p className="muted">{project.description}</p>
        <ul className="tags">
          {project.tags.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <div className="card-links">
          {/* Links still set to "#" (code not public yet) stay hidden until they point somewhere */}
          {project.links.filter((l) => l.href && l.href !== "#").map((l) => (
            <a key={l.label} href={l.href} target="_blank" rel="noreferrer">
              {l.label} <span className="arrow">&rarr;</span>
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}
