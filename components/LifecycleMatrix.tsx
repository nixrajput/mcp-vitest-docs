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

// "throws" cells are the exception case, not an error state - italic and a
// touch dimmer reads as "the caveat" without borrowing red alarm styling.
function isThrows(cell: string) {
  return cell.startsWith("throws");
}

export function LifecycleMatrix() {
  return (
    <section className="w-full px-4 py-16 sm:py-20">
      <div className="mx-auto w-full max-w-(--content-width)">
        <p className="font-display text-xs font-semibold tracking-[0.2em] text-(--muted) uppercase">
          The matrix
        </p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight">
          Every SDK major, every protocol revision
        </h2>
        <div className="card mt-6 overflow-x-auto">
          <table className="w-full min-w-[420px] table-fixed text-left font-mono text-sm">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="w-20 border-b-2 border-(--line) px-3 py-2 font-medium text-(--muted)"
                >
                  Lane
                </th>
                <th
                  scope="col"
                  className="border-b-2 border-(--era-old) px-3 py-2 font-medium text-(--era-old)"
                >
                  2025-11-25
                </th>
                <th
                  scope="col"
                  className="border-b-2 border-(--era-now) px-3 py-2 font-medium text-(--era-now)"
                >
                  2026-07-28
                </th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr key={row.lane} className="border-b border-(--line) last:border-0">
                  <th scope="row" className="px-3 py-2 text-left font-semibold text-(--paper)">
                    {row.lane}
                  </th>
                  <td
                    className={`px-3 py-2 text-(--muted) ${isThrows(row.old) ? "italic opacity-80" : ""}`}
                  >
                    {row.old}
                  </td>
                  <td
                    className={`px-3 py-2 text-(--muted) ${isThrows(row.now) ? "italic opacity-80" : ""}`}
                  >
                    {row.now}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
