import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  root: 'frontend', // Define a pasta como root
  plugins: [react()],
  base: '/', // Caminho base no ambiente de produção
  build: {
    outDir: 'dist', // Saída para a pasta "dist" na raiz
    emptyOutDir: true, // Limpa a saída antes de cada build
  },
});
