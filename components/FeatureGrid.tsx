const FEATURES = [
  {
    title: "Both SDK majors",
    body: "v1 and v2 servers, detected automatically. No adapter to write.",
  },
  {
    title: "Lifecycle coverage",
    body: "Run the same tests against the 2025 and 2026-07-28 protocol revisions.",
  },
  {
    title: "Interaction doubles",
    body: "Answer a server's sampling, elicitation, and roots requests from your test.",
  },
  {
    title: "Notifications and progress",
    body: "Collect what a server pushes, or await one by method. Progress and cancellation per call.",
  },
  {
    title: "Typed matchers",
    body: "Seven of them, with TypeScript augmentation and did-you-mean suggestions.",
  },
  {
    title: "External servers",
    body: "Spawn one over stdio or point at a running URL. Everything else works unchanged.",
  },
  {
    title: "OAuth testing",
    body: "Send bearer credentials to a URL server, or drive the other side with a fake authorization server.",
  },
  {
    title: "Regression safety",
    body: "Snapshot manifests normalized so key order and absent optionals never churn them.",
  },
];

export function FeatureGrid() {
  return (
    /* Its band comes from the alternating rule in global.css, with the other sections. */
    <section id="coverage" className="w-full px-4 py-16 sm:py-20">
      <div className="mx-auto w-full max-w-(--content-width)">
        <p className="font-display text-xs font-semibold tracking-[0.2em] text-(--muted) uppercase">
          Coverage
        </p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight">What mcp-vitest covers</h2>
        <dl className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {FEATURES.map((f) => (
            <div key={f.title} className="card card-interactive flex flex-col gap-2 p-5">
              <dt className="text-base font-medium">{f.title}</dt>
              <dd className="text-fd-muted-foreground text-sm leading-relaxed">{f.body}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
