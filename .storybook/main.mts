import { mergeConfig } from 'vite';
import type { StorybookConfig } from '@storybook/vue-vite';
import * as sass from 'sass';
import path from 'node:path';
import Vue from '@vitejs/plugin-vue2';
import VueJsx from '@vitejs/plugin-vue2-jsx';

const ohuMobileCorePkgPath = path.resolve(__dirname, '../packages/ohu-mobile');

const config: StorybookConfig = {
  stories: [
    "../packages/**/*.mdx",
    "../packages/**/*.stories.@(ts|tsx)",
  ],
  addons: [
    '@storybook/addon-storysource',
    "@storybook/addon-viewport",
  ],
  core: {
    builder: "@storybook/builder-vite",
  },
  framework: '@storybook/vue-vite',
  async viteFinal(config) {
    // Merge custom configuration into the default config
    return mergeConfig(config, {
      // Add dependencies to pre-optimization
      optimizeDeps: {
        include: ['storybook-dark-mode'],
      },
      plugins: [
        // @ts-ignore
        Vue(),
        // @ts-ignore
        VueJsx(),
      ],
      css: {
        postcss: {
          plugins: [
            require('postcss-pxtorem')({
              rootValue: 75,
              propList: ['*', '!border'],
              selectorBlackList: [/^(html|body|\.sb\-.*)/, 'markdown-body', 'theme-blue']
            }),
          ],
        },
        preprocessorOptions: {
          scss: {
            pkgImporter: new sass.NodePackageImporter(ohuMobileCorePkgPath),
          },
        },
      },

    });
  },
  docs: {
    autodocs: "tag",
  },
};
export default config;
