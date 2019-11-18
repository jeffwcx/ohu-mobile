import Toast from '..';
import docs from '../README.md';
import Vue from 'vue';
import Card from '../../Card';
import Button from '../../Button';
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
            icon: {
              type: 'circle-check-f',
              color: '#36b365',
            },
            content: '图标',
          });
        }}>Icon</Button>
      </Card>
    );
  },
});
