const COLUMNS = [
  { key: "sdk", label: "SDK majors" },
  { key: "protocol", label: "Protocol revisions" },
  { key: "doubles", label: "Interaction doubles" },
  { key: "snapshots", label: "Snapshots" },
  { key: "schema", label: "Schema validation" },
  { key: "oauth", label: "OAuth testing" },
  { key: "external", label: "External servers" },
  { key: "notifications", label: "Notifications" },
] as const;

type CellKey = (typeof COLUMNS)[number]["key"];

const ROWS: {
  name: string;
  href?: string;
  lead?: boolean;
  /** Columns where THIS tool is ahead of the others. One marker serves both directions, so a
      row we lose reads the same as a row we win rather than being coded as a defeat. */
  leads?: CellKey[];
  cells: Record<CellKey, string>;
}[] = [
  {
    name: "mcp-vitest",
    lead: true,
    leads: ["sdk", "protocol", "doubles", "snapshots", "schema", "notifications"],
    cells: {
      sdk: "v1 and v2, auto-detected",
      protocol: "2025-11-25 and 2026-07-28",
      doubles: "sampling, elicitation, roots",
      snapshots: "Normalized manifests",
      schema: "toMatchOutputSchema",
      oauth: "Fake authorization server, bearer credentials",
      external: "stdio or URL",
      notifications: "Collected, or awaited by method, with progress/cancellation",
    },
  },
  {
    name: "vitest-mcp",
    href: "https://www.npmjs.com/package/vitest-mcp",
    cells: {
      sdk: "v1 only, per its own peer range >=1.10.0 <2",
      protocol: "Whatever v1 negotiates",
      doubles: "No",
      snapshots: "No",
      schema: "No",
      oauth: "No",
      external: "No - in-memory transport only",
      notifications: "No",
    },
  },
  {
    name: "MCP Inspector",
    href: "https://github.com/modelcontextprotocol/inspector",
    // Verified in src/auth/fake-as.ts: our /token rejects every grant but client_credentials,
    // so Inspector's real authorization-code flow is genuinely ahead of us here.
    leads: ["oauth"],
    cells: {
      sdk: "Interactive tool, not a test harness",
      protocol: "-",
      doubles: "-",
      snapshots: "-",
      schema: "-",
      oauth: "Interactive OAuth flows, own auth core",
      external: "Core use case - stdio and HTTP, either era",
      notifications: "Viewed live in the UI",
    },
  },
  {
    name: "Hand-rolled",
    cells: {
      sdk: "Whatever you write twice",
      protocol: "Whatever you pin",
      doubles: "Whatever you wire",
      snapshots: "Yours to normalize",
      schema: "Yours to write",
      oauth: "Whatever you implement",
      external: "However you spawn it",
      notifications: "Whatever you subscribe to",
    },
  },
];

// Cells reading "No" or "-" are both absences, but not the same kind: "-" means the
// concept does not apply to an interactive tool, "No" means it was not built. Both get
// the same muted weight here; the wording carries the distinction, not the color.
function isAbsent(cell: string) {
  return cell === "No" || cell === "-";
}

