// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  // Required for canonical URLs and sitemap generation.
  site: "https://www.danielbanariba.dev",
  integrations: [react(), sitemap()],
  markdown: {
    shikiConfig: {
      theme: "dracula",
      wrap: true,
    },
  },
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      noExternal: ["gsap"],
    },
  },
});
