import { defineConfig } from 'vite';
import honoDevServer from '@hono/vite-dev-server';

export default defineConfig({
  plugins: [
    honoDevServer({
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
