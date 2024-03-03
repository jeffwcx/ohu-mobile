import { VNodeData, CSSProperties } from 'vue';
import { defineComponent, props } from '../_utils/defineComponent';

const Divider = defineComponent('divider').create({
  props: {
    color: String,
    dashed: props(Boolean).default(false),
    text: String,
    vertical: props(Boolean).default(false),
  },
  render() {
    const { text, $slots, $attrs } = this;
    const textContent = text || $slots.default;

    const cls = this.$rootCls()
      .is(this.vertical ? 'vertical' : 'horizontal')
      .has(!!textContent && 'text');
    const dividerProps: VNodeData = {
      attrs: {
        ...$attrs,
        role: 'separator',
      },
      class: cls,
    };
    const style: CSSProperties = {};
    if (this.color) {
      style.borderColor = this.color;
    }
    if (this.dashed) {
      style.borderStyle = 'dashed';
    }
    dividerProps.style = style;
    return (
      <div {...dividerProps}>
        {textContent && <span class={cls.element('text')}>{textContent}</span>}
      </div>
    );
  },
});

export default Divider;
