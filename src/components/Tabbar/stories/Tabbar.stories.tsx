import Vue from 'vue';
import Tabbar, { TabbarItem } from '..';
import docs from '../README.md';
import { MedicalMessageOutlined, CheckupOutlined, UserOutlined } from '@/icons';
import Button from '../../Button';

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
          <TabbarItem iconAreaSize="lg">
            <img slot="icon" style={style} src={require('@/assets/logo.svg')} />
          </TabbarItem>
          <TabbarItem textSize="xsm" icon={MedicalMessageOutlined}>就医</TabbarItem>
          <TabbarItem textSize="xsm" icon={CheckupOutlined}>体检</TabbarItem>
          <TabbarItem textSize="xsm" icon={UserOutlined}>我的</TabbarItem>
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
          <TabbarItem name="1" iconAreaSize="lg">
            <img slot="icon" style="width: 100%; box-shadow:0px 0px 20px 0px rgba(47,131,255,0.14);" src={require('@/assets/logo.svg')} />
          </TabbarItem>
          <TabbarItem name="2" icon={MedicalMessageOutlined}>就医</TabbarItem>
          <TabbarItem name="3" icon={CheckupOutlined}>体检</TabbarItem>
          <TabbarItem name="4" icon={UserOutlined}>我的</TabbarItem>
        </Tabbar>
      </div>
    );
  },
});

export const activeColor = () => Vue.extend({
  render() {
    return (
      <Tabbar activeColor="#ff9434" inActiveColor="#000" value="2">
        <TabbarItem name="1" iconAreaSize="lg">
          <img slot="icon" style="width: 100%; box-shadow:0px 0px 20px 0px rgba(47,131,255,0.14);" src={require('@/assets/logo.svg')} />
        </TabbarItem>
        <TabbarItem name="2" icon={MedicalMessageOutlined}>就医</TabbarItem>
        <TabbarItem name="3" icon={CheckupOutlined}>体检</TabbarItem>
        <TabbarItem name="4" icon={UserOutlined}>我的</TabbarItem>
      </Tabbar>
    );
  }
});

export const barColor = () => Vue.extend({
  render() {
    return (
      <Tabbar barColor="#eee" value="2">
        <TabbarItem name="1" iconAreaSize="lg">
          <img slot="icon" style="width: 100%; box-shadow:0px 0px 20px 0px rgba(47,131,255,0.14);" src={require('@/assets/logo.svg')} />
        </TabbarItem>
        <TabbarItem name="2" icon={MedicalMessageOutlined}>就医</TabbarItem>
        <TabbarItem name="3" icon={CheckupOutlined}>体检</TabbarItem>
        <TabbarItem name="4" icon={UserOutlined}>我的</TabbarItem>
      </Tabbar>
    );
  }
});

export const noIcon = () => Vue.extend({
  render() {
    return (
      <Tabbar>
        <TabbarItem name="1">关注</TabbarItem>
        <TabbarItem name="2">推荐</TabbarItem>
        <TabbarItem name="3">热榜</TabbarItem>
      </Tabbar>
    );
  },
});
