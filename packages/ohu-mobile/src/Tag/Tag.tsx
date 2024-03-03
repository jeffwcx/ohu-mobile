import { VNodeData } from 'vue';
import { defineComponent, props } from '../_utils/defineComponent';
import { TagProps, TagSize, TagShape, TagEvents } from './types';
import Icon from '../Icon';
import { CloseOutlined } from '@ohu-mobile/icons';
import getComponentStyle from '../_utils/getComponentStyle';

export default defineComponent<TagProps, TagEvents>('tag').create({
  props: {
    text: props(String, Number).default(''),
    shape: props.ofType<TagShape>().default('square'),
    size: props.ofType<TagSize>().default('md'),
    color: props(String).default('grey'),
    fontColor: String,
    deleteable: props(Boolean).default(false),
    outline: props(Boolean).default(false),
    disabled: props(Boolean).default(false),
  },
  render() {
    const root = this.$rootCls();
    const {
      color,
      fontColor,
      size,
      shape,
      outline,
      deleteable,
      text,
      disabled,
      $slots,
    } = this;
    root.is([
      size,
      shape,
      outline ? 'outline' : 'solid',
      disabled && 'disabled',
    ]);
    const style = getComponentStyle(root, color, fontColor);
    const tagProps: VNodeData = {
      class: root,
      style,
    };
    if (deleteable) {
      tagProps.attrs = {
        role: 'button',
      };
      tagProps.on = {
        click: (e: Event) => {
          if (disabled) return;
          this.$emit('click', e);
        },
      };
    }
    return (
      <div {...tagProps}>
        <span class={root.element('text')}>{$slots.default || text}</span>
        {deleteable && <Icon type={CloseOutlined} />}
      </div>
    );
  },
});
