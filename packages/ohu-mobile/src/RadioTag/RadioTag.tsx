import { defineComponent, props } from '../_utils/defineComponent';
import { RadioTagProps, RadiopTagEvents } from './types';
import Tag, { TagSize } from '../Tag';
import { VNodeData } from 'vue/types/umd';
import { RadioProps } from '../Radio/types';
import Radio from '../Radio';


export default defineComponent<RadioTagProps, RadiopTagEvents>('radio-tag').create({
  props: {
    name: String,
    value: props.ofType<any>().optional,
    tabIndex: props(Number).optional,
    defaultChecked: props(Boolean).default(false),
    checked: props(Boolean).optional,
    disabled: props(Boolean).default(false),
    tagSize: props.ofType<TagSize>().default('lg'),
  },
  render() {
    const { $slots } = this;
    const root = this.root();
    const checkboxProps: RadioProps = {
      ...this.$props,
      unCheckedIcon: null,
      checkedIcon: null,
      labelClickable: true,
    };
    const vnodeData: VNodeData = {
      class: root.block('wrapper'),
      props: checkboxProps,
      on: this.$listeners,
      attrs: this.$attrs,
      scopedSlots: {
        label: ({ checked, disabled }) => {
          return (
            <Tag disabled={disabled}
              size={this.tagSize}
              color={checked ? 'primary' : 'grey'}
              outline={!checked}>
              {$slots.default}
            </Tag>
          );
        },
      }
    };
    return <Radio {...vnodeData}></Radio>
  },
});
