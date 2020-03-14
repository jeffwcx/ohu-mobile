
import { AgreeProps, AgreeEvents } from './types';
import { defineComponent, props } from '../_utils/defineComponent';
import SwitchBase, { SwitchBaseOutsideProps } from '../_internal/SwitchBase';
import { $checkboxActiveColor, $checkboxColor } from '../_config/variables';
import { CheckboxCircleFilled, CheckboxBlankCircleOutlined } from '@ohu-mobile/icons';
import { IconProperty } from '../types';
import { fieldMixin } from '../Form/fieldMixin';


export default defineComponent<AgreeProps, AgreeEvents>('agree')
  .mixin(fieldMixin)
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
      checkedIcon: props.ofType<IconProperty | null>().default(() => CheckboxCircleFilled),
      unCheckedIcon: props.ofType<IconProperty | null>().default(() => CheckboxBlankCircleOutlined),
    },
    watch: {
      checked(cur) {
        this.checkedValue = cur;
      },
    },
    data() {
      return {
        checkedValue: this.getFieldValue(this.checked),
      };
    },
    methods: {
      handleChange(checked: boolean) {
        if (this.disabled) return;
        this.checkedValue = checked;
        this.$emit('change', checked);
      },
      resetFieldValue(value: any) {
        this.checkedValue = value;
      },
    },
    render() {
      const props: SwitchBaseOutsideProps = {
        baseName: 'agree',
        name: this.name,
        role: 'checkbox',
        checked: this.checkedValue,
        labelClickable: false,
        disabled: this.disabled,
        color: this.color,
        unCheckedColor: this.unCheckedColor,
        unCheckedIcon: this.unCheckedIcon,
        checkedIcon: this.checkedIcon,
      };
      return (
        <SwitchBase {...{
          props,
          on: {
            ...this.$listeners,
            change: this.handleChange,
            blur: (e: Event) => {
              this.$emit('blur', e);
            },
          },
        }}>
          {this.$slots.default}
        </SwitchBase>
      );
    },
  });
