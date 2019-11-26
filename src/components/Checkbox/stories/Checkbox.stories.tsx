import Vue from 'vue';
import Checkbox from '..';
import docs from '../README.md';
import { CheckboxFilled, CheckboxBlankOutlined } from '../../../icons';


export default {
  title: 'Components|Form/Checkbox',
  parameters: {
    component: Checkbox,
    notes: { markdown: docs }
  },
};

export const basic = () => Vue.extend({
  data() {
    return {
      c1: true,
      c2: false,
    };
  },
  render() {
    return (
      <div>
        <Checkbox>苹果</Checkbox>
        <Checkbox v-model={this.c2}>栗子</Checkbox>
      </div>
    );
  },
});

export const icon = () => Vue.extend({
  data() {
    return {
      c1: true,
    };
  },
  render() {
    return (
      <div>
        <Checkbox v-model={this.c1} checkedIcon={CheckboxFilled} unCheckedIcon={CheckboxBlankOutlined}>苹果</Checkbox>
      </div>
    );
  },
});

export const color = () => Vue.extend({
  data() {
    return {
      c1: true,
    };
  },
  render() {
    return (
      <div>
        <Checkbox v-model={this.c1} color="#36b365" unCheckedColor="#36b365">苹果</Checkbox>
      </div>
    );
  },
});
