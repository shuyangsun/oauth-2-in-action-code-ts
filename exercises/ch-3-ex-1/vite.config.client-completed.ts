import { defineConfig } from 'vite';
import devServer from '@hono/vite-dev-server';
import build from '@hono/vite-build/bun';
// @ts-expect-error: ts config from vite is wrong
import tailwindcss from '@tailwindcss/vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  plugins: [
    tailwindcss(),
    viteStaticCopy({
      targets: [
        {
          src: '../../packages/shared/*.js',
          dest: 'files/shared',
        },
      ],
    }),
    devServer({
      entry: 'src/completed/client.tsx',
    }),
    build({
      outputDir: 'dist/client-completed',
      entry: 'src/client.tsx',
    }),
  ],
  server: {
    port: 9000,
  },
  preview: {
    port: 9000,
  },
});
