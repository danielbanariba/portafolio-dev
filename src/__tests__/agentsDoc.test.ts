import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const read = (file: string) => readFileSync(join(process.cwd(), file), "utf8");
const scripts = Object.keys(JSON.parse(read("package.json")).scripts ?? {});
const agents = read("AGENTS.md");

// npm built-ins that run a package.json script of the same name.
const shorthands = ["test", "start"];

describe("AGENTS.md", () => {
  const documented = [
    ...[...agents.matchAll(/`npm run ([\w:-]+)/g)].map((m) => m[1]),
    ...[...agents.matchAll(/`npm (\w+)/g)].map((m) => m[1]).filter((c) => shorthands.includes(c)),
  ];

  it("only documents npm scripts that exist in package.json", () => {
    expect(documented.filter((script) => !scripts.includes(script))).toEqual([]);
  });

  it("documents every npm script in package.json", () => {
    expect(scripts.filter((script) => !documented.includes(script))).toEqual([]);
  });
});
