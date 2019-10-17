import { configure, addParameters } from '@storybook/vue';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import ohuTheme from './ohu-theme';
import readme from '../README.md';

addParameters({
  options: {
    panelPosition: 'right',
    theme: ohuTheme,
    storySort: (a, b) => {
      return a[1].id.localeCompare(b[1].id)
    },
  },
  viewport: {
    viewports: INITIAL_VIEWPORTS,
    defaultViewport: 'iphonex',
  },
  notes: { markdown: readme },
});

// automatically import all files ending in *.stories.js
configure(require.context('../src', true, /\.stories\.(js|mdx|tsx|ts)$/), module);
