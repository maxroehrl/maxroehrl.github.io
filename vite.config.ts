import { defineConfig } from 'rolldown-vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  build: {
    outDir: 'docs',
  },
  plugins: [vue(), tailwindcss()],
  experimental: {
    enableNativePlugin: true,
  },
});
