import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Diretório de saída do build
    rollupOptions: {
      input: {
        main: './index.html', // Caminho para o index.html
      },
    },
  },
});