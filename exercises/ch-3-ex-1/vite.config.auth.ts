import { defineConfig } from 'vite';
import devServer from '@hono/vite-dev-server';
import build from '@hono/vite-build/bun';

export default defineConfig({
  plugins: [
    devServer({
      entry: 'src/authorization-server.ts',
    }),
    build({
      outputDir: 'dist/authorization-server',
      entry: 'src/authorization-server.ts',
    }),
  ],
  server: {
    port: 9001,
  },
  preview: {
    port: 9000,
  },
});
