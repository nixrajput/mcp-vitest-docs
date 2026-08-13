"use client";

import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "run", label: "The run" },
  { id: "lifecycles", label: "Lifecycles" },
  { id: "coverage", label: "Coverage" },
  { id: "requirements", label: "Requirements" },
  { id: "compare", label: "Compare" },
  { id: "project", label: "Project" },
];

export function SectionNav() {
  const [active, setActive] = useState("");

  useEffect(() => {
    const targets = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (targets.length === 0) return;

    // The band sits under both sticky bars, so whatever crosses it is what the reader is on.
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (first) setActive(first.target.id);
      },
      { rootMargin: "-25% 0px -65% 0px" },
    );

    for (const target of targets) observer.observe(target);
    return () => observer.disconnect();
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
