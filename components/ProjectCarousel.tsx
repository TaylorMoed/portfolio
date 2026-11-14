"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import type { Project } from "@/data/projects";

// One project at a time. Swipe / trackpad-scroll, the arrow buttons,
// the numbers underneath, or the ← → keys all move between them.
export default function ProjectCarousel({ projects }: { projects: Project[] }) {
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const bars = useRef<(HTMLSpanElement | null)[]>([]);
  // Fills the active tab's underline as its demo plays (set straight on the element, no re-render)
  const setProgress = useCallback((i: number, fraction: number) => {
    bars.current.forEach((bar, j) => bar?.style.setProperty("--p", j === i ? String(fraction) : "0"));
  }, []);
  const progressFns = useRef(projects.map((_, i) => (f: number) => setProgress(i, f)));

  const go = (i: number) => {
    const el = track.current;
    if (!el) return;
    const next = Math.max(0, Math.min(projects.length - 1, i));
    el.scrollTo({ left: next * el.clientWidth, behavior: "smooth" });
  };

  // Keep the counter in sync with however the user scrolled
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    // Always start on the first project (browsers can restore an old scroll spot)
    el.scrollLeft = 0;
    const onScroll = () => setIndex(Math.round(el.scrollLeft / el.clientWidth));
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") { e.preventDefault(); go(index + 1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); go(index - 1); }
  };

  const pad = (n: number) => String(n).padStart(2, "0");
  const shortName = (p: Project) => p.title.split(" \u2014 ")[0];
  const isLast = index === projects.length - 1;

  return (
    <div className="carousel" onKeyDown={onKey}>
      <div
        ref={track}
        className="carousel-track"
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label="Projects"
      >
        {projects.map((p, i) => (
          <div
            key={p.title}
            className="carousel-slide"
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${projects.length}`}
            inert={i !== index}
          >
            <ProjectCard project={p} active={i === index} onProgress={progressFns.current[i]} />
          </div>
        ))}
      </div>

      <div className="carousel-controls">
        <div className="carousel-steps">
          {projects.map((p, i) => (
            <button
              key={p.title}
              className={`step ${i === index ? "active" : ""}`}
              onClick={() => go(i)}
              aria-label={`Show ${p.title}`}
              aria-current={i === index}
            >
              <span className="mono">{pad(i + 1)}</span>
              <span className="step-name">{p.title.split(" — ")[0]}</span>
              <span className="step-bar" ref={(el) => { bars.current[i] = el; }} aria-hidden="true" />
            </button>
          ))}
        </div>
        <div className="carousel-arrows">
          {/* Names what's coming so people know there's more to see */}
          <button className="next-hint" onClick={() => go(isLast ? 0 : index + 1)}>
            <span className="next-hint-label">{isLast ? "Back to" : "Next:"}</span>{" "}
            <span className="next-hint-name" key={index}>
              {shortName(projects[isLast ? 0 : index + 1])}
            </span>
          </button>
          <button className="arrow-btn" onClick={() => go(index - 1)} disabled={index === 0} aria-label="Previous project">
            &larr;
          </button>
          <button
            className="arrow-btn"
            onClick={() => go(index + 1)}
            disabled={index === projects.length - 1}
            aria-label="Next project"
          >
            &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}
