import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

// Without font-display (or with block/auto) the browser hides text set in a
// web font for up to three seconds while the file downloads.
const NON_BLOCKING = ["swap", "fallback", "optional"];

const sourceFiles = (dir: string): string[] =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return sourceFiles(path);
    return /\.(astro|css|scss)$/.test(entry.name) ? [path] : [];
  });

const fontFaces = sourceFiles(join(process.cwd(), "src")).flatMap((file) =>
  [...readFileSync(file, "utf8").matchAll(/@font-face\s*\{([^}]*)\}/g)].map((m) => ({
    file,
    family: m[1].match(/font-family:\s*([^;]+);/)?.[1].trim(),
    display: m[1].match(/font-display:\s*([\w-]+)/)?.[1],
  })),
);

describe("@font-face rules", () => {
  it("exist in the source (guards the scan itself)", () => {
    expect(fontFaces.length).toBeGreaterThan(0);
  });

  it("keep text visible while the font loads", () => {
    const blocking = fontFaces.filter((face) => !NON_BLOCKING.includes(face.display ?? ""));

    expect(blocking).toEqual([]);
  });
});
