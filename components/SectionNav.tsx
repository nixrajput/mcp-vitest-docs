"use client";

import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "run", label: "Test run" },
  { id: "lifecycles", label: "Lifecycles" },
  { id: "coverage", label: "Coverage" },
  { id: "requirements", label: "Requirements" },
  { id: "compare", label: "Compare" },
  { id: "project", label: "Stats" },
];

// The header and this bar both stick, so a section is "current" once its top passes under them.
const STICKY_OFFSET = 116;

export function SectionNav() {
  const [active, setActive] = useState(SECTIONS[0].id);

  useEffect(() => {
    const found = SECTIONS.map((s) => [s.id, document.getElementById(s.id)] as const).filter(
      (entry): entry is [string, HTMLElement] => entry[1] !== null,
    );
    if (found.length === 0) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      // Last section whose top has passed the sticky line, so exactly one is always current -
      // an intersection band leaves nothing selected whenever no section is inside it.
      let current = found[0][0];
      for (const [id, el] of found) {
        if (el.getBoundingClientRect().top <= STICKY_OFFSET) current = id;
      }
      // The final section can be too short to reach the line, so it would never light up.
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
        current = found[found.length - 1][0];
      }
      setActive(current);
    };

    const onScroll = () => {
      frame ||= requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <nav
      aria-label="Page sections"
      className="bg-fd-background/80 sticky top-14 z-20 w-full border-b backdrop-blur-lg"
    >
      <ul className="mx-auto flex w-full max-w-(--content-width) [scrollbar-width:none] gap-1 overflow-x-auto px-4 py-2 [&::-webkit-scrollbar]:hidden">
        {SECTIONS.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              aria-current={active === s.id ? "true" : undefined}
              className="hover:bg-fd-accent text-fd-muted-foreground hover:text-fd-accent-foreground aria-[current]:text-fd-primary aria-[current]:bg-fd-accent block rounded-lg px-3 py-1.5 text-sm whitespace-nowrap transition-colors"
            >
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
