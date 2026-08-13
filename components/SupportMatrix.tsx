const REQUIREMENTS = [
  { label: "Node.js", value: ">=20" },
  { label: "vitest", value: "^3.2.0 || ^4.0.0" },
  { label: "Module format", value: "ESM only" },
  { label: "@modelcontextprotocol/sdk", value: "^1.17.0, optional" },
  { label: "@modelcontextprotocol/client", value: "^2.0.0, optional" },
  { label: "@modelcontextprotocol/server", value: "^2.0.0, optional" },
] as const;

const EXPORTS = [".", "./matchers", "./setup", "./snapshot", "./auth"];

export function SupportMatrix() {
  return (
    <section id="requirements" className="w-full px-4 py-16 sm:py-20">
      <div className="mx-auto w-full max-w-(--content-width)">
        <p className="font-display text-xs font-semibold tracking-[0.2em] text-(--muted) uppercase">
          Requirements
        </p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight">What your project needs</h2>
        <div className="card mt-6 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[420px] table-fixed text-left font-mono text-sm">
              <thead className="bg-fd-muted/60">
                <tr className="border-b border-(--line)">
                  <th scope="col" className="w-2/5 px-4 py-3 font-medium text-(--muted)">
                    Requirement
                  </th>
                  <th scope="col" className="w-3/5 px-4 py-3 font-medium text-(--muted)">
                    Value
                  </th>
                </tr>
              </thead>
              <tbody>
                {REQUIREMENTS.map((r) => (
                  <tr
                    key={r.label}
                    className="hover:bg-fd-muted/40 border-b border-(--line) transition-colors last:border-0"
                  >
                    <th scope="row" className="px-4 py-3 text-left font-semibold text-(--paper)">
                      {r.label}
                    </th>
                    <td className="px-4 py-3 text-(--paper)">{r.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="mt-6">
          <p className="text-fd-muted-foreground text-sm">
            All three SDK peers are optional - install whichever major your server uses, and{" "}
            <code className="font-mono">mcpTest()</code> detects it at runtime. Five subpath
            exports, all typed:
          </p>
          <ul className="mt-3 flex flex-wrap gap-2 font-mono text-xs">
            {EXPORTS.map((exp) => (
              <li key={exp} className="bg-fd-muted text-fd-muted-foreground rounded-md px-2 py-1">
                {exp}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
