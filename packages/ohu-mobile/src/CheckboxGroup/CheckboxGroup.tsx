import Checkbox from '../Checkbox';
import { CheckboxGroupEvents, CheckboxOption, CheckboxGroupScopedSlots, CheckboxGroupProps } from './types';
import checkBoxGroupProps from './props';
import { defineAncestorComponent } from '../_utils/defineComponent';
import { fieldMixin } from '../Form/fieldMixin';

export default defineAncestorComponent<CheckboxGroupProps, CheckboxGroupEvents, CheckboxGroupScopedSlots>(
  'checkbox-group',
).mixin(fieldMixin).create({
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
    let fieldValue = this.getFieldValue(this.value);
    return {
      result: fieldValue === undefined ? [] : [...fieldValue] as any[],
    };
  },
  methods: {
    resetFieldValue(value: any = []) {
      this.result = [...value];
    },
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
        if (this.result.length >= this.max) return false;
        this.result.push(value);
      }
      if (!checked && valueIndex >= 0) {
        this.result.splice(valueIndex, 1);
      }
      if (this.options) {
        this.$emit('change', this.result, this.selectOptions());
      } else {
        this.$emit('change', this.result);
      }
      return true;
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
    const root = this.root();
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
      <div class={root} role="checkboxgroup">
        {content}
      </div>
    );
  },
});
