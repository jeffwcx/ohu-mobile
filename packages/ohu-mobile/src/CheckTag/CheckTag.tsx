import { defineComponent, props } from '../_utils/defineComponent';
import { CheckTagProps, CheckTagEvents } from './types';
import Checkbox, { CheckboxProps } from '../Checkbox';
import Tag, { TagSize } from '../Tag';
import { VNodeData } from 'vue/types/umd';

export default defineComponent<CheckTagProps, CheckTagEvents>(
  'check-tag',
).create({
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
    const root = this.$rootCls();
    const checkboxProps: CheckboxProps = {
      ...this.$props,
      unCheckedIcon: null,
      checkedIcon: null,
      indeterminateIcon: null,
      labelClickable: true,
    };
    const vnodeData: VNodeData = {
      class: root.block('wrapper'),
      props: checkboxProps,
      on: this.$listeners,
      attrs: this.$attrs,
    };
    return (
      <Checkbox
        {...vnodeData}
        scopedSlots={{
          label: ({ checked, disabled }) => {
            return (
              <Tag
                disabled={disabled}
                size={this.tagSize}
                color={checked ? 'primary' : 'grey'}
                outline={!checked}
              >
                {$slots.default}
              </Tag>
            );
          },
        }}
      ></Checkbox>
    );
  },
});
