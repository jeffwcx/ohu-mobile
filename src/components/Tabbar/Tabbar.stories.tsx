import mdx from './Tabbar.mdx';
import Vue from 'vue';
import Tabbar from '.';

export default {
  title: '🧩Components|Navigation/Tabbar',
  parameters: {
    component: Tabbar,
    docs: {
      page: mdx,
    },
  },
};

export const basic = () => Vue.extend({
  render() {
    return (
      <Tabbar></Tabbar>
    );
  },
});
