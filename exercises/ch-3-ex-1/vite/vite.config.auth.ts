import { defineConfig } from 'vite';
import honoDevServer from '@hono/vite-dev-server';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    tailwindcss(),
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
