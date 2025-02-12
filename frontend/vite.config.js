import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/', // Garante que os caminhos funcionem corretamente
  build: {
    outDir: 'dist' // Garante que o build seja gerado na pasta correta
  }
});