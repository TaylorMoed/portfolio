"use client";

import { Fragment, useEffect, useRef } from "react";

// Paragraphs whose words go from dim to bright as the reader scrolls through them.
export default function ScrollText({ paragraphs }: { paragraphs: string[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const words = Array.from(root.querySelectorAll<HTMLElement>(".sw"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      words.forEach((w) => w.classList.add("lit"));
      return;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const r = root.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the block's top reaches 85% down the screen, 1 when its bottom passes 55%
      const progress = (vh * 0.85 - r.top) / (r.height + vh * 0.3);
      const lit = Math.round(Math.min(1, Math.max(0, progress)) * words.length);
      words.forEach((w, i) => w.classList.toggle("lit", i < lit));
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} className="scroll-text">
      {paragraphs.map((para) => (
        <p key={para.slice(0, 20)}>
          {para.split(" ").map((w, i) => (
            <Fragment key={i}>
              <span className="sw">{w}</span>{" "}
            </Fragment>
          ))}
        </p>
      ))}
    </div>
  );
}
