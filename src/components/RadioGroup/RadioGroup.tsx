import { componentFactoryOf } from 'vue-tsx-support';
import props from 'vue-strict-prop';
import { prefix } from '../_utils/shared';
import { RadioProps } from '../Radio/types';
import Radio from '../Radio';
import ancestorMixin from '../_utils/ancestorMixin';

const baseRadioGroupName = `${prefix}radio-group`;

export interface RadioGroupEvents {
  onChange: any;
}

export type RadioOption = (RadioProps & { label?: string }) | string;

export default componentFactoryOf<RadioGroupEvents>().mixin(
  ancestorMixin('radioGroup')
).create({
  name: baseRadioGroupName,
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    name: props(String).optional,
    value: props.ofType<any>().default(null),
    disabled: props(Boolean).default(false),
    options: props.ofArray<RadioOption>().optional,
  },
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
    renderOptions(options: RadioOption[]) {
      return options.map(option => {
        if (typeof option === 'string') {
          return <Radio value={option}>{option}</Radio>
        }
        return <Radio {...{ props: option }}>{option.label}</Radio>
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
