import { componentFactoryOf } from 'vue-tsx-support';
import props from 'vue-strict-prop';
import { prefix } from '../_utils/shared';
import Radio from '../Radio';
import ancestorMixin from '../_utils/ancestorMixin';
import { RadioOption, RadioGroupEvents } from './types';
import { IconProperty } from '../../global';

const baseRadioGroupName = `${prefix}radio-group`;



export const radioGroupProps = {
  name: props(String).optional,
  value: props.ofType<any>().default(null),
  disabled: props.ofType<Boolean | undefined>().default(undefined),
  options: props.ofArray<RadioOption | string>().optional,
  color: String,
  unCheckedColor: String,
  checkedIcon: props.ofType<IconProperty>().optional,
  unCheckedIcon: props.ofType<IconProperty | null>().optional,
};


export default componentFactoryOf<RadioGroupEvents>().mixin(
  ancestorMixin('radioGroup')
).create({
  name: baseRadioGroupName,
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
  data() {
    return {
      valueState: this.value,
    } as {
      valueState: any;
    };
  },
  methods: {
    childrenChange(value: any, checked: boolean) {
      if (checked) {
        this.valueState = value;
        this.$emit('change', value);
      }
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
      <div class={baseRadioGroupName} role="radiogroup">
        {content}
      </div>
    );
  },
});
