import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import alpinejs from '@astrojs/alpinejs';
import vercel from '@astrojs/vercel';
import { devAdmin } from './src/integrations/dev-admin.ts';

export default defineConfig({
  integrations: [react(), alpinejs(), devAdmin()],
  adapter: vercel(),
  vite: {
    plugins: [tailwindcss()],
    build: {
      rollupOptions: {
        external: [
          "next/navigation",
          "next/link",
          "next/dynamic",
          "next/font/google",
          "next",
        ],
        onwarn(warning, warn) {
          if (warning.code === "MODULE_ID_UNHANDLED") return;
          warn(warning);
        },
      },
      minify: true,
      cssMinify: true,
      target: "esnext",
      assetsInlineLimit: 4096,
    },
    ssr: {
      noExternal: ["framer-motion", "motion"],
    },
  },
  site: "https://bhaveshp.dev",
  image: {
    remotePatterns: [
      { protocol: "https", hostname: "i.imgur.com" },
      { protocol: "https", hostname: "vgy.me" },
      { protocol: "https", hostname: "ik.imagekit.io" },
      { protocol: "https", hostname: "fivemanage.com" },
    ],
  },
  output: "server",
  compressHTML: true,
});
