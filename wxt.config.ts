import { defineConfig } from 'wxt';
import react from '@vitejs/plugin-react';

// See https://wxt.dev/api/config.html
export default defineConfig({
  srcDir: "src",
  manifest: {
    name: "Extension Sync",
    permissions: [
      "management",
      "storage"
    ]
  },
  vite: () => ({
    plugins: [react()],
  }),
});
