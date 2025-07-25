import { defineConfig } from 'vite';
import honoDevServer from '@hono/vite-dev-server';

export default defineConfig({
  plugins: [
    honoDevServer({
      entry: 'client.tsx',
    }),
  ],
  server: {
    port: 9000,
  },
  preview: {
    port: 9000,
  },
});
