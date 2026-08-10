// Payload and response-time budgets per route, measured against `npm start`. Not
// Lighthouse: no browser dependency, so it is stable enough to gate a PR. Real LCP and CLS
// are measured by hand before a release - a flaky perf gate teaches people to ignore CI.
const base = process.env.BASE_URL ?? "http://localhost:3000";

// Without this, a server that is not running fails as an undici stack trace that says
// nothing about what to do.
async function get(url) {
  try {
    return await fetch(url);
  } catch {
    console.error(`FAIL: nothing is listening at ${base}`);
    console.error("Start the site first:  npm start   (or BASE_URL=... npm run check:vitals)");
    process.exit(1);
  }
}

// Budgets come from measurement, not aspiration: /en was 729.3 KB and the docs routes
// 792.9 KB when these were set, so each carries a little headroom and no more.
const BUDGETS = [
  { path: "/en", js: 800, ttfb: 800 },
  { path: "/en/docs", js: 850, ttfb: 800 },
  { path: "/en/docs/api/mcp-test", js: 850, ttfb: 800 },
];

// Whatever is on the port is not necessarily this site, and not necessarily a production
// build. Both mistakes produce believable numbers: a dev server reports several times the
// real figure, because dev serves unminified bundles.
const identity = await (await get(`${base}/en`)).text();
if (!identity.includes("mcp-vitest")) {
  console.error(`FAIL: ${base} is serving a different site`);
  console.error("Point BASE_URL at this site's `npm start`, not another server on that port.");
  process.exit(1);
}
if (identity.includes("next-devtools")) {
  console.error(`FAIL: ${base} is a dev server, so these numbers would be meaningless`);
  console.error("Measure a production build:  npm run build && npm start");
  process.exit(1);
}

let failed = false;

for (const { path, js: jsBudget, ttfb: ttfbBudget } of BUDGETS) {
  const started = Date.now();
  const res = await get(`${base}${path}`);
  const html = await res.text();
  const ttfb = Date.now() - started;

  if (!res.ok) {
    console.error(`FAIL: ${path} returned ${res.status}`);
    failed = true;
    continue;
  }

  const assets = [
    ...new Set([...html.matchAll(/(?:src|href)="(\/_next\/static\/[^"]+\.js)"/g)].map((m) => m[1])),
  ];
  let bytes = 0;
  for (const asset of assets) {
    bytes += (await (await get(`${base}${asset}`)).arrayBuffer()).byteLength;
  }
  const kb = bytes / 1024;

  const over = kb > jsBudget || ttfb > ttfbBudget;
  if (over) failed = true;
  console.log(
    `${over ? "FAIL" : "PASS"}: ${path} js=${kb.toFixed(1)}KB (budget ${jsBudget}) ttfb=${ttfb}ms (budget ${ttfbBudget})`,
  );
}

if (failed) process.exit(1);
console.log("PASS: every route inside its budget");
