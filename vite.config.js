import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  root: './', // Define a raiz do projeto como o diretório atual
  plugins: [react()],
  build: {
    outDir: './dist', // Define o diretório de saída para a build
  },
});