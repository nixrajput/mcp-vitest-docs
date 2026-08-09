import Link from "next/link";
import { InstallCommand } from "./InstallCommand";
import { ReporterPane } from "./ReporterPane";
import { SITE_DESCRIPTION, SITE_TAGLINE } from "@/lib/shared";

export function Hero({ lang }: { lang: string }) {
  return (
    <section className="mx-auto flex max-w-3xl flex-col items-center gap-8 px-4 py-20 text-center sm:py-24">
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
          className="bg-fd-primary text-fd-primary-foreground rounded-lg px-5 py-2.5 transition-opacity hover:opacity-90"
        >
          Get started
        </Link>
        <Link
          href={`/${lang}/docs/api/mcp-test`}
          className="border-fd-border hover:bg-fd-accent rounded-lg border px-5 py-2.5 transition-colors"
        >
          API reference
        </Link>
      </div>
    </section>
  );
}
