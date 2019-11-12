import Popup, { PopupHeader } from '..';
import Vue from 'vue';
import docs from '../README.md';
import Button from '../../Button';
import Card, { CardHeader } from '../../Card';
import { PopupPosition } from '../types';

export default {
  title: 'Components|FeedBack/Popup',
  parameters: {
    component: Popup,
    notes: { markdown: docs }
  },
};

export const basic = () => Vue.extend({
  data() {
    return {
      v1: false,
    };
  },
  methods: {
    open() {
      this.v1 = true;
    },
  },
  render() {
    return (
      <div style="padding: 10px;">
        <Popup
          v-model={this.v1}
          targetStyle={{ width: '8rem', height: '8rem', background: '#fff' }}>
        </Popup>
        <Card shadow>
          <CardHeader>Basic</CardHeader>
          <Button type="primary" onClick={() => this.v1 = true}>open</Button>
        </Card>
      </div>
    );
  }
});

export const position = () => Vue.extend({
  data() {
    return {
      v2: false,
      v3: false,
      v4: false,
      v5: false,
    };
  },
  render() {
    return (
      <div style="padding: 8px;">
        <Popup
          v-model={this.v2}
          position="top"
          targetStyle={{ width: '100%', height: '6rem', background: '#fff' }}>
        </Popup>
        <Popup
          v-model={this.v3}
          position="bottom"
          targetStyle={{ width: '100%', height: '6rem', overflow: 'scroll', background: '#fff' }}>
          <div style="height: 1000px;">
            <input onBlur={() => window.scrollTo(0, 0)} type="text" style="width: 60px; font-size: 18px;" />
          </div>
        </Popup>
        <Popup
          v-model={this.v4}
          position="left"
          targetStyle={{ width: '6rem', height: '100%', background: '#fff' }}>
          <Button type="primary" onClick={() => this.v5 = true}>打开right</Button>
        </Popup>
        <Popup
          v-model={this.v5}
          position="right"
          targetStyle={{ width: '6rem', height: '100%', background: '#fff' }}>
          <Button type="primary" onClick={() => this.v4 = true}>打开left</Button>
          <Button type="primary" onClick={() => this.v4 = false}>关闭left</Button>
        </Popup>
        <Card shadow>
          <CardHeader>position</CardHeader>
          <Button type="primary" onClick={() => this.v2 = true}>top</Button>
          <Button onClick={() => this.v3 = true}>bottom</Button>
          <Button type="primary" onClick={() => this.v4 = true}>left</Button>
          <Button onClick={() => this.v5 = true}>right</Button>
        </Card>
      </div>
    );
  },
});

export const animate = () => Vue.extend({
  data() {
    return {
      vz: false,
      vf: false,
      vzs: false,
    };
  },
  render() {
    return (
      <div style="padding: 8px;">
        <Popup
          v-model={this.vz}
          animate="zoom"
          targetStyle={{ width: '8rem', height: '8rem', background: '#fff' }}>
        </Popup>
        <Popup
          v-model={this.vzs}
          animate="zoom-scale"
          targetStyle={{ width: '8rem', height: '8rem', background: '#fff' }}>
        </Popup>
        <Popup
          v-model={this.vf}
          animate="fade"
          targetStyle={{ width: '8rem', height: '8rem', background: '#fff' }}>
        </Popup>
        <Card shadow>
          <CardHeader>animate</CardHeader>
          <Button type="primary" onClick={() => this.vf = true}>fade</Button>
          <Button onClick={() => this.vz = true}>zoom</Button>
          <Button type="primary" onClick={() => this.vzs = true}>zoom-scale</Button>
        </Card>
      </div>
    );
  },
});


export const mask = () => Vue.extend({
  data() {
    return {
      vm: false,
      vmf: false,
    };
  },
  render() {
    return (
      <div style="padding: 8px;">
        <Popup
          v-model={this.vm}
          animate="zoom"
          mask={false}
          targetStyle={{ width: '8rem', height: '8rem', background: 'grey' }}>
        </Popup>
        <Popup
          v-model={this.vmf}
          maskFrosted
          animate="fade"
          targetStyle={{ width: '8rem', height: '8rem', background: '#000' }}>
        </Popup>
        <Card shadow>
          <CardHeader>mask</CardHeader>
          <Button type="primary" onClick={() => this.vm = true}>without mask</Button>
          <Button type="translucent" onClick={() => this.vmf = true}>frosted mask</Button>
        </Card>
      </div>
    );
  },
});

