import Vue from 'vue';
import Checkbox from '..';
import docs from '../README.md';
import { CheckboxBlankCircleOutlined, CheckboxCircleFilled, IndeterminateCircleFilled } from '@/icons';


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
      c2: false,
    };
  },
  render() {
    return (
      <div>
        <Checkbox name="fruit" value="apple">苹果</Checkbox>
        <Checkbox v-model={this.c2} name="fruit" value="chestnut">栗子</Checkbox>
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
        <Checkbox
          v-model={this.c1}
          checkedIcon={CheckboxCircleFilled}
          unCheckedIcon={CheckboxBlankCircleOutlined}
          indeterminateIcon={IndeterminateCircleFilled}>苹果</Checkbox>
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

export const disabled = () => Vue.extend({
  render() {
    return (
      <div>
        <Checkbox disabled>苹果</Checkbox>
      </div>
    );
  },
});
