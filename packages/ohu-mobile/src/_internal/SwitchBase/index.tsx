import { defineComponent, props } from '../../_utils/defineComponent';
import { IconProperty } from '../../types';
import { InputHTMLAttributes, SyntheticEvent } from 'vue-tsx-support/types/dom';
import { $checkboxActiveColor, $checkboxColor } from '../../_config/variables';
import {
  CheckboxIndeterminateFilled,
  CheckboxFilled,
  CheckboxBlankOutlined,
} from '@ohu-mobile/icons';
import { getIcon } from '../../_utils/icon-utils';
import { VNode } from 'vue/types/umd';

export interface SwitchBaseProps {
  name?: string;
  value?: any;
  defaultChecked?: boolean;
  checked?: boolean;
  disabled?: boolean;
  color?: string;
  unCheckedColor?: string;
  checkedIcon?: IconProperty | null;
  unCheckedIcon?: IconProperty | null;
  indeterminate?: boolean;
  indeterminateIcon?: IconProperty | null;
  labelClickable?: boolean;
  attach?: any;
}

export const switchBaseProps = {
  name: String,
  value: props.ofType<any>().optional,
  defaultChecked: props(Boolean).default(false),
  checked: props(Boolean).optional,
  disabled: props(Boolean).optional,
  labelClickable: props(Boolean).default(true),
  color: props(String).default($checkboxActiveColor),
  unCheckedColor: props(String).default($checkboxColor),
  checkedIcon: props
    .ofType<IconProperty | null>()
    .default(() => CheckboxFilled),
  unCheckedIcon: props
    .ofType<IconProperty | null>()
    .default(() => CheckboxBlankOutlined),
  indeterminate: props(Boolean).default(false),
  indeterminateIcon: props
    .ofType<IconProperty | null>()
    .default(() => CheckboxIndeterminateFilled),
  attach: props.ofAny().optional,
} as const;

export const switchBaseOutsideProps = {
  baseName: props(String).default(''),
  role: props.ofStringLiterals('radio', 'checkbox').default('checkbox'),
  ...switchBaseProps,
} as const;

export interface SwitchBaseOutsideProps extends SwitchBaseProps {
  baseName?: string;
  role?: 'radio' | 'checkbox';
}

export interface SwitchBaseScopedSlots {
  label?: {
    checked?: boolean;
    indeterminate: boolean;
    focus: boolean;
    disabled?: boolean;
  };
}

export interface SwitchBaseEvents {
  onBlur: SyntheticEvent<InputHTMLAttributes, FocusEvent>;
  onFocus: SyntheticEvent<InputHTMLAttributes, FocusEvent>;
  onChange: boolean;
}

export interface SwitchInnerProps {
  isFocused: boolean;
  tabIndex: number;
  handleInputChange: (e: SyntheticEvent<InputHTMLAttributes, Event>) => void;
  handleBlur: (e: Event) => void;
  handleFocus: (e: Event) => void;
}

type Props = SwitchBaseOutsideProps;
type Events = SwitchBaseEvents;
type ScopedSlots = SwitchBaseScopedSlots;
type InnerProps = SwitchInnerProps;

export default defineComponent<Props, Events, ScopedSlots, InnerProps>(
  'switch-base',
).create({
  props: switchBaseOutsideProps,
  computed: {
    tabIndex() {
      if (this.disabled) {
        return -1;
      }
      return 0;
    },
  },
  data() {
    return {
      isFocused: false,
    };
  },
  methods: {
    handleInputChange(e: SyntheticEvent<InputHTMLAttributes, Event>) {
      if (e.target.checked !== undefined) {
        this.$emit('change', e.target.checked, e);
      }
    },
    handleBlur(e: SyntheticEvent<InputHTMLAttributes, FocusEvent>) {
      this.isFocused = false;
      this.$emit('blur', e);
    },
    handleFocus(e: SyntheticEvent<InputHTMLAttributes, FocusEvent>) {
      this.isFocused = true;
      this.$emit('focus', e);
    },
  },
  render(h) {
    const {
      $slots,
      $scopedSlots,
      baseName,
      checked,
      value,
      name,
      role,
      disabled,
      labelClickable,
      indeterminate,
      indeterminateIcon,
      checkedIcon,
      unCheckedIcon,
      color,
      unCheckedColor,
    } = this;
    const root = this.$bem.block(baseName);
    root.is([this.isFocused && 'focus']);
    const wrapper = root.block('wrapper');
    wrapper.is([checked && 'checked', disabled === true && 'disabled']);
    let iconNode: VNode | undefined = h('i');
    const iconType = indeterminate
      ? indeterminateIcon
      : checked
        ? checkedIcon
        : unCheckedIcon;
    if (iconType) {
      iconNode = getIcon(h, iconType, {
        color: indeterminate || checked ? color : unCheckedColor,
      });
    }
    const input = (
      <span class={root}>
        <input
          type={role}
          aria-checked={checked}
          name={name}
          value={value}
          checked={checked}
          disabled={disabled}
          data-indeterminate={indeterminate}
          onChange={this.handleInputChange}
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
        />
        {iconNode}
      </span>
    );
    let label = $scopedSlots.label
      ? $scopedSlots.label({
          checked,
          indeterminate,
          disabled,
          focus: this.isFocused,
        })
      : $slots.default && (
          <span class={root.element('label')}>{$slots.default}</span>
        );
    return h(
      !labelClickable ? 'div' : 'label',
      {
        class: wrapper,
        attrs: { tabindex: this.tabIndex },
      },
      [input, label],
    );
  },
});
