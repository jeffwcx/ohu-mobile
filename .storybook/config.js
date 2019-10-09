import { configure, addParameters } from '@storybook/vue';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import ohuTheme from './ohu-theme';

addParameters({
  options: {
    theme: ohuTheme,
    storySort: (a, b) => {
      return a[1].id.localeCompare(b[1].id)
    },
  },
  viewport: {
    viewports: INITIAL_VIEWPORTS,
    defaultViewport: 'iphonex',
  },
});

// automatically import all files ending in *.stories.js
configure(require.context('../src', true, /\.stories\.(js|mdx|tsx|ts)$/), module);
