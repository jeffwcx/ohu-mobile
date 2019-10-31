import Popup from '..';
import Vue from 'vue';
import docs from '../README.md';
import Button from '../../Button';
import Card, { CardHeader } from '../../Card';
import PopupHeader from '../PopupHeader';

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
      vfs: true,
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
          targetStyle={{ width: '100%', height: '6rem', background: '#fff' }}>
        </Popup>
        <Popup
          v-model={this.v4}
          position="left"
          targetStyle={{ width: '6rem', height: '100%', background: '#fff' }}>
        </Popup>
        <Popup
          v-model={this.v5}
          position="right"
          targetStyle={{ width: '6rem', height: '100%', background: '#fff' }}>
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
