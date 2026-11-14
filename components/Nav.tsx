"use client";

import { useEffect, useState } from "react";
import ResumeMenu from "@/components/ResumeMenu";
import { site } from "@/data/site";

const links = [
  { id: "projects", label: "Projects" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export default function Nav() {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
      setScrolled(window.scrollY > 8);

      // Active section = last one whose top has passed 40% of the viewport
      let current = "";
      for (const l of links) {
        const el = document.getElementById(l.id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) current = l.id;
      }
      // At the very bottom the last section can't scroll up far enough, so pick it directly
      if (max > 0 && window.scrollY >= max - 2) current = links[links.length - 1].id;
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <header className={`nav ${scrolled ? "scrolled" : ""}`}>
      <div className="container nav-inner">
        <a href="#top" className="logo">
          {site.handle.split(".")[0]}
          <span className="logo-dot">.</span>
          {site.handle.split(".")[1]}
        </a>
        <nav>
          {links.map((l) => (
            <a key={l.id} href={`#${l.id}`} className={`nav-link ${active === l.id ? "active" : ""}`}>
              {l.label}
            </a>
          ))}
          <ResumeMenu label="Resume" className="btn-dark" caret={false} />
        </nav>
      </div>
      <div className="progress" style={{ transform: `scaleX(${progress})` }} />
    </header>
  );
}
