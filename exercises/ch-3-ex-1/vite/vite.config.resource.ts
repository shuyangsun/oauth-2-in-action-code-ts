import { defineConfig } from 'vite';
import honoDevServer from '@hono/vite-dev-server';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    tailwindcss(),
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
