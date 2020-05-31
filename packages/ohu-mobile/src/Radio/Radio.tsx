import { CheckboxCircleFilled, CheckboxBlankCircleOutlined } from '@ohu-mobile/icons';
import { defineDescendantComponent, props } from '../_utils/defineComponent';
import SwitchBase, { SwitchBaseOutsideProps } from '../_internal/SwitchBase';
import { $radioActiveColor, $radioColor } from '../_config/variables';
import { IconProperty } from '../types';
import { RadioProps, RadioEvents, RadioScopedSlots } from './types';
import RadioGroup from '../RadioGroup';
import { fieldMixin } from '../Form/fieldMixin';

interface RadioMethods {
  check: () => void;
  uncheck: () => void;
}

export default defineDescendantComponent<InstanceType<typeof RadioGroup>, RadioProps, RadioEvents, RadioScopedSlots, RadioMethods>(
  'radio-group',
  'radio'
).mixin(fieldMixin('checkedValue', 'checked', true)).create({
  model: {
    prop: 'checked',
    event: 'change',
  },
  props: {
    name: String,
    value: props.ofType<any>().optional,
    defaultChecked: props(Boolean).default(false),
    checked: props(Boolean).optional,
    disabled: props(Boolean).optional,
    labelClickable: props(Boolean).default(true),
    color: props(String).default($radioActiveColor),
    unCheckedColor: props(String).default($radioColor),
    checkedIcon: props.ofType<IconProperty | null>().default(() => CheckboxCircleFilled),
    unCheckedIcon: props.ofType<IconProperty | null>().default(() => CheckboxBlankCircleOutlined),
    attach: props.ofAny().optional,
  },
  watch: {
    checked(cur) {
      if (!this.ancestor) {
        this.checkedValue = cur;
      }
    },
  },
  data() {
    return {
      checkedValue: this.ancestor
        ? this.ancestor.isChildChecked(this.value)
        : this.initFieldValue(this.checked),
    };
  },
  computed: {
    internalDisabled() {
      if (this.ancestor && this.ancestor.disabled !== undefined) {
        return this.ancestor.disabled;
      }
      if (this.$props.disabled !== undefined) return this.$props.disabled;
      return false;
    },
  },
  methods: {
    check() {
      this.handleChange(true);
    },
    uncheck() {
      this.handleChange(false);
    },
    getChecked() {
      return this.ancestor ? this.ancestor.isChildChecked(this.value) : this.checkedValue;
    },
    handleChange(checked: boolean) {
      if (this.internalDisabled) return;
      if (this.ancestor) {
        const success = this.ancestor.childrenChange(this.value, checked, this.attach);
        if (success) {
          this.checkedValue = checked;
        }
      } else {
        this.checkedValue = checked;
      }
      this.$emit('change', checked, this.attach);
    },
  },
  render() {
    const {
      internalDisabled,
      ancestor,
      $scopedSlots,
    } = this;
    const {
      checked,
      disabled,
      name,
      color,
      unCheckedColor,
      checkedIcon,
      unCheckedIcon,
      ...radioProps
    } = this.$props;
    const props: SwitchBaseOutsideProps = {
      baseName: 'radio',
      role: 'radio',
      checked: this.getChecked(),
      disabled: internalDisabled,
      name: ancestor?.name || name,
      color: ancestor?.color || color,
      unCheckedColor: ancestor?.unCheckedColor || unCheckedColor,
      checkedIcon: ancestor?.checkedIcon !== undefined ? ancestor?.checkedIcon : checkedIcon,
      unCheckedIcon: ancestor?.unCheckedIcon !== undefined ? ancestor?.unCheckedIcon : unCheckedIcon,
      ...radioProps,
    };
    return (
      <SwitchBase {...{
        class: ancestor && 'is-group-item',
        props,
        on: {
          ...this.$listeners,
          change: this.handleChange,
          blur: (e: Event) => {
            this.$emit('blur', e);
          },
        },
        scopedSlots: $scopedSlots,
      }}>
        {this.$slots.default}
      </SwitchBase>
    );
  },
});
