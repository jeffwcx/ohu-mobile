import Icon from './Icon';
import { CreateElement } from 'vue';
import mdx from './Icon.mdx';


export default {
  title: '🧩Components|Icon',
  parameters: {
    component: Icon,
    docs: {
      page: mdx,
    },
  },
};

export const basic = () => ({
  render(h: CreateElement) {
    return (
      <Icon type="home"></Icon>
    );
  },
});

export const spin = () => ({
  render(h: CreateElement) {
    return (
      <Icon type="home" spin></Icon>
    );
  },
});