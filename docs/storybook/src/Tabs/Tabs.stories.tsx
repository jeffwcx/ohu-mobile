
import Vue from 'vue';
import docs from '@/Tabs/README.md';
import Tabs from '@/Tabs';
import '@/Tabs/style';
import Tab from '@/Tab';
import { StarFilled, FireFilled, RocketFilled } from '~/icons/index';


export default {
  title: 'Components|Navigation/Tabs',
  parameters: {
    component: Tabs,
    options: {
      showPanel: true,
    },
    notes: { markdown: docs }
  },
};

export const basic = () => Vue.extend({
  render() {
    return (
      <div>
        <Tabs value={1} border={false} style="height: 100vh;">
          <Tab title="关注" icon={StarFilled}>
            <p style="width: 100%; height: 200vh; background: red; margin: 0; padding: 0;">

            </p>
          </Tab>
          <Tab title="推荐" icon={RocketFilled}>
            f2
          </Tab>
          <Tab title="热榜" icon={FireFilled}>
            f3
          </Tab>
        </Tabs>
      </div>
    );
  },
});

export const sticky = () => Vue.extend({
  render() {
    return (
      <div>
        <p style="height: 50vh;"></p>
        <Tabs value={1} sticky border={false}>
          <Tab title="关注" icon={StarFilled}>
            <p style="width: 100%; height: 200vh; background: red; margin: 0; padding: 0;">

            </p>
          </Tab>
          <Tab title="推荐" icon={RocketFilled}>
            f2
          </Tab>
          <Tab title="热榜" icon={FireFilled}>
            f3
          </Tab>
        </Tabs>
      </div>
    );
  },
});

export const gesture = () => Vue.extend({
  data() {
    return {
      index: 0,
      count: 0,
    };
  },
  render() {
    return (
      <div>
        <Tabs v-model={this.index} canSwipe border indicatorWidth={40} style="height: 100vh;">
          <Tab title="关注" style="height: calc(100vh - 49px); overflow: scroll;">
            <p style="width: 100%; height: 200vh; background: red; margin: 0; padding: 0;">
            </p>
          </Tab>
          <Tab title="推荐" style="height: calc(100vh - 49px); overflow: scroll;">
            {this.index}
          </Tab>
          <Tab title="热榜" style="height: calc(100vh - 49px); overflow: scroll;">
            热榜
          </Tab>
        </Tabs>
      </div>
    );
  },
});
