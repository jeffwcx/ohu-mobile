import Popup from '..';
import Vue from 'vue';
import docs from '../README.md';
import Button from '../../Button';
import Card, { CardHeader } from '../../Card';
import PopupHeader from '../PopupHeader';
import { Position } from '../Popup';

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
      v2: false,
      v3: false,
      v4: false,
      v5: false,
      vz: false,
      vf: false,
      vm: false,
      vmf: false,
      vfs: false,
      va: false,
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
        <Popup
          v-model={this.vz}
          animate="zoom"
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
          <Button type="primary" onClick={this.open}>slide-up</Button>
          <Button onClick={this.open}>slide-down</Button>
          <Button type="primary" onClick={this.open}>slide-left</Button>
          <Button onClick={this.open}>slide-right</Button>
        </Card>
        <Popup
          v-model={this.vm}
          animate="slide-down"
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
  }
});

export const anchor = () => Vue.extend({
  data() {
    return {
      va: false,
      anchorEl: null,
      position: { vertical: 'bottom', horizontal: 'left' },
    } as { va: boolean, anchorEl: HTMLElement | null, position: Position };
  },
  methods: {
    setAnchor(e: Event, position?: Position) {
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
          animate="zoom-big"
          position={this.position}
          targetStyle={{ background: '#FFF', padding: '10px', boxShadow: '0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)' }}>
          <h2>This is PopOver</h2>
          <p>Here is description.</p>
        </Popup>
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
        <Card shadow>
          <CardHeader>transformOrigin</CardHeader>
          <div style="display: flex; min-height: 200px; flex-flow: row wrap; justify-content: space-between; align-content: space-around;">
          </div>
        </Card>
      </div>
    );
  }
});
