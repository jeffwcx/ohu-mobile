import Vue from 'vue';
import Bottom from './index';
import './style';
import Button from '../Button';
import '../Button/style';
import Tabbar from '../Tabbar';
import '../Tabbar/style';
import { GovernmentFilled, HomeFilled } from '@ohu-mobile/icons';

import docs from './README.md?raw';

export default {
  title: 'Components/Utils/Bottom',
  parameters: {
    component: Bottom,
    options: {
      showPanel: true,
    },
    notes: { markdown: docs },
  },
};

export const Basic = () =>
  Vue.extend({
    data() {
      return {
        show: true,
      };
    },
    render() {
      return (
        <div style="height: 200vh">
          <Button type="primary" onClick={() => (this.show = !this.show)}>
            toggle
          </Button>
          <Bottom visible={this.show}>
            <Tabbar value={'1'}>
              <Tabbar.Item name="1" icon={HomeFilled}>
                首页
              </Tabbar.Item>
              <Tabbar.Item name="2" icon={GovernmentFilled}>
                政府
              </Tabbar.Item>
            </Tabbar>
          </Bottom>
        </div>
      );
    },
  });

export const Tag = () =>
  Vue.extend({
    render() {
      return (
        <div style="height: 200vh">
          <Bottom tag="footer">
            <Tabbar value={'1'}>
              <Tabbar.Item name="1" icon={HomeFilled}>
                首页
              </Tabbar.Item>
              <Tabbar.Item name="2" icon={GovernmentFilled}>
                政府
              </Tabbar.Item>
            </Tabbar>
          </Bottom>
        </div>
      );
    },
  });
