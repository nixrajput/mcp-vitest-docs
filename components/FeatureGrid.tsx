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
    title: "Typed matchers",
    body: "Seven of them, with TypeScript augmentation and did-you-mean suggestions.",
  },
  {
    title: "External servers",
    body: "Spawn one over stdio or point at a running URL. Everything else works unchanged.",
  },
  {
    title: "Regression safety",
    body: "Snapshot manifests normalized so key order and absent optionals never churn them.",
  },
];

export function FeatureGrid() {
  return (
    <section className="mx-auto w-full max-w-(--site-width) border-t border-(--line) px-4 py-12">
      <p className="font-display text-xs font-semibold tracking-[0.2em] text-(--muted) uppercase">
        Coverage
      </p>
      <h2 className="mt-2 text-2xl font-bold tracking-tight">What mcp-vitest covers</h2>
      <dl className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {FEATURES.map((f) => (
          <div
            key={f.title}
            className="card hover:bg-fd-accent/40 flex flex-col gap-2 p-4 transition-colors"
          >
            <dt className="text-base font-medium">{f.title}</dt>
            <dd className="text-fd-muted-foreground text-sm">{f.body}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
