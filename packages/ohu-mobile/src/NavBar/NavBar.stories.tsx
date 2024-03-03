import Vue from 'vue';
import docs from './README.md?raw';
import NavBar from './index';
import './style';
import Button from '../Button';
import '../Button/style';
import { MenuOutlined, HomeOutlined } from '@ohu-mobile/icons';

export default {
  title: 'Components/Navigation/NavBar',
  parameters: {
    component: NavBar,
    options: {
      showPanel: true,
    },
    notes: { markdown: docs },
  },
};

export const Basic = () =>
  Vue.extend({
    render() {
      return (
        <div>
          <NavBar leftArrow title="预约挂号" divider></NavBar>
        </div>
      );
    },
  });

export const LeftText = () =>
  Vue.extend({
    render() {
      return (
        <NavBar
          type="primary"
          leftArrow
          leftText="返回"
          title="预约挂号"
          divider
        ></NavBar>
      );
    },
  });

export const LeftSlot = () =>
  Vue.extend({
    render() {
      return (
        <NavBar divider>
          <img
            slot="left"
            style="height: 100%;"
            src="https://raw.githubusercontent.com/jeffwcx/ohu-mobile/master/docs/storybook/src/assets/logo.svg"
          />
          <div style="width: 250px; height: 100%;background:rgba(248,248,248,1);"></div>
          <template slot="right">
            <Button type="link" inline icon={MenuOutlined}></Button>
          </template>
        </NavBar>
      );
    },
  });

export const RightSlot = () =>
  Vue.extend({
    methods: {
      back(e: Event) {
        console.log('back', e);
      },
    },
    render() {
      return (
        <NavBar
          leftArrow
          title="预约挂号"
          divider
          onClickLeft={this.back}
          segmentation={[1, 1, 1]}
        >
          <template slot="right">
            <Button type="link" inline icon={MenuOutlined}></Button>
            <Button type="link" inline icon={HomeOutlined}></Button>
          </template>
        </NavBar>
      );
    },
  });

export const Primary = () =>
  Vue.extend({
    render() {
      return (
        <NavBar type="primary">
          <img
            height="100%"
            slot="left"
            style="margin-left: 14px;"
            src="https://raw.githubusercontent.com/jeffwcx/ohu-mobile/master/docs/storybook/src/assets/logo-white.svg"
          />
          <div style="width: 250px; height: 100%;"></div>
          <template slot="right">
            <Button type="link" inline icon="menu"></Button>
          </template>
        </NavBar>
      );
    },
  });
