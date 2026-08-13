import { getProjectStats } from "@/lib/stats";

// Verified by running the suite in the package repo; there is no API for a test count,
// so unlike the other stats here this one is a checked constant, not a live fetch.
const SUITE_TESTS = 145;

function daysSince(iso: string): number {
  return Math.max(0, Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000));
}

export async function ProjectStats() {
  const stats = await getProjectStats();

  const cells: { label: string; value: string }[] = [];
  if (stats.createdAt) {
    cells.push({ label: "days since first publish", value: String(daysSince(stats.createdAt)) });
  }
  if (stats.releaseCount !== undefined) {
    cells.push({ label: "npm releases", value: String(stats.releaseCount) });
  }
  cells.push({ label: "tests in the suite", value: String(SUITE_TESTS) });
  if (stats.totalDownloads !== undefined) {
    cells.push({ label: "downloads all-time", value: stats.totalDownloads.toLocaleString() });
  }
  if (stats.stars !== undefined) {
    cells.push({ label: "GitHub stars", value: String(stats.stars) });
  }
  if (stats.forks !== undefined) {
    cells.push({ label: "forks", value: String(stats.forks) });
  }

  return (
    <section id="project" className="w-full px-4 py-16 sm:py-20">
      <div className="mx-auto w-full max-w-(--content-width)">
        <p className="font-display text-xs font-semibold tracking-[0.2em] text-(--muted) uppercase">
          The project
        </p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight">By the numbers</h2>
        <dl className="mt-8 grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {cells.map((cell) => (
            <div key={cell.label} className="card flex flex-col gap-1 p-5">
              <dt className="font-display text-3xl font-bold tracking-tight">{cell.value}</dt>
              <dd className="text-fd-muted-foreground text-sm">{cell.label}</dd>
            </div>
          ))}
        </dl>

        {stats.contributors && stats.contributors.length > 0 && (
          <div className="mt-10">
            <p className="text-fd-muted-foreground text-sm">
              {stats.contributors.length === 1
                ? "1 contributor"
                : `${stats.contributors.length} contributors`}
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {stats.contributors.map((c) => (
                <li key={c.login}>
                  <a
                    href={c.htmlUrl}
                    title={`${c.login} - ${c.contributions} commits`}
                    className="block rounded-full ring-1 ring-(--line) transition-transform hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--era-now)"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element -- remote avatar host is not allowlisted in next.config, and this page carries no CSP */}
                    <img
                      src={c.avatarUrl}
                      alt={c.login}
                      width={48}
                      height={48}
                      loading="lazy"
                      className="size-12 rounded-full"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
