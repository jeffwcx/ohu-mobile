import Vue from 'vue';
import Radio from '..';
import docs from '../README.md';
import RadioGroup from '../../RadioGroup';


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
          <Radio value="male">男</Radio>
          <Radio value="female">女</Radio>
        </RadioGroup>
        { this.value }
      </div>
    );
  },
});

