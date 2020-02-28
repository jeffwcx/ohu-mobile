import Vue from 'vue';
import docs from '@/NavBar/README.md';
import NavBar from '@/NavBar';
import '@/NavBar/style';
import Button from '@/Button';
import '@/Button/style';

export default {
  title: 'Components|Navigation/NavBar',
  parameters: {
    component: NavBar,
    options: {
      showPanel: true,
    },
    notes: { markdown: docs }
  },
};

export const basic = () => Vue.extend({
  render() {
    return (
      <div>
        <NavBar leftArrow title="预约挂号" divider></NavBar>
      </div>
    );
  },
});

export const leftText = () => Vue.extend({
  render() {
    return (
      <NavBar type="primary" leftArrow leftText="返回" title="预约挂号" divider></NavBar>
    );
  }
});


export const leftSlot = () => Vue.extend({
  render() {
    return (
      <NavBar divider>
        <img slot="left" src={require('../assets/logo.svg')} />
        <div style="width: 250px; height: 100%;background:rgba(248,248,248,1);"></div>
        <template slot="right">
          <Button type="link" inline icon="menu-o"></Button>
        </template>
      </NavBar>
    );
  }
});

export const rightSlot = () => Vue.extend({
  methods: {
    back(e: Event) {
      console.log('back', e);
    },
  },
  render() {
    return (
      <NavBar leftArrow title="预约挂号" divider onClickLeft={this.back}>
        <template slot="right">
          <Button type="link" inline icon="menu"></Button>
          <Button type="link" inline icon="home"></Button>
        </template>
      </NavBar>
    );
  }
});

export const primary = () => Vue.extend({
  render() {
    return (
      <NavBar type="primary">
        <img slot="left" src={require('../assets/logo--white.svg')} />
        <div style="width: 250px; height: 100%;"></div>
        <template slot="right">
          <Button type="link" inline icon="menu"></Button>
        </template>
      </NavBar>
    );
  }
});


