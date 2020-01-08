import docs from '@/Toast/README.md';
import Vue from 'vue';
import { Toast, Card, Button, PopupPosition } from '@ohu-mobile/core';
import { CheckboxCircleFilled } from '@ohu-mobile/icons';
export default {
  title: 'Components|FeedBack/Toast',
  parameters: {
    component: Toast,
    notes: {
      markdown: docs,
    },
  },
};


export const basic = () => Vue.extend({
  render() {
    return (
      <div style="height: 1300px;">
        <Card>
          <Button onClick={() => Toast.open({
            parent: this,
            content: '这是个友好的提示',
          })}>open</Button>
        </Card>
      </div>
    );
  },
});

export const info = () => Vue.extend({
  render() {
    return (
      <Card>
        <Button onClick={() => Toast.info('info')}>info</Button>
      </Card>
    );
  },
});

export const timeout = () => Vue.extend({
  render() {
    return (
      <Card>
        <Button type="primary" onClick={() => Toast.open({
          parent: this,
          content: 'Disappear in 5s',
          duration: 5000,
        })}>disappear in 5s</Button>
      </Card>
    );
  },
});

export const loading = () => Vue.extend({
  render() {
    return (
      <Card>
        <Button onClick={() => {
          const l = Toast.loading('加载中...');
          setTimeout(() => {
            if (l.visible) {
              l.close();
              Toast.info('loading finished.');
            }
          }, 3000);
        }}>loading</Button>
      </Card>
    );
  },
});

export const icon = () => Vue.extend({
  render() {
    return (
      <Card>
        <Button onClick={() => {
          Toast.open({
            duration: 100000,
            icon: {
              type: CheckboxCircleFilled,
              color: '#36b365',
            },
            content: '图标',
          });
        }}>Icon</Button>
      </Card>
    );
  },
});

export const position = () => Vue.extend({
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
        { horizontal: 'right', vertical: 'bottom' }
      ],
    } as {
      positions: PopupPosition[],
    };
  },
  render() {
    return (
      <Card>
        {
          this.positions.map((pos, index) => {
            const content = typeof pos === 'string' ? pos : Object.values(pos).join('-');
            return (
              <Button style="margin-top: 10px; margin-bottom: 10px;"
                type={index % 2 ? 'default' : 'primary'}
                onClick={() => {
                  Toast.open({
                    content,
                    position: pos,
                  });
                }}>
                {content}
              </Button>
            );
          })
        }
      </Card>
    );
  },
});
