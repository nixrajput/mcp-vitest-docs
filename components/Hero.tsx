import Link from "next/link";
import { InstallCommand } from "./InstallCommand";
import { SITE_DESCRIPTION, SITE_TAGLINE } from "@/lib/shared";

export function Hero({ lang }: { lang: string }) {
  return (
    <section className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 py-24 text-center">
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{SITE_TAGLINE}</h1>
      <p className="text-fd-muted-foreground text-lg">{SITE_DESCRIPTION}</p>
      <InstallCommand />
      <div className="flex gap-3">
        <Link
          href={`/${lang}/docs`}
          className="bg-fd-primary text-fd-primary-foreground rounded-lg px-5 py-2.5"
        >
          Get started
        </Link>
        <Link
          href={`/${lang}/docs/api/mcp-test`}
          className="border-fd-border rounded-lg border px-5 py-2.5"
        >
          API reference
        </Link>
      </div>
    </section>
  );
}
