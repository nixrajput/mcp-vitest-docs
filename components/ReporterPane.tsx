"use client";

import { useEffect, useState } from "react";

// The literal claim the hero makes: this is the SAME suite, so both panes
// share one checks array rather than each defining their own.
const CHECKS = [
  { label: "connects and lists tools", ms: 12 },
  { label: "echo round-trips", ms: 4 },
  { label: "answers an elicitation", ms: 7 },
  { label: "collects progress notifications", ms: 9 },
];

const ERA_COLOR = { old: "var(--era-old)", now: "var(--era-now)" } as const;

// Vitest's watch mode re-runs on change; a full pending-to-green cycle holds
// here for a while so the loop reads as ambient life, not a distracting GIF.
const HOLD_MS = 6500;

export function ReporterPane({
  era,
  sdkLabel,
  revision,
  startDelay,
  stepMs = 280,
}: {
  era: "old" | "now";
  sdkLabel: string;
  revision: string;
  startDelay: number;
  stepMs?: number;
}) {
  // SSR and first paint show every check already passed; the effect below is
  // what "arms" the run, matching Reveal's progressive-enhancement approach.
  const [resolvedCount, setResolvedCount] = useState(CHECKS.length);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    let timers: ReturnType<typeof setTimeout>[] = [];

    // Recurses through a timeout rather than setInterval so a full run (reset
    // -> staggered resolve -> green hold) can schedule its own next start.
    const runCycle = () => {
      setResolvedCount(0);
      timers = CHECKS.map((_, i) =>
        setTimeout(
          () => {
            if (!cancelled) setResolvedCount((n) => Math.max(n, i + 1));
          },
          startDelay + i * stepMs,
        ),
      );
      timers.push(
        setTimeout(
          () => {
            if (!cancelled) runCycle();
          },
          startDelay + CHECKS.length * stepMs + HOLD_MS,
        ),
      );
    };

    runCycle();
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [startDelay, stepMs]);

  const allResolved = resolvedCount === CHECKS.length;

  return (
    <div
      className="rounded-lg border border-t-2 border-(--line) bg-(--surface)"
      style={{
        borderTopColor: ERA_COLOR[era],
        boxShadow: `inset 0 24px 32px -32px ${ERA_COLOR[era]}, 0 12px 24px -20px rgba(0, 0, 0, 0.4)`,
      }}
    >
      <div className="flex items-center justify-between gap-3 border-b border-(--line) px-3 py-2 font-mono text-xs">
        <span className="text-(--paper)">{sdkLabel}</span>
        <span style={{ color: ERA_COLOR[era] }}>{revision}</span>
      </div>
      <ul className="flex flex-col gap-2 px-3 py-3 font-mono text-[13px] leading-5">
        {CHECKS.map((check, i) => {
          const resolved = i < resolvedCount;
          return (
            <li key={check.label} className="flex items-baseline justify-between gap-3">
              <span
                className={`flex items-baseline gap-2 transition-colors duration-300 ${
                  resolved ? "text-(--paper)" : "text-(--muted)"
                }`}
              >
                <span aria-hidden style={{ color: resolved ? "var(--pass)" : undefined }}>
                  {resolved ? "✓" : "○"}
                </span>
                {check.label}
              </span>
              <span
                className={`shrink-0 text-(--muted) transition-opacity duration-300 ${
                  resolved ? "opacity-100" : "opacity-0"
                }`}
              >
                {check.ms}ms
              </span>
            </li>
          );
        })}
      </ul>
      <div
        className={`border-t border-(--line) px-3 py-2 font-mono text-xs transition-opacity duration-300 ${
          allResolved ? "text-(--pass) opacity-100" : "text-(--muted) opacity-0"
        }`}
      >
        1 file {CHECKS.length} passed ({CHECKS.length})
      </div>
    </div>
  );
}