export function Comparison() {
  return (
    <section id="compare" className="w-full px-4 py-16 sm:py-20">
      <div className="mx-auto w-full max-w-(--content-width)">
        <p className="font-display text-xs font-semibold tracking-[0.2em] text-(--muted) uppercase">
          Alternatives
        </p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight">Compared to the alternatives</h2>
        <p className="text-fd-muted-foreground mt-3 flex items-center gap-2 text-sm">
          <span
            aria-hidden="true"
            className="inline-block size-1.5 rounded-full bg-(--era-now) align-middle"
          />
          marks the tool ahead on that row, whichever tool it is
        </p>
        {/* One card per tool below md. Five columns on a phone leaves about 60px each, and a
            min-width wide enough to fix that made the page itself scroll sideways. */}
        <div className="mt-6 grid gap-4 md:hidden">
          {ROWS.map((row) => (
            <div key={row.name} className="card p-5">
              <p className={`font-semibold ${row.lead ? "text-(--era-now)" : "text-(--paper)"}`}>
                {row.href ? (
                  <a href={row.href} className="hover:underline">
                    {row.name}
                  </a>
                ) : (
                  row.name
                )}
              </p>
              <dl className="mt-3 grid gap-2 text-sm">
                {COLUMNS.map((c) => {
                  const leads = row.leads?.includes(c.key) ?? false;
                  // Label over value on the narrowest phones: a 9rem label column leaves 132px for
                  // the value, which broke identifiers like toMatchOutputSchema mid-word. Paired
                  // with minmax(0,1fr), since a plain 1fr track cannot shrink below its own
                  // min-content and held the row 62px wider than the card at 320px.
                  return (
                    <div
                      key={c.key}
                      className="grid grid-cols-1 gap-x-3 gap-y-1 sm:grid-cols-[9rem_minmax(0,1fr)]"
                    >
                      <dt className="text-(--muted)">{c.label}</dt>
                      <dd
                        className={`break-words ${
                          leads
                            ? "text-fd-foreground font-medium"
                            : isAbsent(row.cells[c.key])
                              ? "text-(--muted)"
                              : "text-fd-muted-foreground"
                        }`}
                      >
                        {leads && (
                          <span
                            aria-hidden="true"
                            className="mr-1.5 inline-block size-1.5 rounded-full bg-(--era-now) align-middle"
                          />
                        )}
                        {leads && <span className="sr-only">Leads: </span>}
                        {row.cells[c.key]}
                      </dd>
                    </div>
                  );
                })}
              </dl>
            </div>
          ))}
        </div>

        {/* Capabilities down the side, tools across the top. The other way round meant nine
            columns sharing the width, so every sentence wrapped into a narrow ribbon. */}
        <div className="card mt-6 hidden overflow-hidden md:block">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[56rem] table-fixed text-left text-sm">
              <thead className="bg-fd-muted/60">
                <tr className="border-b border-(--line)">
                  <th scope="col" className="w-[13%] px-5 py-4 font-medium text-(--muted)">
                    Capability
                  </th>
                  {ROWS.map((row) => (
                    <th
                      key={row.name}
                      scope="col"
                      className={`px-5 py-4 font-semibold ${
                        row.lead ? "text-(--era-now)" : "text-(--paper)"
                      }`}
                    >
                      {row.href ? (
                        <a href={row.href} className="hover:underline">
                          {row.name}
                        </a>
                      ) : (
                        row.name
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COLUMNS.map((c) => (
                  <tr
                    key={c.key}
                    className="hover:bg-fd-muted/40 border-b border-(--line) transition-colors last:border-0"
                  >
                    <th
                      scope="row"
                      className="px-5 py-4 text-left align-top font-medium text-(--paper)"
                    >
                      {c.label}
                    </th>
                    {ROWS.map((row) => {
                      const leads = row.leads?.includes(c.key) ?? false;
                      const cell = row.cells[c.key];
                      return (
                        <td
                          key={row.name}
                          className={`px-5 py-4 align-top leading-relaxed ${
                            leads
                              ? "text-fd-foreground font-medium"
                              : isAbsent(cell)
                                ? "text-(--muted)"
                                : "text-fd-muted-foreground"
                          }`}
                        >
                          {leads && (
                            <span
                              aria-hidden="true"
                              className="mr-1.5 inline-block size-1.5 rounded-full bg-(--era-now) align-middle"
                            />
                          )}
                          {leads && <span className="sr-only">Leads: </span>}
                          {cell}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-fd-muted-foreground mt-4 text-sm">
          vitest-mcp arrived in August 2026 and covers the same idea for the v1 SDK - if that is all
          you need, it is smaller. MCP Inspector solves a different problem: it is for looking at a
          server by hand, not for assertions in a suite.
        </p>
      </div>
    </section>
  );
}
