import Vue from 'vue';
import docs from '@/Tabbar/README.md';
import Tabbar from '@/Tabbar';
import '@/Tabbar/style';
import Button from '@/Button';
import '@/Button/style';
import { TrainOutlined, CheckOutlined, UserOutlined } from '@ohu-mobile/icons';

export default {
  title: 'Components|Navigation/Tabbar',
  parameters: {
    component: Tabbar,
    notes: { markdown: docs },
  },
};

export const basic = () => Vue.extend({
  data() {
    return {
      active: 2,
    } as { active: string | number };
  },
  methods: {
    onChange(key: number | string) {
      this.active = key;
    },
    setActive() {
      this.active = 0;
    },
  },
  render() {
    const style: Partial<CSSStyleDeclaration> = {
      width: '100%',
    };
    if (this.active === 0) {
      style.boxShadow = '0px 0px 20px 0px rgba(47,131,255,0.14)';
    }
    return (
      <div style="background: #fff;">
        <p style="text-align: center;">
          <p>index: {this.active}</p>
          <Button size="md" inline type="primary" onClick={this.setActive}>go to index 0</Button>
        </p>
        <Tabbar value={this.active} onChange={this.onChange}>
          <Tabbar.Item iconAreaSize="lg">
            <img slot="icon" style={style} src={require('../assets/logo.svg')} />
          </Tabbar.Item>
          <Tabbar.Item textSize="xsm" icon={TrainOutlined}>就医</Tabbar.Item>
          <Tabbar.Item textSize="xsm" icon={CheckOutlined}>体检</Tabbar.Item>
          <Tabbar.Item textSize="xsm" icon={UserOutlined} badge={{ type: 'dot' }}>我的</Tabbar.Item>
        </Tabbar>
      </div>
    );
  }
});

export const noBorder = () => Vue.extend({
  render() {
    return (
      <div style="background: #fff;">
        <p style="text-align: center;">
          content
        </p>
        <Tabbar border={false}>
          <Tabbar.Item name="1" iconAreaSize="lg">
            <img slot="icon" style="width: 100%; box-shadow:0px 0px 20px 0px rgba(47,131,255,0.14);" src={require('../assets/logo.svg')} />
          </Tabbar.Item>
          <Tabbar.Item name="2" icon={TrainOutlined}>就医</Tabbar.Item>
          <Tabbar.Item name="3" icon={CheckOutlined}>体检</Tabbar.Item>
          <Tabbar.Item name="4" icon={UserOutlined}>我的</Tabbar.Item>
        </Tabbar>
      </div>
    );
  },
});

export const activeColor = () => Vue.extend({
  render() {
    return (
      <Tabbar activeColor="#ff9434" inActiveColor="#000" value="2">
        <Tabbar.Item name="1" iconAreaSize="lg">
          <img slot="icon" style="width: 100%; box-shadow:0px 0px 20px 0px rgba(47,131,255,0.14);" src={require('../assets/logo.svg')} />
        </Tabbar.Item>
        <Tabbar.Item name="2" icon={TrainOutlined} badge={999}>就医</Tabbar.Item>
        <Tabbar.Item name="3" icon={CheckOutlined}>体检</Tabbar.Item>
        <Tabbar.Item name="4" icon={UserOutlined}>我的</Tabbar.Item>
      </Tabbar>
    );
  }
});

export const barColor = () => Vue.extend({
  render() {
    return (
      <Tabbar barColor="#eee" value="2">
        <Tabbar.Item name="1" iconAreaSize="lg">
          <img slot="icon" style="width: 100%; box-shadow:0px 0px 20px 0px rgba(47,131,255,0.14);" src={require('../assets/logo.svg')} />
        </Tabbar.Item>
        <Tabbar.Item name="2" icon={TrainOutlined}>就医</Tabbar.Item>
        <Tabbar.Item name="3" icon={CheckOutlined}>体检</Tabbar.Item>
        <Tabbar.Item name="4" icon={UserOutlined}>我的</Tabbar.Item>
      </Tabbar>
    );
  }
});

export const noIcon = () => Vue.extend({
  render() {
    return (
      <Tabbar>
        <Tabbar.Item name="1" textSize="md">关注</Tabbar.Item>
        <Tabbar.Item name="2" textSize="md">推荐</Tabbar.Item>
        <Tabbar.Item name="3" textSize="md">热榜</Tabbar.Item>
      </Tabbar>
    );
  },
});
