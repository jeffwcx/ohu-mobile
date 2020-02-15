import Agree from '@/Agree';
import '@/Agree/style';
import Vue from 'vue';
import docs from '@/Agree/README.md';

export default {
  title: 'Components|Form/Agree',
  parameters: {
    component: Agree,
    notes: { markdown: docs }
  },
};


export const basic = () => Vue.extend({
  data() {
    return {
      isAgree: false,
    };
  },
  render() {
    return (
      <div style="padding: 16px;">
        <Agree v-model={this.isAgree}>请您仔细阅读以下条款，并确认您已完全理解<a href="#">本协议</a>之规定，尤其是免除及限制责任的条款、知识产权条款、法律适用及争议解决条款。</Agree>
        <p>
          { this.isAgree ? '同意' : '不同意' }
        </p>
      </div>
    );
  },
});

export const disabled = () => Vue.extend({
  render() {
    return (
      <div style="padding: 16px;">
        <Agree disabled>请您仔细阅读以下条款，并确认您已完全理解<a href="#">本协议</a>之规定，尤其是免除及限制责任的条款、知识产权条款、法律适用及争议解决条款。</Agree>
      </div>
    );
  },
});
