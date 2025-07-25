import { defineConfig } from 'vite';
import honoDevServer from '@hono/vite-dev-server';

export default defineConfig({
  plugins: [
    honoDevServer({
      entry: 'protectedResource.tsx',
    }),
  ],
  server: {
    port: 9002,
  },
  preview: {
    port: 9002,
  },
});
