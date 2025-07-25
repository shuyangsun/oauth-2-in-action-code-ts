import { defineConfig } from 'vite';
import honoDevServer from '@hono/vite-dev-server';

export default defineConfig({
  plugins: [
    honoDevServer({
      entry: 'authorizationServer.tsx',
    }),
  ],
  server: {
    port: 9001,
  },
  preview: {
    port: 9001,
  },
});
