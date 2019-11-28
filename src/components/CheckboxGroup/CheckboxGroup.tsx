import { componentFactoryOf } from 'vue-tsx-support';
import props from 'vue-strict-prop';
import { prefix } from '../_utils/shared';
import checkGroupMixin from '../_checkbase/checkGroupMixin';
import { CheckboxProps } from '../Checkbox/types';
import Checkbox from '../Checkbox';

const baseCheckboxGroupName = `${prefix}checkbox-group`;

export interface CheckboxGroupEvents {
  onChange: any;
}

export type CheckboxOption = (CheckboxProps & { label?: string }) | string;

export default componentFactoryOf<CheckboxGroupEvents>().mixin(
  checkGroupMixin('checkboxGroup')
).create({
  name: baseCheckboxGroupName,
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    name: props(String).optional,
    value: props.ofArray().default(() => []),
    disabled: props(Boolean).default(false),
    options: props.ofArray<CheckboxOption>().optional,
    max: props(Number).default(Infinity),
  },
  data() {
    return {
      result: this.value,
    } as {
      result: any[];
    };
  },
  methods: {
    childrenChange(value: any, checked: boolean) {
      const valueIndex = this.result.indexOf(value);
      if (checked && valueIndex < 0) {
        if (this.result.length >= this.max) return;
        this.result.push(value);
      }
      if (!checked && valueIndex >= 0) {
        this.result.splice(valueIndex, 1);
      }
      this.$emit('change', this.result);
    },
    isChildChecked(value: any) {
      return this.result.indexOf(value) >= 0;
    },
    renderOptions(options: CheckboxOption[]) {
      return options.map(option => {
        if (typeof option === 'string') {
          return <Checkbox value={option}>{option}</Checkbox>
        }
        return <Checkbox {...{ props: option }}>{option.label}</Checkbox>
      });
    },
  },
  render() {
    const { $slots, options } = this;
    const content = options ? this.renderOptions(options) : $slots.default;
    return (
      <div class={baseCheckboxGroupName} role="checkboxgroup">
        {content}
      </div>
    );
  },
});
