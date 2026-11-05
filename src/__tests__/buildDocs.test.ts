import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const read = (file: string) => readFileSync(join(process.cwd(), file), "utf8");
const splitSteps = (command: string) =>
  command.split("&&").map((step) => step.trim()).filter(Boolean);

const buildSteps = splitSteps(JSON.parse(read("package.json")).scripts.build);

// The docs describe `npm run build` as "runs `a`, then `b`" or
// "runs `a && b`". Whatever the wording, the backticked commands in that
// clause must be exactly the steps of the real build script, in order.
const documentedSteps = (doc: string) => {
  const line = doc.split("\n").find((l) => l.includes("`npm run build`") && /\bruns\b/.test(l));
  // The clause ends at the first ";" or "(", where any side note begins.
  const described = line?.slice(line.search(/\bruns\b/)).split(/[;(]/)[0] ?? "";
  return [...described.matchAll(/`([^`]+)`/g)].flatMap((m) => splitSteps(m[1]));
};

describe.each(["AGENTS.md", "CLAUDE.md"])("%s", (file) => {
  it("describes the same steps the build script runs", () => {
    expect(documentedSteps(read(file))).toEqual(buildSteps);
  });
});
