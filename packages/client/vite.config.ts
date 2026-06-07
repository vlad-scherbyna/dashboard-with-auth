import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3300,
  },
  resolve: {
    alias: {
      '@finmid/lib-common': path.resolve(__dirname, '../lib-common/types'),
    },
  },
});
