// Fails until locale-prefixed routing exists. Run against `next start`.
const base = process.env.BASE_URL ?? "http://localhost:3000";
const res = await fetch(`${base}/en/docs`, { redirect: "manual" });
if (!res.ok) {
  console.error(`FAIL: /en/docs returned ${res.status}, expected 200`);
  process.exit(1);
}
console.log("PASS: /en/docs serves 200");

const home = await fetch(`${base}/en`);
const html = await home.text();
for (const needle of ["mcp-vitest", "npm i -D mcp-vitest", "both MCP SDK majors"]) {
  if (!html.includes(needle)) {
    console.error(`FAIL: home page missing ${JSON.stringify(needle)}`);
    process.exit(1);
  }
}
console.log("PASS: home page renders its positioning copy");

for (const path of ["/en/docs", "/en/docs/getting-started"]) {
  const r = await fetch(`${base}${path}`);
  if (!r.ok) {
    console.error(`FAIL: ${path} returned ${r.status}`);
    process.exit(1);
  }
}
console.log("PASS: docs skeleton pages render");

const API_PAGES = [
  "mcp-test", "harness", "matchers", "doubles",
  "notifications", "snapshots", "external-servers", "lifecycles",
];
for (const slug of API_PAGES) {
  const r = await fetch(`${base}/en/docs/api/${slug}`);
  if (!r.ok) {
    console.error(`FAIL: /en/docs/api/${slug} returned ${r.status}`);
    process.exit(1);
  }
}
console.log(`PASS: all ${API_PAGES.length} API pages render`);
