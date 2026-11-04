/// <reference types="vitest" />
// getViteConfig runs the tests through Astro's Vite pipeline, so .astro
// components compile and can be rendered with the Container API.
import { getViteConfig } from "astro/config";

export default getViteConfig({
  test: {
    include: ["src/**/*.test.ts"],
  },
});
