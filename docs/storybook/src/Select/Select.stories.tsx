import Vue from 'vue';
import docs from '@/Select/README.md';
import Select from '@/Select';
import '@/Select/style';


export default {
  title: 'Components|Form/Select',
  parameters: {
    component: Select,
    notes: {
      markdown: docs,
    },
  },
};


export const basic = () => Vue.extend({
  render() {
    return (
      <div></div>
    );
  },
});
