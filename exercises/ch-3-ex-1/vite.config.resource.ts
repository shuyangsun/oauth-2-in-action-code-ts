import { defineConfig } from 'vite';
import devServer from '@hono/vite-dev-server';
import build from '@hono/vite-build/bun';

export default defineConfig({
  plugins: [
    devServer({
      entry: 'src/protected-resource.ts',
    }),
    build({
      outputDir: 'dist/protected-resource',
      entry: 'src/protected-resource.ts',
    }),
  ],
  server: {
    port: 9002,
  },
  preview: {
    port: 9000,
  },
});
