import Vue from 'vue';

import Loading from './index';
import './style';

export default {
  title: 'Components/FeedBack/Loading',
  parameters: {
    component: Loading,
    options: {
      showPanel: true,
    },
  },
};

export const Basic = () =>
  Vue.extend({
    render() {
      return (
        <div style="text-align: center; padding: 10px;">
          <Loading></Loading>
        </div>
      );
    },
  });

export const LoadingText = () =>
  Vue.extend({
    render() {
      return (
        <div style="text-align: center; padding: 10px;">
          <Loading>加载中...</Loading>
        </div>
      );
    },
  });

export const Color = () =>
  Vue.extend({
    render() {
      return (
        <div style="text-align: center; padding: 10px;">
          <Loading color="#2d7eff" />
        </div>
      );
    },
  });

export const Vertical = () =>
  Vue.extend({
    render() {
      return (
        <div style="text-align: center; padding: 10px; background: rgba(0, 0, 0, .8);">
          <Loading color="#fff" vertical />
        </div>
      );
    },
  });

export const Size = () =>
  Vue.extend({
    render() {
      return (
        <div style="text-align: center; padding: 10px;">
          <Loading size="20px" textSize="16px" vertical />
        </div>
      );
    },
  });

export const TextColor = () =>
  Vue.extend({
    render() {
      return (
        <div style="text-align: center; padding: 10px;">
          <Loading size="20px" textColor="#ff9434" textSize="16px" vertical />
        </div>
      );
    },
  });
