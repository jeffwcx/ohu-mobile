import Form from '..';
import Vue from 'vue';
import docs from '../README.md';

export default {
  title: 'Components|Form/Form',
  parameters: {
    component: Form,
    notes: { markdown: docs }
  },
};

export const basic = () => Vue.extend({
  render() {
    return (
      <Form></Form>
    );
  },
});
