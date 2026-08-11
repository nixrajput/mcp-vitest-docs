import { ReporterPane } from "./ReporterPane";

export function ReporterDemo() {
  return (
    <section className="w-full px-4 py-16 sm:py-20">
      <div className="mx-auto w-full max-w-(--content-width)">
        <p className="font-display text-xs font-semibold tracking-[0.2em] text-(--muted) uppercase">
          The run
        </p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight">One suite, both protocol eras</h2>
        <p className="text-fd-muted-foreground mt-2 text-sm">
          The same test file against both SDK majors. Each pane reports the revision its lane
          negotiated rather than assuming one.
        </p>

        <p className="text-fd-muted-foreground mt-6 pl-1 font-mono text-xs">
          test/completions.test.ts
        </p>
        <div className="mt-2 grid gap-3 sm:grid-cols-2 sm:grid-rows-[auto_1fr_auto]">
          <ReporterPane era="old" sdkLabel="SDK v1" revision="2025-11-25" startDelay={500} />
          <ReporterPane era="now" sdkLabel="SDK v2" revision="2026-07-28" startDelay={650} />
        </div>
      </div>
    </section>
  );
}
