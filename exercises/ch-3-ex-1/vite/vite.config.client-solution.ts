import { defineConfig } from 'vite';
import honoDevServer from '@hono/vite-dev-server';

export default defineConfig({
  plugins: [
    honoDevServer({
      entry: 'src/client-solution.tsx',
      injectClientScript: true,
    }),
  ],
  build: {
    rollupOptions: {
      input: 'src/client-solution.tsx',
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
