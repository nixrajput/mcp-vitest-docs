import { mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUT = ".samples";
const FENCE = /```ts(?![a-z])(?<meta>[^\n]*)\n(?<code>[\s\S]*?)```/g;

// Fragments are short snippets that assume an existing harness rather than
// repeating imports on every page. They only typecheck inside this preamble.
const PREAMBLE = `import { expect, test } from "vitest";
import { createMcpTest, detectServerKind, mcpTest, serveHandler } from "mcp-vitest";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

declare const mcp: Awaited<ReturnType<typeof mcpTest>>;
declare const server: McpServer;
declare function createServer(): McpServer;

export async function _fragment() {
`;

// Docs samples call createServer() as if it were a reader's own code; the stub
// gives that name a real type so samples typecheck without a fixture on every
// page. Built on the v2 SDK's McpServer, the only one createMcpHandler accepts.
const SERVER_STUB = `import { McpServer } from "@modelcontextprotocol/server";

export function createServer(): McpServer {
  return new McpServer({ name: "docs-sample", version: "1.0.0" });
}
`;

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry);
    return statSync(full).isDirectory() ? walk(full) : full.endsWith(".mdx") ? [full] : [];
  });
}

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });

// Written as server.ts so a sample's `from "./server.js"` resolves under nodenext.
writeFileSync(join(OUT, "server.ts"), SERVER_STUB);

// Samples use top-level await, valid only in ESM; nodenext infers CJS without this.
writeFileSync(join(OUT, "package.json"), `{ "type": "module" }\n`);

let count = 0;
for (const file of walk("content/docs")) {
  const source = readFileSync(file, "utf8");
  for (const match of source.matchAll(FENCE)) {
    const meta = match.groups?.meta ?? "";
    // "notype" opts a sample out: it illustrates prose, not usable code.
    if (meta.includes("notype")) continue;
    const code = match.groups?.code ?? "";
    const body = meta.includes("fragment") ? `${PREAMBLE}${code}\n}\n` : code;
    const name = `${file.replace(/[^a-z0-9]/gi, "_")}_${count++}.ts`;
    writeFileSync(join(OUT, name), body);
  }
}

// tsc fails with TS18003 when its include matches nothing, so a docs tree with no
// typecheckable fences would fail the gate rather than pass it vacuously.
if (count === 0) writeFileSync(join(OUT, "_none.ts"), "export {};\n");

console.log(`extracted ${count} samples`);
