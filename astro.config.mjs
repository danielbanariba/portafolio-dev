// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import { satteri } from "@astrojs/markdown-satteri";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "node:url";
import { markdownImageAttributes } from "./src/lib/markdownImageAttributes.ts";

// https://astro.build/config
export default defineConfig({
  // Required for canonical URLs and sitemap generation.
  site: "https://www.danielbanariba.dev",
  integrations: [react(), sitemap()],
  markdown: {
    // Size and lazy-load the public/ images in the case-study pages.
    processor: satteri({
      hastPlugins: [
        markdownImageAttributes({
          publicDir: fileURLToPath(new URL("./public", import.meta.url)),
        }),
      ],
    }),
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
