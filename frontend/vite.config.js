// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        // Vite 8 / rolldown requires manualChunks to be a function
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react-dom') || id.includes('react-router') || id.includes('react/')) {
              return 'vendor';
            }
            if (id.includes('@reduxjs') || id.includes('react-redux')) {
              return 'redux';
            }
            if (id.includes('@mui') || id.includes('@emotion')) {
              return 'mui';
            }
            if (id.includes('axios')) {
              return 'axios';
            }
          }
        },
      },
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
});
