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
    <section className="mx-auto grid max-w-5xl gap-6 px-4 pb-24 sm:grid-cols-2 lg:grid-cols-3">
      {FEATURES.map((f) => (
        <div key={f.title} className="border-fd-border rounded-lg border p-5">
          <h3 className="mb-2 font-semibold">{f.title}</h3>
          <p className="text-fd-muted-foreground text-sm">{f.body}</p>
        </div>
      ))}
    </section>
  );
}
