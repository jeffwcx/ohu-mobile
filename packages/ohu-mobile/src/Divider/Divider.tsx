import { componentFactory } from 'vue-tsx-support';
import props from 'vue-strict-prop';
import { VNodeData } from 'vue';
import { $prefix } from '../_config/variables';

const dividerBaseName = `${$prefix}divider`;
const dividerTextCls = `${dividerBaseName}__text`;
const Divider = componentFactory.create({
  name: dividerBaseName,
  props: {
    color: String,
    dashed: props(Boolean).default(false),
    text: String,
    vertical: props(Boolean).default(false),
  },
  render() {
    const {
      text,
      $slots,
      $attrs,
    } = this;
    const textContent = text || $slots.default;
    const cls = {
      [dividerBaseName]: true,
      'is-vertical': this.vertical,
      'is-horizontal': !this.vertical,
      'has-text': !!textContent,
    };
    const dividerProps: VNodeData = {
      attrs: {
        ...$attrs,
        role: 'separator'
      },
      class: cls,
    };
    const style: Partial<CSSStyleDeclaration> = {};
    if (this.color) {
      style.borderColor = this.color;
    }
    if (this.dashed) {
      style.borderStyle = 'dashed';
    }
    dividerProps.style = style;
    return (
      <div {...dividerProps}>
        { textContent && <span class={dividerTextCls}>{textContent}</span> }
      </div>
    );
  },
});

export default Divider;
