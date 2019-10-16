import { componentFactory } from 'vue-tsx-support';
import props from 'vue-strict-prop';
import { prefix } from '../_utils/shared';
import './styles/index.scss';
import { getVNodesByName } from '../_utils/vnode';
import { cardHeaderBaseName } from './CardHeader';
import Divider from '../Divider';

const cardBaseName = `${prefix}card`;
const cardContentCls = `${cardBaseName}__content`;
const Card = componentFactory.create({
  name: cardBaseName,
  props: {
    shadow: props(Boolean).default(false),
    borderless: props(Boolean).default(false),
    divider: props(Boolean).default(false),
  },
  computed: {
    cls() {
      return {
        [cardBaseName]: true,
        'has-shadow': !this.borderless && this.shadow,
        'has-radius': !this.borderless,
      };
    },
  },
  render(h) {
    const { cls, $slots } = this;
    // detect card-header, extra other vnode as content
    if ($slots.default instanceof Array) {
      const headerNodes = getVNodesByName($slots.default, cardHeaderBaseName);
      if (headerNodes.length > 0) {
        const contentNodes = getVNodesByName($slots.default, (name) => {
          return name !== cardHeaderBaseName;
        });
        return (
          <div class={cls}>
            {headerNodes}
            <Divider></Divider>
            {
              contentNodes.length > 0
              &&
              <div class={cardContentCls}>
                { contentNodes }
              </div>
            }
          </div>
        );
      }
    }
    return (
      <div class={cls}>
        <div class={cardContentCls}>
          {$slots.default}
        </div>
      </div>
    );
  },
});

export default Card;
