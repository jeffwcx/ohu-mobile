import Vue from 'vue';
import docs from '@/Radio/README.md';
import { Radio, RadioGroup, Button } from '@ohu-mobile/core';


export default {
  title: 'Components|Form/Radio',
  parameters: {
    component: Radio,
    notes: { markdown: docs }
  },
};

export const basic = () => Vue.extend({
  render() {
    return (
      <Radio>单选</Radio>
    );
  },
});


export const group = () => Vue.extend({
  data() {
    return {
      value: 'male',
    };
  },
  render() {
    return (
      <div>
        <RadioGroup v-model={this.value} name="sex">
          <Radio value="male" ref="male">男</Radio>
          <Radio value="female" disabled>女</Radio>
          <Radio value="unknown">未知</Radio>
        </RadioGroup>
        <p>{ this.value }</p>
        <p>
          <Button size="sm" onClick={() => {
            (this.$refs.male as any).check();
          }}>checked 男</Button>
        </p>
      </div>
    );
  },
});

export const options = () => Vue.extend({
  data() {
    return {
      f: 'apple',
    };
  },
  render() {
    return (
      <div>
        <RadioGroup v-model={this.f} options={['apple', 'banana', 'chestnut']}>
        </RadioGroup>
        {this.f}
      </div>
    );
  },
});

