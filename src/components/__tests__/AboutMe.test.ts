import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { describe, expect, it } from "vitest";
import AboutMe from "../AboutMe/AboutMe.astro";

describe("AboutMe", () => {
  it("does not open a second <main> landmark inside the page", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(AboutMe);

    expect(html).not.toMatch(/<main[\s>]/);
  });
});
