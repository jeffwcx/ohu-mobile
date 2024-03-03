import Vue from 'vue';
import ActionBar from './index';
import './style';

import Dialog from '../Dialog';
import '../Dialog/style';
import Button from '../Button';
import '../Button/style';

export default {
  title: 'Components/DataDisplay/ActionBar',
  parameters: {
    component: ActionBar,
    options: {
      showPanel: true,
    },
  },
};

export const Basic = () =>
  Vue.extend({
    data() {
      return {
        visible: false,
      };
    },
    render() {
      return (
        <div style="height: 200vh; background: #efefef;">
          <Button onClick={() => (this.visible = !this.visible)}>
            click to show
          </Button>
          <ActionBar
            visible={this.visible}
            divider={false}
            actions={[
              {
                type: 'primary',
                text: '确定',
              },
            ]}
          ></ActionBar>
        </div>
      );
    },
  });

export const MultiButtons = () =>
  Vue.extend({
    render() {
      return (
        <div style="height: 200vh; background: #FFF;">
          往下看
          <ActionBar
            onClick={(option) => {
              console.log(option);
            }}
            actions={[
              {
                plain: true,
                text: '删除',
              },
              {
                type: 'primary',
                text: '移动',
              },
            ]}
          ></ActionBar>
        </div>
      );
    },
  });

export const Text = () =>
  Vue.extend({
    render() {
      return (
        <div style="height: 200vh; background: #FFF;">
          往下看
          <ActionBar
            actions={[
              {
                type: 'primary',
                text: '付费升级',
              },
            ]}
          >
            <span style="font-size: 14px;">
              ￥<span style="font-size: 30px;">99</span>元
            </span>
          </ActionBar>
        </div>
      );
    },
  });

export const Toolbar = () =>
  Vue.extend({
    render() {
      return (
        <div style="height: 200vh; background: #FFF;">
          往下看
          <ActionBar
            toolbar
            onClick={(option) => {
              Dialog.alert({ title: JSON.stringify(option) });
            }}
            actions={[
              {
                text: '删除',
                link: true,
              },
              {
                type: 'primary',
                text: '移动',
                link: true,
              },
            ]}
          ></ActionBar>
        </div>
      );
    },
  });
