import Link from "next/link";
import { InstallCommand } from "./InstallCommand";
import { ReporterPane } from "./ReporterPane";
import { NPM_URL, SITE_DESCRIPTION, SITE_TAGLINE } from "@/lib/shared";

export function Hero({ lang, version }: { lang: string; version: string }) {
  return (
    <section className="mx-auto flex w-full max-w-(--site-width) flex-col items-center gap-6 px-4 py-12 text-center sm:py-14">
      <div className="flex max-w-(--site-measure) flex-col items-center gap-4">
        <h1 className="font-display text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
          {SITE_TAGLINE}
        </h1>
        <p className="text-fd-muted-foreground text-lg">{SITE_DESCRIPTION}</p>
      </div>

      <div aria-hidden className="hero-rule" />

      <div className="w-full text-left">
        <p className="mb-2 pl-1 font-mono text-xs text-(--muted)">test/completions.test.ts</p>
        <div className="grid gap-3 sm:grid-cols-2">
          <ReporterPane era="old" sdkLabel="SDK v1" revision="2025-11-25" startDelay={500} />
          <ReporterPane era="now" sdkLabel="SDK v2" revision="2026-07-28" startDelay={650} />
        </div>
      </div>

      <div className="flex flex-col items-center gap-2">
        <InstallCommand />
        <a
          href={`${NPM_URL}/v/${version}`}
          className="text-fd-muted-foreground hover:text-fd-foreground rounded-sm font-mono text-xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--era-now)"
        >
          latest v{version} on npm
        </a>
      </div>
      <div className="flex gap-3">
        <Link
          href={`/${lang}/docs`}
          className="bg-fd-primary text-fd-primary-foreground rounded-lg px-6 py-3 font-medium shadow-sm transition-all duration-200 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--era-now) active:scale-[0.97]"
        >
          Get started
        </Link>
        <Link
          href={`/${lang}/docs/api/mcp-test`}
          className="border-fd-border bg-fd-card hover:bg-fd-accent hover:border-fd-ring rounded-lg border px-6 py-3 font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--era-now) active:scale-[0.97]"
        >
          API reference
        </Link>
      </div>
    </section>
  );
}
