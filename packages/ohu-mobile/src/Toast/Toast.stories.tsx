import Vue from 'vue';
import Toast from './index';
import './style';
import Card from '../Card';
import '../Card/style';
import Button from '../Button';
import '../Button/style';

import { PopupPosition } from '../Popup';
import { CheckboxCircleOutlined } from '@ohu-mobile/icons';
export default {
  title: 'Components/FeedBack/Toast',
  parameters: {
    component: Toast,
    options: {
      showPanel: true,
    },
  },
};

export const Basic = () =>
  Vue.extend({
    render() {
      return (
        <div style="height: 1300px;">
          <Card>
            <Button
              onClick={() =>
                Toast.open({
                  parent: this,
                  content: '这是个友好的提示',
                })
              }
            >
              open
            </Button>
          </Card>
        </div>
      );
    },
  });

export const Info = () =>
  Vue.extend({
    render() {
      return (
        <Card>
          <Button onClick={() => Toast.info('info')}>info</Button>
        </Card>
      );
    },
  });

export const Timeout = () =>
  Vue.extend({
    render() {
      return (
        <Card>
          <Button
            type="primary"
            onClick={() =>
              Toast.open({
                parent: this,
                content: 'Disappear in 5s',
                duration: 5000,
              })
            }
          >
            disappear in 5s
          </Button>
        </Card>
      );
    },
  });

export const Loading = () =>
  Vue.extend({
    render() {
      return (
        <Card>
          <Button
            onClick={() => {
              const l = Toast.loading('加载中...');
              setTimeout(() => {
                if (l.visible) {
                  l.close();
                  Toast.info('loading finished.');
                }
              }, 1000000);
            }}
          >
            loading
          </Button>
        </Card>
      );
    },
  });

export const SuccessAndFail = () =>
  Vue.extend({
    render() {
      return (
        <Card>
          <Button
            onClick={() => {
              Toast.success('成功', 100000);
            }}
          >
            success
          </Button>
          <Button
            onClick={() => {
              Toast.fail('失败了');
            }}
          >
            fail
          </Button>
        </Card>
      );
    },
  });

export const Icon = () =>
  Vue.extend({
    render() {
      return (
        <Card>
          <Button
            onClick={() => {
              Toast.open({
                duration: 100000,
                icon: {
                  type: CheckboxCircleOutlined,
                },
                content: '操作成功',
                // vertical: true,
              });
            }}
          >
            Icon
          </Button>
        </Card>
      );
    },
  });

export const Position = () =>
  Vue.extend({
    data() {
      return {
        positions: [
          'center',
          'left',
          'right',
          'top',
          'bottom',
          { horizontal: 'left', vertical: 'top' },
          { horizontal: 'left', vertical: 'bottom' },
          { horizontal: 'right', vertical: 'top' },
          { horizontal: 'right', vertical: 'bottom' },
        ],
      } as {
        positions: PopupPosition[];
      };
    },
    render() {
      return (
        <Card>
          {this.positions.map((pos, index) => {
            const content =
              typeof pos === 'string' ? pos : Object.values(pos).join('-');
            return (
              <Button
                style="margin-top: 10px; margin-bottom: 10px;"
                type={index % 2 ? 'default' : 'primary'}
                onClick={() => {
                  Toast.open({
                    content,
                    position: pos,
                  });
                }}
              >
                {content}
              </Button>
            );
          })}
        </Card>
      );
    },
  });
