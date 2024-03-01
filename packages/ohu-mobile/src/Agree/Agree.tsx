import { AgreeProps, AgreeEvents } from './types';
import { defineComponent, props } from '../_utils/defineComponent';
import SwitchBase, { type SwitchBaseProps } from '../_internal/SwitchBase';
import { $checkboxActiveColor, $checkboxColor } from '../_config/variables';
import {
  CheckboxCircleFilled,
  CheckboxBlankCircleOutlined,
} from '@ohu-mobile/icons';
import { IconProperty } from '../types';
import { fieldMixin } from '../Form/fieldMixin';
import { VNodeData } from 'vue';

export default defineComponent<AgreeProps, AgreeEvents>('agree')
  .mixin(fieldMixin('checkedValue', 'checked'))
  .create({
    model: {
      prop: 'checked',
      event: 'change',
    },
    props: {
      name: String,
      checked: props(Boolean).optional,
      disabled: props(Boolean).default(false),
      color: props(String).default($checkboxActiveColor),
      unCheckedColor: props(String).default($checkboxColor),
      checkedIcon: props
        .ofType<IconProperty | null>()
        .default(() => CheckboxCircleFilled),
      unCheckedIcon: props
        .ofType<IconProperty | null>()
        .default(() => CheckboxBlankCircleOutlined),
    },
    watch: {
      checked(cur) {
        this.checkedValue = cur;
      },
    },
    methods: {
      handleChange(checked: boolean) {
        if (this.disabled) return;
        this.checkedValue = checked;
        this.$emit('change', checked);
      },
    },
    render() {
      const switchBaseProps: VNodeData = {
        props: {
          baseName: 'agree',
          role: 'checkbox',
          name: this.name,
          checked: this.checkedValue,
          labelClickable: false,
          disabled: this.disabled,
          color: this.color,
          unCheckedColor: this.unCheckedColor,
          unCheckedIcon: this.unCheckedIcon,
          checkedIcon: this.checkedIcon,
        } as SwitchBaseProps,
        on: {
          ...this.$listeners,
          change: this.handleChange,
          blur: (e: Event) => {
            this.$emit('blur', e);
          },
        },
      };
      return (
        // @ts-ignore
        <SwitchBase {...switchBaseProps}>{this.$slots.default}</SwitchBase>
      );
    },
  });
