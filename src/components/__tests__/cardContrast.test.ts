import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { describe, expect, it } from "vitest";
import Conferences from "../Conferences.astro";
import Education from "../Education.astro";

// Tailwind's gray-500 (#6a7282) on the cards' gray-800 (#1e2939) measures
// 3.03:1, below the 4.5:1 WCAG AA minimum for this 12-14px text.
// gray-400 (#99a1af) on the same background clears it.
describe.each([
  ["Conferences", Conferences],
  ["Education", Education],
] as const)("%s", (_name, component) => {
  it("does not set secondary card text in low-contrast gray-500", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(component);

    expect(html).not.toMatch(/class="[^"]*\btext-gray-500\b/);
  });
});
