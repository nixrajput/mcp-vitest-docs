const ROWS = [
  {
    lane: "v1",
    old: "the only revision it negotiates",
    now: "throws - the v1 SDK cannot serve it",
  },
  { lane: "v2", old: "legacy mode, no doubles available", now: "default, full support" },
  {
    lane: "stdio",
    old: "the only revision it negotiates",
    now: "throws - stdio is driven by v1",
  },
  {
    lane: "url",
    old: "legacy mode, no doubles available",
    now: "pinned, otherwise auto-negotiated",
  },
];

export function LifecycleMatrix() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16">
      <p className="font-display text-xs font-semibold tracking-[0.2em] text-(--muted) uppercase">
        The matrix
      </p>
      <h2 className="mt-2 text-2xl font-bold tracking-tight">
        Every SDK major, every protocol revision
      </h2>
      <div className="mt-6 overflow-x-auto rounded-lg border border-(--line)">
        <table className="w-full min-w-[420px] text-left font-mono text-sm">
          <thead>
            <tr className="border-b border-(--line)">
              <th scope="col" className="px-3 py-2 font-medium text-(--muted)">
                Lane
              </th>
              <th scope="col" className="px-3 py-2 font-medium text-(--era-old)">
                2025-11-25
              </th>
              <th scope="col" className="px-3 py-2 font-medium text-(--era-now)">
                2026-07-28
              </th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr key={row.lane} className="border-b border-(--line) last:border-0">
                <td className="px-3 py-2 text-(--paper)">{row.lane}</td>
                <td className="px-3 py-2 text-(--muted)">{row.old}</td>
                <td className="px-3 py-2 text-(--muted)">{row.now}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
