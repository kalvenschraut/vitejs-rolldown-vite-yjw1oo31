import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: {
        'shared-utils': resolve(__dirname, 'src/index.ts'),
        'worker': resolve(__dirname, 'src/Worker.ts')
      },
      formats: ['es'],
    },
    sourcemap: true,
    emptyOutDir: true
  }
});