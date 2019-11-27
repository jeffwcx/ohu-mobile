import { ofType, component } from 'vue-tsx-support';
import props from 'vue-strict-prop';
import vars from '../_styles/variables';
import { InputHTMLAttributes, SyntheticEvent } from 'vue-tsx-support/types/dom';
import { IconProperty, SVGIconDef } from '@/global';
import { VNode, CreateElement, PropOptions } from 'vue';
import RadioGroup from '../RadioGroup';


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
  unCheckedIcon?: IconProperty;
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
    unCheckedIcon: props.ofType<IconProperty>().default(() => defaultUnCheckedIcon),
    ...addProps,
  };
  return ofType<Props, Events>().convert(component({
    name: baseName,
    props: componentProps,
    inject: {
      parent: {
        from: role === 'checkbox' ? 'checkBoxGroup' : 'radioGroup',
        default: null,
      },
    },
    computed: {
      checkedState() {
        const instance = this as any;
        return instance.getCurrentCheckedState(instance.parent);
      },
    },
    data() {
      const instance = this as any;
      return {
        changedValue: undefined,
        currentParent: instance.parent,
      } as {
        changedValue?: boolean,
        currentParent: InstanceType<typeof RadioGroup>,
      };
    },
    model: {
      prop: 'checked',
      event: 'change',
    },
    methods: {
      getCurrentCheckedState(currentParernt: InstanceType<typeof RadioGroup>) {
        // What am i doing?
        return currentParernt
          ? currentParernt.valueState === this.value
          : (this.checked === undefined
            ? this.defaultChecked
            : (this.changedValue !== undefined
              ? this.changedValue
              :  this.checked));
      },
      handleCheckBaseChange(e: SyntheticEvent<InputHTMLAttributes, Event>) {
        if (e.target.checked !== undefined) {
          this.changedValue = e.target.checked;
          this.currentParent && this.currentParent.childrenChange(this.value);
          this.$emit('change', e.target.checked, e);
        }
      },
      handleCheckBaseInput(e: Event) {
        this.$emit('input', e);
      },
    },
    render() {
      const { $slots, $props, name, disabled, value, currentParent } = this;
      const checked = this.checkedState;
      const cls = {
        [wrapperCls]: true,
        'is-checked': checked,
        'is-disabled': disabled,
        'is-group-item': currentParent !== null,
      };
      const inputName = (currentParent && currentParent.name) || name;
      const iconNode = icon(this.$createElement, checked, $props as any);
      return (
        <label class={cls} tabindex={0}>
          <span class={baseName}>
            <input type={role}
              onInput={this.handleCheckBaseInput}
              name={inputName}
              value={value}
              checked={checked}
              disabled={disabled}
              onChange={this.handleCheckBaseChange}
              data-indeterminate={$props.indeterminate} />
            {iconNode}
          </span>
          {
            $slots.default &&
            <span class={labelCls}>{$slots.default}</span>
          }
        </label>
      );
    },
  }));
};
