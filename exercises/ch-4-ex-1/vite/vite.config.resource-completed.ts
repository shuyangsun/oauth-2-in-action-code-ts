import { defineConfig } from 'vite';
import honoDevServer from '@hono/vite-dev-server';

export default defineConfig({
  plugins: [
    honoDevServer({
      entry: 'completed/protectedResource.tsx',
      injectClientScript: true,
    }),
  ],
  build: {
    rollupOptions: {
      input: 'completed/client.tsx',
    },
  },
  server: {
    port: 9000,
  },
  preview: {
    port: 9000,
  },
  ssr: {
    noExternal: true,
  },
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },
});
