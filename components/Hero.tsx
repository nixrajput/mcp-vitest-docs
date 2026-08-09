import Link from "next/link";
import { InstallCommand } from "./InstallCommand";
import { ReporterPane } from "./ReporterPane";
import { SITE_DESCRIPTION, SITE_TAGLINE } from "@/lib/shared";

export function Hero({ lang }: { lang: string }) {
  return (
    <section className="relative isolate mx-auto flex max-w-3xl flex-col items-center gap-6 overflow-hidden px-4 py-12 text-center sm:py-14">
      <div aria-hidden className="hero-wash" />
      <div className="flex flex-col items-center gap-4">
        <h1 className="font-display text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
          {SITE_TAGLINE}
        </h1>
        <p className="text-fd-muted-foreground text-lg">{SITE_DESCRIPTION}</p>
      </div>

      <div className="w-full text-left">
        <p className="mb-2 pl-1 font-mono text-xs text-(--muted)">server.test.ts</p>
        <div className="grid gap-3 sm:grid-cols-2">
          <ReporterPane era="old" sdkLabel="SDK v1" revision="2025-11-25" startDelay={500} />
          <ReporterPane era="now" sdkLabel="SDK v2" revision="2026-07-28" startDelay={650} />
        </div>
      </div>

      <InstallCommand />
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
