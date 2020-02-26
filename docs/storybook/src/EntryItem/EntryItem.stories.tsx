import Vue from 'vue';
import VueRouter from 'vue-router';
import docs from '@/EntryItem/README.md';
import EntryItem from '@/EntryItem';
import '@/EntryItem/style';
import Card from '@/Card';
import '@/Card/style';
import Button from '@/Button';
import '@/Button/style';
import {
  UserSmileOutlined, MapPinOutlined,
  EmotionOutlined, StarOutlined,
  WalletOutlined, CouponOutlined,
  ReplyOutlined, CustomerServiceOutlined,
  QuestionOutlined,
  HomeOutlined,
  InboxOutlined,
  CheckOutlined,
  UserOutlined,
  MessageOutlined,
} from '~/icons/index';
import { WdghFilled } from './assets/WdghFilled';
import { WdzxFilled } from './assets/WdzxFilled';
import { WdcfFilled } from './assets/WdcfFilled';
import { WdtjFilled } from './assets/WdtjFilled';


export default {
  title: 'Components|Navigation/EntryItem',
  parameters: {
    component: EntryItem,
    notes: { markdown: docs }
  },
};

export const basic = () => Vue.extend({
  render() {
    return (
      <Card>
        <Card.Header bold>常用工具</Card.Header>
        <div style="display: flex; flex-flow: row wrap;">
          <EntryItem style="width: 25%; margin: 13px 0;" icon={UserSmileOutlined} badge={{ type: 'dot' }} text="家人管理"></EntryItem>
          <EntryItem style="width: 25%; margin: 13px 0;" icon={MapPinOutlined} text="常用地址"></EntryItem>
          <EntryItem style="width: 25%; margin: 13px 0;" icon={EmotionOutlined} text="我的医生"></EntryItem>
          <EntryItem style="width: 25%; margin: 13px 0;" icon={StarOutlined} text="关注收藏"></EntryItem>
          <EntryItem style="width: 25%; margin: 13px 0;" icon={WalletOutlined} text="消费明细"></EntryItem>
          <EntryItem style="width: 25%; margin: 13px 0;" icon={CouponOutlined} text="我的礼券"></EntryItem>
          <EntryItem style="width: 25%; margin: 13px 0;" icon={ReplyOutlined} text="推荐分享"></EntryItem>
          <EntryItem style="width: 25%; margin: 13px 0;" icon={CustomerServiceOutlined} text="电话客服" badge="99"></EntryItem>
          <EntryItem style="width: 25%; margin: 13px 0;" icon={QuestionOutlined} text="帮助反馈"></EntryItem>
        </div>
      </Card>
    );
  },
});

export const size = () => Vue.extend({
  render() {
    return (
      <div>
        <Card shadow>
          <Card.Header bold>
            我的订单
            <Button slot="extra" type="link" size="sm">查看全部服务 ></Button>
          </Card.Header>
          <div style="display: flex; flex-flow: row wrap;">
            <EntryItem style="width: 25%;" iconAreaSize="lg" icon={WdghFilled}>我的挂号</EntryItem>
            <EntryItem style="width: 25%;" iconAreaSize="lg" icon={WdzxFilled}>我的咨询</EntryItem>
            <EntryItem style="width: 25%;" iconAreaSize="lg" icon={WdcfFilled}>我的处方</EntryItem>
            <EntryItem style="width: 25%;" iconAreaSize="lg" icon={WdtjFilled}>我的体检</EntryItem>
          </div>
        </Card>
        <Card>
          <EntryItem style="width: 25%;" textSize="xsm" icon={HomeOutlined}>首页</EntryItem>
          <EntryItem style="width: 25%;" textSize="xsm" icon={InboxOutlined}>就医</EntryItem>
          <EntryItem style="width: 25%;" textSize="xsm" icon={CheckOutlined}>体检</EntryItem>
          <EntryItem style="width: 25%;" textSize="xsm" icon={UserOutlined}>我的</EntryItem>
        </Card>
        <EntryItem icon={MessageOutlined} textSize="xsm" iconAreaSize="sm" iconSize="1.1875em">消息</EntryItem>
      </div>
    );
  },
});

export const minorText = () => Vue.extend({
  render() {
    return (
      <Card shadow>
        <EntryItem style="width: 33.3333%" badge={{ text: 1000 }} icon={WdcfFilled} textSize="lg" iconAreaSize="lg" minorText="官方挂号平台">去挂号</EntryItem>
        <EntryItem style="width: 33.3333%" icon={WdghFilled} textSize="lg" iconAreaSize="lg" minorText="浙二本院专家">问医生</EntryItem>
        <EntryItem style="width: 33.3333%" icon={WdtjFilled} textSize="lg" iconAreaSize="lg" minorText="官方唯一平台">查报告</EntryItem>
      </Card>
    );
  },
});

Vue.use(VueRouter);
const router = new VueRouter({
  mode: 'hash',
});
export const to = () => Vue.extend({
  router,
  render() {
    return (
      <Card>
        <EntryItem style="width: 25%;" textSize="xsm" icon={HomeOutlined} url="https://www.gjwlyy.com/html/index/">互联网医院</EntryItem>
        <EntryItem style="width: 25%;" textSize="xsm" icon={HomeOutlined} url="https://www.gjwlyy.com/html/index/" replace>replace</EntryItem>
      </Card>
    );
  }
});

export const useImage = () => Vue.extend({
  render() {
    return (
      <Card shadow>
        <EntryItem style="width: 33.3333%" image={require('../assets/logo.svg')} textSize="lg" iconAreaSize="lg" minorText="官方挂号平台">去挂号</EntryItem>
      </Card>
    );
  }
});
