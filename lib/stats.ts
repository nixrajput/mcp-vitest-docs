const REPO = "nixrajput/mcp-vitest";
const FIRST_PUBLISH = "2026-08-06";

// Short window, not version.ts's hourly one: GitHub's unauthenticated API caps at 60
// requests/hour/IP, so every fetch here must be cached, but visitors still want numbers
// that move within a session rather than numbers frozen at build time.
const REVALIDATE_SECONDS = 600;

export interface Contributor {
  login: string;
  avatarUrl: string;
  htmlUrl: string;
  contributions: number;
}

export interface ProjectStats {
  totalDownloads?: number;
  stars?: number;
  forks?: number;
  releaseCount?: number;
  createdAt?: string;
  contributors?: Contributor[];
}

async function fetchJson(url: string): Promise<unknown> {
  try {
    const res = await fetch(url, { next: { revalidate: REVALIDATE_SECONDS } });
    return res.ok ? await res.json() : undefined;
  } catch {
    return undefined;
  }
}

/**
 * All the live project stats the home page shows, in one call. Each source can fail
 * independently (rate limit, network) - on failure that stat is omitted rather than
 * rendered as a zero, which would read as "this project has no downloads" when the
 * truth is just "npm didn't answer".
 */
export async function getProjectStats(): Promise<ProjectStats> {
  const today = new Date().toISOString().slice(0, 10);
  const [downloads, repo, releases, contributors] = await Promise.all([
    fetchJson(`https://api.npmjs.org/downloads/range/${FIRST_PUBLISH}:${today}/mcp-vitest`),
    fetchJson(`https://api.github.com/repos/${REPO}`),
    fetchJson(`https://api.github.com/repos/${REPO}/releases?per_page=100`),
    fetchJson(`https://api.github.com/repos/${REPO}/contributors`),
  ]);

  const stats: ProjectStats = {};

  const days = (downloads as { downloads?: { downloads: number }[] } | undefined)?.downloads;
  if (Array.isArray(days)) {
    stats.totalDownloads = days.reduce((sum, day) => sum + (day.downloads ?? 0), 0);
  }

  const repoData = repo as
    { stargazers_count?: unknown; forks_count?: unknown; created_at?: unknown } | undefined;
  if (typeof repoData?.stargazers_count === "number") stats.stars = repoData.stargazers_count;
  if (typeof repoData?.forks_count === "number") stats.forks = repoData.forks_count;
  if (typeof repoData?.created_at === "string") stats.createdAt = repoData.created_at;

  if (Array.isArray(releases)) stats.releaseCount = releases.length;

  if (Array.isArray(contributors)) {
    stats.contributors = (
      contributors as {
        login?: unknown;
        avatar_url?: unknown;
        html_url?: unknown;
        contributions?: unknown;
      }[]
    )
      .filter((c) => typeof c.login === "string" && !c.login.endsWith("[bot]"))
      .map((c) => ({
        login: c.login as string,
        avatarUrl: c.avatar_url as string,
        htmlUrl: c.html_url as string,
        contributions: c.contributions as number,
      }));
  }

  return stats;
}
