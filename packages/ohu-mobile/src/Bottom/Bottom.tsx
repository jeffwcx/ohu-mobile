import { defineComponent, props } from '../_utils/defineComponent';
import { BottomProps } from './types';
import { $prefix } from '../_config/variables';
import Divider from '../Divider';

const Bottom = defineComponent<BottomProps>('bottom').create({
  props: {
    visible: props(Boolean).default(true),
    tag: props(String).default('div'),
    divider: props(Boolean).default(false),
    animation: props(String).default('slide-down'),
  },
  render(h) {
    const { $slots, tag, visible, animation, divider } = this;
    return (
      <transition name={`${$prefix}${animation}`}>
        {h(
          tag,
          {
            class: this.$rootCls(),
            directives: [{ name: 'show', value: visible }],
          },
          [divider && <Divider />, $slots.default],
        )}
      </transition>
    );
  },
});

export default Bottom;
