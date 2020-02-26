import { componentFactoryOf } from 'vue-tsx-support';
import Checkbox from '../Checkbox';
import ancestorMixin from '../_utils/ancestorMixin';
import { CheckboxGroupEvents, CheckboxOption, CheckboxGroupScopedSlots } from './types';
import { $prefix } from '../_config/variables';
import checkBoxGroupProps from './props';


const baseCheckboxGroupName = `${$prefix}checkbox-group`;

export default componentFactoryOf<CheckboxGroupEvents, CheckboxGroupScopedSlots>().mixin(
  ancestorMixin('checkboxGroup')
).create({
  name: baseCheckboxGroupName,
  model: {
    prop: 'value',
    event: 'change',
  },
  props: checkBoxGroupProps,
  watch: {
    value(nv) {
      this.result = [...nv];
    },
  },
  data() {
    return {
      result: [...this.value],
    } as {
      result: any[];
    };
  },
  methods: {
    selectOptions() {
      if (!this.options) return [];
      return this.options.filter(option => {
        let value = typeof option === 'string' ? option : option.value;
        return this.result.indexOf(value) >= 0;
      });
    },
    childrenChange(value: any, checked: boolean) {
      const valueIndex = this.result.indexOf(value);
      if (checked && valueIndex < 0) {
        if (this.result.length >= this.max) return;
        this.result.push(value);
      }
      if (!checked && valueIndex >= 0) {
        this.result.splice(valueIndex, 1);
      }
      this.$emit('change', this.result, this.selectOptions());
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
    const content = options && !$slots.default
      ? (
        $scopedSlots.renderOption
          ? options.map((option, index) => {
            if ($scopedSlots.renderOption) {
              return $scopedSlots.renderOption({ option, index });
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
