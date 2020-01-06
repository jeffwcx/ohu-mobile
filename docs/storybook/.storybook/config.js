import { configure, addParameters } from '@storybook/vue';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import ohuTheme from './ohu-theme';
import readme from '../README.md';

const order = [
  /.*components.*/ig,
  /.*overview.*/ig,
  /.*others.*/ig];

addParameters({
  options: {
    panelPosition: 'right',
    theme: ohuTheme,
    storySort: (a, b) => {
      const aid = a[1].id;
      const bid = b[1].id;
      const aIndex = order.findIndex((item) => {
        return !!aid.match(item);
      });
      const bIndex = order.findIndex((item) => {
        return!!bid.match(item)
      });
      if (aIndex === bIndex) {
        return aid.localeCompare(bid);
      }
      return bIndex - aIndex;
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
