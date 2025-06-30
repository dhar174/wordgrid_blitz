import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        rollupOptions: {
          output: {
            manualChunks: (id) => {
              // Create a separate chunk for the words.json file
              if (id.includes('words.json')) {
                return 'words-data';
              }
              // Split React and React DOM into their own chunk
              if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
                return 'react-vendor';
              }
              // Split other vendor libraries
              if (id.includes('node_modules')) {
                return 'vendor';
              }
            }
          }
        },
        // Increase chunk size warning limit for word games with large dictionaries
        chunkSizeWarningLimit: 2000
      }
    };
});
