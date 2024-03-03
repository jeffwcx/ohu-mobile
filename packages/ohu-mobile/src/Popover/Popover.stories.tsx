import Vue from 'vue';

import Popover from './index';
import './style';
import Button from '../Button';
import '../Button/style';
import Icon from '../Icon';
import '../Icon/style';
import {
  MessageOutlined,
  CustomerServiceOutlined,
  QrScanOutlined,
  MenuOutlined,
} from '@ohu-mobile/icons';

export default {
  title: 'Components/FeedBack/Popover',
  parameters: {
    component: Popover,
    options: {
      showPanel: true,
    },
  },
};

export const Basic = () =>
  Vue.extend({
    data() {
      return {
        vl: true,
      };
    },
    render() {
      return (
        <div style="height: 1600px; display: flex; flex-flow: column nowrap; justify-content: space-around; align-items: center;">
          <Popover v-model={this.vl} position="left">
            <div style="height: 40px; line-height: 40px; padding: 0 10px;">
              <Icon type="message"></Icon> Item1
            </div>
            <div style="height: 40px; line-height: 40px; padding: 0 10px;">
              <Icon type="message"></Icon> Item2
            </div>
            <Button inline size="md" type="primary" slot="anchor">
              left
            </Button>
          </Popover>

          <Popover position="right">
            <div style="height: 40px; line-height: 40px; padding: 0 10px;">
              <Icon type="message"></Icon> Item1
            </div>
            <div style="height: 40px; line-height: 40px; padding: 0 10px;">
              <Icon type="message"></Icon> Item2
            </div>
            <Button inline size="md" type="primary" slot="anchor">
              right
            </Button>
          </Popover>
          <Popover position="top">
            <div style="height: 40px; line-height: 40px; padding: 0 10px;">
              <Icon type="message"></Icon> Item1
            </div>
            <div style="height: 40px; line-height: 40px; padding: 0 10px;">
              <Icon type="message"></Icon> Item2
            </div>
            <Button inline size="md" type="primary" slot="anchor">
              top
            </Button>
          </Popover>

          <Popover position="bottom">
            <div style="height: 40px; line-height: 40px; padding: 0 10px;">
              <Icon type="message"></Icon> Item1
            </div>
            <div style="height: 40px; line-height: 40px; padding: 0 10px;">
              <Icon type="message"></Icon> Item2
            </div>
            <Button inline size="md" type="primary" slot="anchor">
              bottom
            </Button>
          </Popover>
          <Popover position={{ vertical: 'top', horizontal: 'left' }}>
            <div style="height: 40px; line-height: 40px; padding: 0 10px;">
              <Icon type="message"></Icon> Item1
            </div>
            <div style="height: 40px; line-height: 40px; padding: 0 10px;">
              <Icon type="message"></Icon> Item2
            </div>
            <Button inline size="md" type="primary" slot="anchor">
              tl
            </Button>
          </Popover>
          <Popover position={{ vertical: 'top', horizontal: 'right' }}>
            <div style="height: 40px; line-height: 40px; padding: 0 10px;">
              <Icon type="message"></Icon> Item1
            </div>
            <div style="height: 40px; line-height: 40px; padding: 0 10px;">
              <Icon type="message"></Icon> Item2
            </div>
            <Button inline size="md" type="primary" slot="anchor">
              tr
            </Button>
          </Popover>
          <Popover position={{ vertical: 'bottom', horizontal: 'left' }}>
            <div style="height: 40px; line-height: 40px; padding: 0 10px;">
              <Icon type="message"></Icon> Item1
            </div>
            <div style="height: 40px; line-height: 40px; padding: 0 10px;">
              <Icon type="message"></Icon> Item2
            </div>
            <Button inline size="md" type="primary" slot="anchor">
              bl
            </Button>
          </Popover>
          <Popover position={{ vertical: 'bottom', horizontal: 'right' }}>
            <div style="height: 40px; line-height: 40px; padding: 0 10px;">
              <Icon type="message"></Icon> Item1
            </div>
            <div style="height: 40px; line-height: 40px; padding: 0 10px;">
              <Icon type="message"></Icon> Item2
            </div>
            <Button inline size="md" type="primary" slot="anchor">
              br
            </Button>
          </Popover>
          <Popover
            position={{ vertical: 'top', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <div style="height: 40px; line-height: 40px; padding: 0 10px;">
              <Icon type="message"></Icon> Item1
            </div>
            <div style="height: 40px; line-height: 40px; padding: 0 10px;">
              <Icon type="message"></Icon> Item2
            </div>
            <Button inline size="md" type="primary" slot="anchor">
              origin-tr
            </Button>
          </Popover>
          <Popover
            position={{ vertical: 'top', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          >
            <div style="height: 40px; line-height: 40px; padding: 0 10px;">
              <Icon type="message"></Icon> Item1
            </div>
            <div style="height: 40px; line-height: 40px; padding: 0 10px;">
              <Icon type="message"></Icon> Item2
            </div>
            <Button inline size="md" type="primary" slot="anchor">
              origin-tl
            </Button>
          </Popover>
        </div>
      );
    },
  });

export const NoArrow = () =>
  Vue.extend({
    render() {
      return (
        <div style="height: 200px; display: flex; flex-flow: column nowrap; justify-content: space-around; align-items: center;">
          <Popover animate="fade" position="left" noArrow>
            <div style="padding: 10px;">no arrow</div>
            <Button inline size="md" type="primary" slot="anchor">
              hello
            </Button>
          </Popover>
        </div>
      );
    },
  });

export const Item = () =>
  Vue.extend({
    render() {
      return (
        <div style="height: 200px; display: flex; flex-flow: column nowrap; justify-content: space-around; align-items: center;">
          <Popover
            contentStyle={{ width: '130px' }}
            position={{ vertical: 'bottom', horizontal: 'right' }}
            onSelect={(e) => {
              console.log(e);
            }}
          >
            <Popover.Item key="message" icon={MessageOutlined}>
              messages
            </Popover.Item>
            <Popover.Item key="customer-service" icon={CustomerServiceOutlined}>
              center
            </Popover.Item>
            <Popover.Item key="scan-code" disabled icon={QrScanOutlined}>
              scan
            </Popover.Item>
            <Button
              icon={MenuOutlined}
              inline
              size="md"
              type="link"
              slot="anchor"
            ></Button>
          </Popover>
        </div>
      );
    },
  });
