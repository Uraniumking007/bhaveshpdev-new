// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel";
import tailwind from "@tailwindcss/vite";

// https://astro.build/config
// Use server output with Vercel adapter (required for Astro 5.x when using server mode)
export default defineConfig({
  output: "server",
  adapter: vercel(),
  integrations: [react()],
  vite: {
    plugins: [tailwind()],
    build: {
      assetsInline: true,
    },
  },
});
