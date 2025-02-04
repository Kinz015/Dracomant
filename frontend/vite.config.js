import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/', // Caminho base no ambiente de produção
  build: {
    outDir: '../dist', // Saída para "dist" na raiz do projeto
    emptyOutDir: true, // Limpa a saída antes de cada build
  },
});


