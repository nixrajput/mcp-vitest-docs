// Fails until locale-prefixed routing exists. Run against `next start`.
const base = process.env.BASE_URL ?? "http://localhost:3000";
const res = await fetch(`${base}/en/docs`, { redirect: "manual" });
if (!res.ok) {
  console.error(`FAIL: /en/docs returned ${res.status}, expected 200`);
  process.exit(1);
}
console.log("PASS: /en/docs serves 200");
