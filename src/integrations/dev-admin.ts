import type { AstroIntegration } from 'astro';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export function devAdmin(): AstroIntegration {
  return {
    name: 'dev-admin',
    hooks: {
      'astro:config:setup': ({ command, injectRoute, logger }) => {
        if (command !== 'dev') return;

        const __dirname = fileURLToPath(new URL('.', import.meta.url));

        injectRoute({
          pattern: '/admin',
          entrypoint: resolve(__dirname, '../dev-admin/admin.astro'),
        });

        injectRoute({
          pattern: '/api/admin/static-data',
          entrypoint: resolve(__dirname, '../dev-admin/api/static-data.ts'),
        });

        logger.info('🔧 Dev-only admin routes injected: /admin and /api/admin/static-data');
      },
    },
  };
}
