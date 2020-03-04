import { getVNodesByName } from '../_utils/vnode';
import { cardHeaderBaseName } from './CardHeader';
import Divider from '../Divider';
import { CardProps } from './types';
import { defineComponent, props } from '../_utils/defineComponent';

const Card = defineComponent<CardProps>('card').create({
  props: {
    shadow: props(Boolean).default(false),
    borderless: props(Boolean).default(false),
    divider: props(Boolean).default(false),
    padding: props(Boolean).default(true),
  },
  render() {
    const root= this.root();
    const { $slots, divider } = this;
    root.has([
      (!this.borderless && this.shadow) && 'shadow',
      !this.borderless && 'radius',
      this.padding && 'padding',
    ]);
    // detect card-header, extra other vnode as content
    if ($slots.default instanceof Array) {
      const headerNodes = getVNodesByName($slots.default, cardHeaderBaseName);
      if (headerNodes.length > 0) {
        const contentNodes = getVNodesByName($slots.default, (name) => {
          return name !== cardHeaderBaseName;
        });
        return (
          <div class={root}>
            {headerNodes}
            { divider && <Divider></Divider> }
            {
              contentNodes.length > 0
              &&
              <div class={root.element('content')}>
                { contentNodes }
              </div>
            }
          </div>
        );
      }
    }
    return (
      <div class={root}>
        <div class={root.element('content')}>
          {$slots.default}
        </div>
      </div>
    );
  },
});

export default Card;
