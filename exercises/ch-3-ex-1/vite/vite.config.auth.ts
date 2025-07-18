import { defineConfig } from 'vite';
import honoDevServer from '@hono/vite-dev-server';

export default defineConfig({
  plugins: [
    honoDevServer({
      entry: 'src/authorization-server.tsx',
    }),
  ],
  server: {
    port: 9001,
  },
  preview: {
    port: 9000,
  },
});
