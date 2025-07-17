import { defineConfig } from 'vite';
import devServer from '@hono/vite-dev-server';
import build from '@hono/vite-build/bun';

export default defineConfig({
  plugins: [
    devServer({
      entry: 'src/client.ts',
    }),
    build({
      outputDir: 'dist/client',
      entry: 'src/client.ts',
    }),
  ],
  server: {
    port: 9000,
  },
  preview: {
    port: 9000,
  },
});
