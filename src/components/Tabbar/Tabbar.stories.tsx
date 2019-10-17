import Vue from 'vue';
import Tabbar from '.';
import docs from './README.md';

export default {
  title: '🧩Components|Navigation/Tabbar',
  parameters: {
    component: Tabbar,
    notes: { markdown: docs },
  },
};

export const basic = () => Vue.extend({
  render() {
    return (
      <Tabbar></Tabbar>
    );
  },
});
