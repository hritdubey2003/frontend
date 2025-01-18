import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      external: ['react', 'react-dom'], // List any external dependencies here
    },
  },
});
