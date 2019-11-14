import Dialog from '..';
import Vue from 'vue';
import docs from '../README.md';
import Button from '../../Button';
import Card from '../../Card/Card';

export default {
  title: 'Components|FeedBack/Dialog',
  parameters: {
    component: Dialog,
    notes: { markdown: docs },
  },
};

export const basic = () => Vue.extend({
  methods: {
    handleClick() {
    },
  },
  render() {
    return (
      <div style="padding: 10px; background: #F5F5F5;">
        <Card>
          <Button inline type="primary" size="md" onClick={this.handleClick}>alert</Button>
        </Card>
        <Card>
          <Button inline type="primary" size="md" onClick={this.handleClick}>confirm</Button>
        </Card>
        <Card>
          <Button inline type="primary" size="md" onClick={this.handleClick}>prompt</Button>
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
          okBtn={{
            text: '确定',
            handle: () => {
              return new Promise((resolve) => {
                setTimeout(() => {
                  console.log('hello');
                  resolve();
                }, 3000);
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
