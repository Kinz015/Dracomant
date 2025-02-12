import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '/frontend/dist', // Certifique-se de que o diretório de build é 'dist'
  },
});