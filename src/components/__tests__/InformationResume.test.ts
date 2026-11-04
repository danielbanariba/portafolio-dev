import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { describe, expect, it } from "vitest";
import InformationResume from "../InformationResume.astro";

describe("InformationResume", () => {
  it("renders the stat counters as text, not as headings that skip from h1 to h3", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(InformationResume);

    expect(html).not.toMatch(/<h[1-6]\b/);
    expect(html).toMatch(/<p\b[^>]*text-purple-400[^>]*>\+20<\/p>/);
  });
});
