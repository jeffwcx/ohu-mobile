import Vue from 'vue';
import docs from '@/Loading/README.md';
import { Loading } from '@ohu-mobile/core';

export default {
  title: 'Components|FeedBack/Loading',
  parameters: {
    component: Loading,
    notes: { markdown: docs }
  },
};

export const basic = () => Vue.extend({
  render() {
    return (
      <div style="text-align: center; padding: 10px;">
        <Loading></Loading>
      </div>
    );
  }
});

export const loadingText = () => Vue.extend({
  render() {
    return (
      <div style="text-align: center; padding: 10px;">
        <Loading>加载中...</Loading>
      </div>
    );
  }
});

export const color = () => Vue.extend({
  render() {
    return (
      <div style="text-align: center; padding: 10px;">
        <Loading color="#2d7eff" />
      </div>
    );
  }
});

export const vertical = () => Vue.extend({
  render() {
    return (
      <div style="text-align: center; padding: 10px; background: rgba(0, 0, 0, .8);">
        <Loading color="#fff" vertical />
      </div>
    );
  }
});

export const size = () => Vue.extend({
  render() {
    return (
      <div style="text-align: center; padding: 10px;">
        <Loading size="20px" textSize="16px" vertical />
      </div>
    );
  }
});

export const textColor = () => Vue.extend({
  render() {
    return (
      <div style="text-align: center; padding: 10px;">
        <Loading size="20px" textColor="#ff9434" textSize="16px" vertical />
      </div>
    );
  }
});
