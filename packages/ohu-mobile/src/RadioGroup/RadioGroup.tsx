import Radio from '../Radio';
import { RadioOption, RadioGroupEvents, RadioGroupProps } from './types';
import { IconProperty } from '../types';
import { defineAncestorComponent, props } from '../_utils/defineComponent';
import { fieldMixin } from '../Form/fieldMixin';

export const radioGroupProps = {
  name: props(String).optional,
  value: props.ofType<any>().default(null),
  disabled: props(Boolean).optional,
  options: props.ofArray<RadioOption | string>().optional,
  color: String,
  unCheckedColor: String,
  checkedIcon: props.ofType<IconProperty | null>().optional,
  unCheckedIcon: props.ofType<IconProperty | null>().optional,
};


export default defineAncestorComponent<RadioGroupProps, RadioGroupEvents>('radio-group')
  .mixin(fieldMixin('valueState', 'value'))
  .create({
    model: {
      prop: 'value',
      event: 'change',
    },
    props: radioGroupProps,
    watch: {
      value(nv) {
        this.valueState = nv;
      },
    },
    methods: {
      childrenChange(value: any, checked: boolean, option?: RadioOption) {
        if (this.disabled) return false;
        if (checked) {
          this.valueState = value;
          this.$emit('change', value, option);
        }
        return true;
      },
      isChildChecked(value: any) {
        return this.valueState === value;
      },
      renderOptions(options: (RadioOption | string)[]) {
        return options.map(option => {
          if (typeof option === 'string') {
            return <Radio value={option}>{option}</Radio>
          }
          const {
            attach,
            label,
            ...props
          } = option;
          return <Radio {...{ props }}>{label}</Radio>
        });
      },
    },
    render() {
      const { $slots, options } = this;
      const content = options ? this.renderOptions(options) : $slots.default;
      return (
        <div class={this.root()} role="radiogroup">
          {content}
        </div>
      );
    },
  });
