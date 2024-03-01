import type { CustomPlugin } from 'svgo';
import { transformToCamelCase } from '../utils';

export default {
  name: 'jsx',
  type: 'perItem',
  fn: () => {
    return {
      element: {
        enter: (node) => {
          const attrs = node.attributes;
          Object.keys(attrs).forEach(name => {
            const value = attrs[name];
            if (name === 'xlink:href') {
              delete attrs[name];
              attrs['xlinkHref'] = value;
              return;
            }
            const modifiedName = transformToCamelCase(name, false);
            if (modifiedName === name) return;
            delete attrs[name];
            attrs[modifiedName] = value;
          });
        },
      },
    };
  },
} as CustomPlugin;


