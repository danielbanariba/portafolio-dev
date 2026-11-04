import { readFileSync } from "node:fs";
import { join } from "node:path";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { describe, expect, it } from "vitest";
import Navbar from "../components/Navbar.astro";

// WCAG 2.4.11 Focus Not Obscured: the navbar is position: fixed, so when the
// browser scrolls a focused element to the top of the viewport it lands under
// the bar. scroll-padding-top on <html> makes focus (and #anchor) scrolling
// stop below it, as long as the padding is at least as tall as the bar.
const REM_PER_SPACING_UNIT = 0.25; // Tailwind: h-16 = 16 * 0.25rem

const navbarHeightRem = async () => {
  const container = await AstroContainer.create();
  const html = await container.renderToString(Navbar);
  const nav = html.match(/<nav\b[^>]*\bfixed\b[\s\S]*?<\/nav>/)?.[0] ?? "";
  const heights = [...nav.matchAll(/class="[^"]*?(?:^|\s)h-(\d+)(?:\s|")/g)].map(
    (m) => Number(m[1]) * REM_PER_SPACING_UNIT,
  );
  return Math.max(...heights);
};

const htmlScrollPaddingRem = () => {
  const layout = readFileSync(join(process.cwd(), "src/layouts/Layout.astro"), "utf8");
  const htmlRule = layout.match(/(?:^|\n)\s*html\s*\{([^}]*)\}/)?.[1] ?? "";
  const value = htmlRule.match(/scroll-padding-top:\s*([\d.]+)rem/)?.[1];
  return value === undefined ? 0 : Number(value);
};

describe("fixed navbar", () => {
  it("never covers an element the browser scrolls into view", async () => {
    const barHeight = await navbarHeightRem();

    expect(barHeight).toBeGreaterThan(0);
    expect(htmlScrollPaddingRem()).toBeGreaterThanOrEqual(barHeight);
  });
});
