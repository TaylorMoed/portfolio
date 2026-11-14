"use client";

import { useEffect, useId, useRef, useState } from "react";
import { site } from "@/data/site";

type Props = {
  label: string;
  className: string;
  align?: "left" | "right";
  up?: boolean; // open above the button instead of below
  caret?: boolean; // show the small ▾ next to the label
};

export default function ResumeMenu({ label, className, align = "right", up = false, caret = true }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  // Close when clicking outside or pressing Escape
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className={`menu ${open ? "open" : ""}`}>
      <button
        type="button"
        className={`btn ${className}`}
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
      >
        {label}
        {caret && <span className="caret" aria-hidden="true">▾</span>}
      </button>
      <ul id={id} className={`menu-list ${align} ${up ? "up" : ""}`} inert={!open}>
        {site.resumes.map((r) => (
          <li key={r.href}>
            <a href={r.href} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>
              {r.label}
              <span className="mono small">PDF</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
