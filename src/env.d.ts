/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly ZOHOMAIL_USER: string;
  readonly ZOHOMAIL_PASS: string;
  // Add other env vars here
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
