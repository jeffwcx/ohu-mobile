import { defineConfig } from 'vitest/config';
import Vue from '@vitejs/plugin-vue2';
import VueJsx from '@vitejs/plugin-vue2-jsx';

export default defineConfig({
  plugins: [
    // @ts-ignore
    Vue(),
    // @ts-ignore
    VueJsx()
  ],
  define: {
    __DEV__: true,
    __TEST__: true
  },
  test: {
    coverage: {
      provider: 'istanbul',
      include: ['src'],
    },
    environment: 'jsdom',
  },
})
