import Vue from 'vue';
import docs from '@/Dialog/README.md';
import { Card, Button, Dialog, Tag } from '@ohu-mobile/core';

export default {
  title: 'Components|FeedBack/Dialog',
  parameters: {
    component: Dialog,
    notes: { markdown: docs },
  },
};

export const basic = () => Vue.extend({
  render() {
    return (
      <div style="padding: 10px; background: #F5F5F5;">
        <Card>
          <Button inline type="primary" size="md" onClick={() => Dialog.alert({
            title: 'Make sure you known it.',
            parent: this,
            okBtn: 'yes',
            onOk: () => {
              console.log('yes, i known.');
            },
          })}>alert</Button>
        </Card>
        <Card>
          <Button inline type="primary" size="md" onClick={() => Dialog.confirm({
            title: 'Do you known it?',
            okBtn: 'yes',
            cancelBtn: 'no',
            onOk: () => {
              console.log('yes, i known.');
            },
            onCancel: () => {
              console.log('no, i don\'t known.');
            },
            parent: this,
          })}>confirm</Button>
        </Card>
        <Card>
          <Button inline type="primary" size="md" onClick={() => Dialog.confirm({
            title: 'Do you known it?',
            scrollBody: true,
            targetStyle: {
              width: '80%',
            },
            content: 'I love you three thousand times!I love you three thousand times!I love you three thousand times!I love you three thousand times!I love you three thousand times!I love you three thousand times!I love you three thousand times!I love you three thousand times!I love you three thousand times!I love you three thousand times!I love you three thousand times!I love you three thousand times!I love you three thousand times!I love you three thousand times!I love you three thousand times!I love you three thousand times!I love you three thousand times!I love you three thousand times!I love you three thousand times!I love you three thousand times!I love you three thousand times!I love you three thousand times!I love you three thousand times!I love you three thousand times!I love you three thousand times!I love you three thousand times!I love you three thousand times!I love you three thousand times!I love you three thousand times!I love you three thousand times!I love you three thousand times!',
            okBtn: {
              text: 'yes',
              handle: () => {
                const a = Dialog.alert({
                  parent: this,
                  title: 'Really?',
                  okBtn: {
                    text: 'fuck!',
                    handle: () => a.close(),
                  },
                });
                return false;
              },
            },
            cancelBtn: 'no',
            onCancel: () => {
              console.log('no, i don\'t known.');
            },
            parent: this,
          })}>instance close</Button>
        </Card>
        <Card>
          <Button inline type="primary" size="md" onClick={() => Dialog.confirm({
            title: 'Do you known it?',
            content: 'I love you three thousand times!I love you three thousand times!I love you three thousand times!I love you three thousand times!I love you three thousand times!I love you three thousand times!I love you three thousand times!I love you three thousand times!I love you three thousand times!I love you three thousand times!I love you three thousand times!I love you three thousand times!I love you three thousand times!I love you three thousand times!I love you three thousand times!I love you three thousand times!I love you three thousand times!I love you three thousand times!I love you three thousand times!I love you three thousand times!I love you three thousand times!I love you three thousand times!I love you three thousand times!I love you three thousand times!I love you three thousand times!I love you three thousand times!I love you three thousand times!I love you three thousand times!I love you three thousand times!I love you three thousand times!I love you three thousand times!',
            okBtn: {
              text: 'yes',
              handle: () => {
                Dialog.alert({
                  parent: this,
                  title: 'Really?',
                  okBtn: 'fuck',
                  onOk: () => {
                    Dialog.closeAll();
                  },
                });
                return false;
              },
            },
            cancelBtn: 'no',
            onCancel: () => {
              console.log('no, i don\'t known.');
            },
            parent: this,
          })}>closeAll</Button>
        </Card>
      </div>
    );
  },
});

export const slots = () => Vue.extend({
  render() {
    return (
      <div>
        <Card>
          <Button type="primary" onClick={() => {
            Dialog.alert({
              render() {
                return <div>这是个奇怪的内容</div>;
              },
            });
          }}>render</Button>
        </Card>
        <Card>
          <Button type="primary" onClick={() => {
            Dialog.open({
              renderTitle() {
                return (
                  <div>这是个特殊的标题<Tag>tech</Tag></div>
                );
              },
            });
          }}>renderTitle</Button>
        </Card>
      </div>
    );
  },
});


export const useAsComponent = () => Vue.extend({
  data() {
    return {
      visible: false,
    };
  },
  render() {
    return (
      <Card>
        <Dialog
          v-model={this.visible}
          closeAfterAsyncTaskCompleted
          okBtn={{
            text: '确定',
            handle: () => {
              return new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                }, 5000);
              });
            },
          }}
          cancelBtn="取消"
          title="Tony"
          content="I feel like you're driving me to court martial."
          icon={{ type: 'circle-check-f', color: '#36b365' }}>
        </Dialog>
        <Button type="primary" onClick={() => this.visible = true}>打开</Button>
      </Card>
    );
  },
});
