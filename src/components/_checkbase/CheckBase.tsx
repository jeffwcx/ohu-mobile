import { ofType, component } from 'vue-tsx-support';
import props from 'vue-strict-prop';
import vars from '../_styles/variables';
import { InputHTMLAttributes, SyntheticEvent } from 'vue-tsx-support/types/dom';
import { IconProperty, SVGIconDef } from '@/global';
import { VNode, CreateElement, PropOptions } from 'vue';

export interface CommonGroupProps {
  disabled: boolean;
  name?: string;
  color?: string;
  unCheckedColor?: string;
  checkedIcon?: IconProperty;
  unCheckedIcon?: IconProperty | null;
  indeterminateIcon?: IconProperty;
}

export interface CommmonGroupMethods {
  childrenChange: (value: any, checked: boolean) => void;
  isChildChecked: (value: any) => boolean;
}

export type CommonGroup = CommonGroupProps & CommmonGroupMethods;

export interface CheckBaseEvents {
  onChange: boolean;
}

export interface CheckBaseOptions {
  baseName: string;
  role: 'radio' | 'checkbox';
  addProps?: Record<string, PropOptions<any>>;
  wrapperCls: string;
  labelCls: string;
  defaultCheckedIcon: SVGIconDef;
  defaultUnCheckedIcon: SVGIconDef;
  labelClickable?: boolean;
  icon: (h: CreateElement, checked: boolean, props: {
    indeterminate?: boolean;
    indeterminateIcon?: IconProperty;
    checkedIcon: IconProperty;
    unCheckedIcon: IconProperty;
    color: string;
    unCheckedColor: string;
  }) => VNode | undefined;
}

export interface CheckBaseProps {
  name?: string;
  value?: any;
  defaultChecked?: boolean;
  checked?: boolean;
  disabled?: boolean;
  color?: string;
  unCheckedColor?: string;
  checkedIcon?: IconProperty;
  unCheckedIcon?: IconProperty | null;
}

export default function<
  Props extends CheckBaseProps,
  Events extends CheckBaseEvents = CheckBaseEvents>(
  {
    baseName,
    role,
    addProps,
    wrapperCls,
    labelCls,
    icon,
    defaultCheckedIcon,
    defaultUnCheckedIcon,
    labelClickable,
  }: CheckBaseOptions
) {
  const componentProps = {
    name: String,
    value: props.ofType<any>().optional,
    defaultChecked: props(Boolean).default(false),
    checked: props(Boolean).optional,
    disabled: props(Boolean).default(false),
    color: props(String).default(vars.colorPrimary),
    unCheckedColor: props(String).default(vars.colorTextDisabled),
    checkedIcon: props.ofType<IconProperty>().default(() => defaultCheckedIcon),
    unCheckedIcon: props.ofType<IconProperty | null>().default(() => defaultUnCheckedIcon),
    ...addProps,
  };
  return ofType<Props, Events>().convert(component({
    name: baseName,
    props: componentProps,
    inject: {
      parent: {
        from: role === 'checkbox' ? 'checkboxGroup' : 'radioGroup',
        default: null,
      },
    },
    watch: {
      checked(nv) {
        this.changedValue = nv;
      },
    },
    data() {
      const instance = this as any;
      const currentParent = instance.parent as CommonGroup;
      return {
        changedValue: this.checked,
        currentParent,
      } as {
        changedValue?: boolean,
        currentParent: CommonGroup,
      };
    },
    computed: {
      disabledState() {
        const instance = this as any;
        return instance.getCurrentDisabledState(instance.parent);
      },
      checkedState() {
        const instance = this as any;
        return instance.getCurrentCheckedState(instance.parent);
      },
      // Todo, totally because fucking ts supporting of vue2.
      commonProps() {
        const instance = this as any;
        const currentParent = instance.currentParent;
        return {
          color: currentParent.color || instance.color,
          unCheckedColor: currentParent.unCheckedColor || instance.unCheckedColor,
          checkedIcon: currentParent.checkedIcon || instance.checkedIcon,
          unCheckedIcon: currentParent.unCheckedIcon !== undefined ? currentParent.unCheckedIcon : instance.unCheckedIcon,
          indeterminateIcon: currentParent.indeterminateIcon || instance.indeterminateIcon,
          indeterminate: instance.indeterminate,
        };
      },
    },
    model: {
      prop: 'checked',
      event: 'change',
    },
    methods: {
      toggle() {
        this.createChange(!this.checkedState);
      },
      check() {
        this.createChange(true);
      },
      uncheck() {
        this.createChange(false);
      },
      getCurrentDisabledState(currentParent: CommonGroup) {
        return (currentParent && currentParent.disabled !== undefined)
          ? currentParent.disabled
          : this.disabled;
      },
      getCurrentCheckedState(currentParernt: CommonGroup) {
        return currentParernt
          ? currentParernt.isChildChecked(this.value)
          : (this.checked === undefined
            ? this.defaultChecked
            : this.changedValue);
      },
      createChange(checked: boolean) {
        this.changedValue = checked;
        this.currentParent && this.currentParent.childrenChange(this.value, checked);
        this.$emit('change', checked);
      },
      handleCheckBaseChange(e: SyntheticEvent<InputHTMLAttributes, Event>) {
        if (e.target.checked !== undefined) {
          this.createChange(e.target.checked);
        }
      },
      handleCheckBaseInput(e: Event) {
        this.$emit('input', e);
      },
    },
    render() {
      const { $slots, $props, name, disabledState, value, currentParent } = this;
      const checked = this.checkedState;
      const cls = {
        [wrapperCls]: true,
        'is-checked': checked,
        'is-disabled': disabledState,
        'is-group-item': currentParent !== null,
      };
      const inputName = (currentParent && currentParent.name) || name;
      const iconNode = icon(this.$createElement, checked, this.commonProps);
      const input = (
        <span class={baseName}>
          <input type={role}
            onInput={this.handleCheckBaseInput}
            name={inputName}
            value={value}
            checked={checked}
            disabled={disabledState}
            onChange={this.handleCheckBaseChange}
            data-indeterminate={$props.indeterminate} />
          {iconNode}
        </span>
      );
      const label = $slots.default && <span class={labelCls}>{$slots.default}</span>;
      if (labelClickable === false) {
        return (
          <div class={cls} tabindex={0}>
            {input}
            {label}
          </div>
        );
      }
      return (
        <label class={cls} tabindex={0}>
          {input}
          {label}
        </label>
      );
    },
  }));
};
