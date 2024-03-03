import { INITIAL_VIEWPORTS, MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';


const preview = {
  parameters: {
    actions: {
      disable: true,
    },
    controls: {
      disable: true,
    },
    viewport: {
      viewports: {
        ...INITIAL_VIEWPORTS,
        ...MINIMAL_VIEWPORTS,
      },
      defaultViewport: 'iphone14pro',
    },
    options: {
      storySort: (a, b) => {
        const order = [
          /.*components.*/ig,
          /.*overview.*/ig,
          /.*others.*/ig,
        ];
        const aid = a.id;
        const bid = b.id;
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
  },
};

export default preview;