export const fullscreen = () => Vue.extend({
  data() {
    return {
      vfs: false,
    };
  },
  render() {
    return (
      <div style="padding: 8px;">
        <Popup
          v-model={this.vfs}
          animate="slide-down"
          fullscreen
          targetStyle={{ background: '#FFF' }}>
          <PopupHeader minorText="次级标题">标题</PopupHeader>
        </Popup>
        <Card shadow>
          <CardHeader>fullscreen</CardHeader>
          <Button type="primary" onClick={() => this.vfs = true}>fullscreen</Button>
        </Card>
      </div>
    );
  },
});

export const scroll = () => Vue.extend({
  data() {
    return {
      v: false,
    };
  },
  render() {
    return (
      <div style="padding: 8px;">
        <Popup v-model={this.v} scrollBody targetStyle={{ width: '80vw', height: '120vh', background: '#FFF', margin: '30px 20px' }}>
          <Card>
            <CardHeader>title</CardHeader>
          </Card>
        </Popup>
        <Button type="primary" onClick={() => this.v = true}>open</Button>
      </div>
    );
  },
});

export const anchor = () => Vue.extend({
  data() {
    return {
      va: false,
      anchorEl: null,
      position: { vertical: 'bottom', horizontal: 'left' },
    } as { va: boolean, anchorEl: HTMLElement | null, position: PopupPosition };
  },
  methods: {
    setAnchor(e: Event, position?: PopupPosition) {
      this.anchorEl = (e.target || e.srcElement) as HTMLElement;
      this.va = Boolean(this.anchorEl);
      if (position) {
        this.position = position;
      }
    },
  },
  render() {
    return (
      <div style="padding: 10px;">
        <Popup
          v-model={this.va}
          anchor={this.anchorEl as HTMLElement}
          mask={false}
          animate="zoom"
          position={this.position}
          targetStyle={{ background: '#FFF', width: '200px', padding: '10px', boxShadow: '0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)' }}>
          <h2>This is PopOver</h2>
          <p>Here is description.</p>
        </Popup>
        <Card shadow>
          <CardHeader>transformOrigin</CardHeader>
          <div style="display: flex; min-height: 200px; flex-flow: row wrap; justify-content: space-between; align-content: space-around;">
          </div>
        </Card>
        <Card shadow>
          <CardHeader>position</CardHeader>
          <div style="display: flex; min-height: 200px; flex-flow: row wrap; justify-content: space-between; align-content: space-around;">
            <Button inline type="primary" onClick={(e) => this.setAnchor(e, 'top')}>top</Button>
            <Button inline type="primary" onClick={(e) => this.setAnchor(e, 'bottom')}>bottom</Button>
            <Button inline type="primary" onClick={(e) => this.setAnchor(e, 'left')}>left</Button>
            <Button inline type="primary" onClick={(e) => this.setAnchor(e, 'right')}>right</Button>
            <Button inline type="primary" onClick={(e) => this.setAnchor(e, { vertical: 'top', horizontal: 'left' })}>tl</Button>
            <Button inline type="primary" onClick={(e) => this.setAnchor(e, { vertical: 'top', horizontal: 'right' })}>tr</Button>
            <Button inline type="primary" onClick={(e) => this.setAnchor(e, { vertical: 'bottom', horizontal: 'left' })}>bl</Button>
            <Button inline type="primary" onClick={(e) => this.setAnchor(e, { vertical: 'bottom', horizontal: 'right' })}>br</Button>
            <Button inline type="primary" onClick={(e) => this.setAnchor(e, 'center')}>center</Button>
          </div>
        </Card>
      </div>
    );
  }
});

export const functionCall = () => Vue.extend({
  methods: {
    openModal() {
      Popup.open({
        parent: this,
        animate: 'zoom',
        maskClosable: false,
        targetStyle: {
          width: '100px',
          height: '100px',
          background: '#FFF',
        },
        render() {
          return (
            <div style="text-align: center;">
              <Button inline type="primary" onClick={() => Popup.close()}>关闭</Button>
            </div>
          );
        },
      });
    },
  },
  render() {
    return (
      <div>
        <Button type="primary" onClick={this.openModal}>function call</Button>
      </div>
    );
  },
});
