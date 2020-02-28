import Vue from 'vue';
import Bottom from '@/Bottom';
import '@/Bottom/style';
import docs from '@/Bottom/README.md';
import Tabbar from '@/Tabbar';
import '@/Tabbar/style';
import { GovernmentFilled, HomeFilled } from '~/icons/index';

export default {
  title: 'Components|Utils/Bottom',
  parameters: {
    component: Bottom,
    options: {
      showPanel: true,
    },
    notes: { markdown: docs }
  },
};

export const basic = () => Vue.extend({
  render() {
    return (
      <div style="height: 200vh">
        往下看
        <Bottom>
          <Tabbar value={'1'}>
            <Tabbar.Item name="1" icon={HomeFilled}>首页</Tabbar.Item>
            <Tabbar.Item name="2" icon={GovernmentFilled}>政府</Tabbar.Item>
          </Tabbar>
        </Bottom>
      </div>
    );
  },
});
