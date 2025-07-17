import { defineConfig } from 'vite';
import devServer from '@hono/vite-dev-server';
import build from '@hono/vite-build/bun';
// @ts-expect-error: ts config from vite is wrong
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    tailwindcss(),
    devServer({
      entry: 'src/protected-resource.tsx',
    }),
    build({
      outputDir: 'dist/protected-resource',
      entry: 'src/protected-resource.tsx',
    }),
  ],
  server: {
    port: 9002,
  },
  preview: {
    port: 9000,
  },
});
