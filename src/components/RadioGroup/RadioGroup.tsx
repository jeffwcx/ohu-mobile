import { componentFactoryOf } from 'vue-tsx-support';
import props from 'vue-strict-prop';
import { prefix } from '../_utils/shared';

const baseRadioGroupName = `${prefix}radio-group`;

export interface RadioGroupEvents {
  onChange: any;
}

export default componentFactoryOf<RadioGroupEvents>().mixin({
  provide() {
    return {
      radioGroup: this,
    };
  },
}).create({
  name: baseRadioGroupName,
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    name: props(String).optional,
    value: props.ofType<any>().default(null),
  },
  data() {
    return {
      valueState: this.value,
    } as {
      valueState: any;
    };
  },
  methods: {
    childrenChange(value: any) {
      this.valueState = value;
      this.$emit('change', value);
    },
  },
  render() {
    const { $slots } = this;
    return (
      <div class={baseRadioGroupName} role="radiogroup">
        {$slots.default}
      </div>
    );
  },
});
