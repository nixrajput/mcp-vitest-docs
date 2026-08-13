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
        <div className="card mt-6 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1280px] table-auto text-left text-sm">
              <thead className="bg-fd-muted/60">
                <tr className="border-b border-(--line)">
                  <th scope="col" className="px-4 py-3 font-medium text-(--muted)">
                    Tool
                  </th>
                  {COLUMNS.map((c) => (
                    <th key={c.key} scope="col" className="px-4 py-3 font-medium text-(--muted)">
                      {c.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row) => (
                  <tr
                    key={row.name}
                    className="hover:bg-fd-muted/40 border-b border-(--line) transition-colors last:border-0"
                  >
                    <th
                      scope="row"
                      className={`px-4 py-3 text-left font-semibold whitespace-nowrap ${
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
                    {COLUMNS.map((c) => {
                      const leads = row.leads?.includes(c.key) ?? false;
                      return (
                        <td
                          key={c.key}
                          className={`px-4 py-3 ${
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
