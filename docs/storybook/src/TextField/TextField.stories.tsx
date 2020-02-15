import Vue from 'vue';
import docs from '@/TextField/README.md';
import TextField from '@/TextField';
import '@/TextField/style';


export default {
  title: 'Components|Form/TextField',
  parameters: {
    component: TextField,
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
