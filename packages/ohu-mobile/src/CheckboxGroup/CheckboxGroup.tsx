import { componentFactoryOf } from 'vue-tsx-support';
import props from 'vue-strict-prop';
import { prefix } from '../_utils/shared';
import Checkbox from '../Checkbox';
import ancestorMixin from '../_utils/ancestorMixin';
import { CheckboxGroupEvents, CheckboxOption, CheckboxGroupScopedSlots } from './types';

export const checkboxGroupProps = {
  name: props(String).optional,
  value: props.ofArray().default(() => []),
  disabled: props.ofType<Boolean | undefined>().default(undefined),
  options: props.ofArray<CheckboxOption | string>().optional,
  max: props(Number).default(Infinity),
};

const baseCheckboxGroupName = `${prefix}checkbox-group`;

export default componentFactoryOf<CheckboxGroupEvents, CheckboxGroupScopedSlots>().mixin(
  ancestorMixin('checkboxGroup')
).create({
  name: baseCheckboxGroupName,
  model: {
    prop: 'value',
    event: 'change',
  },
  props: checkboxGroupProps,
  watch: {
    value(nv) {
      this.result = nv;
    },
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
    renderOptions(options: (CheckboxOption | string)[]) {
      return options.map(option => {
        if (typeof option === 'string') {
          return <Checkbox value={option}>{option}</Checkbox>
        }
        const {
          attach,
          label,
          ...props
        } = option;
        return <Checkbox {...{ props }}>{label}</Checkbox>
      });
    },
  },
  render() {
    const { $slots, $scopedSlots, options } = this;
    const content = options
      ? (
        $scopedSlots.renderOption
          ? options.map(option => {
            if ($scopedSlots.renderOption) {
              return $scopedSlots.renderOption(option);
            }
          })
          : this.renderOptions(options)
      )
      : $slots.default;
    return (
      <div class={baseCheckboxGroupName} role="checkboxgroup">
        {content}
      </div>
    );
  },
});