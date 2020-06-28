import props from 'vue-strict-prop';
import docs from '@/Grid/README.md';
import Vue from 'vue';
import { component } from 'vue-tsx-support';
import Grid from '@/Grid';
import '@/Grid/style';

export default {
  title: 'Components|Basic/Grid',
  parameters: {
    component: Grid,
    options: {
      showPanel: true,
    },
    notes: { markdown: docs }
  },
};

const Row = component({
  props: {
    gap: { type: Number, default: 1 },
    wrap: { type: Boolean, default: false },
    units: { type: Number, default: 6 },
    targetStyle: { type: String },
    x: props.ofStringLiterals('left', 'right', 'center', 'between', 'around', 'baseline', 'stretch', 'evenly').optional,
    y: props.ofStringLiterals('top', 'bottom', 'center', 'baseline', 'stretch', 'between', 'around', 'evenly').optional,
    m: props.ofStringLiterals('top', 'bottom', 'center', 'between', 'around', 'stretch', 'evenly').optional,
    hasText: Boolean,
  },
  render() {
    return (
      <div style={{ overflow: 'hidden' }}>
        <Grid m={this.m} gap={this.gap} wrap={this.wrap} style={this.targetStyle} x={this.x} y={this.y}>
          { new Array(this.units).fill(0).map((_, index) =>
            <Grid.Item
              span={4}
              style={{
                background: '#efefef',
                height: '100px',
                lineHeight: '100px',
                fontSize: `${(14 + index * 2) + 'px'}` }}>
              {this.hasText && index + 1}
            </Grid.Item>)
          }
        </Grid>
      </div>
    )
  },
});

export const basic = () => Vue.extend({
  render() {
    return (
      <Row></Row>
    );
  },
});

export const gap = () => Vue.extend({
  render() {
    return (
      <Row gap={4}></Row>
    );
  },
});

export const m = () => Vue.extend({
  render() {
    return (
      <div>
        <p>m: center</p>
        <Row m="center" targetStyle="height: 300px; background: #e0e0e0;" wrap></Row>
        <p>m: top</p>
        <Row m="top" targetStyle="height: 300px; background: #e0e0e0;" wrap></Row>
        <p>m: bottom</p>
        <Row m="bottom" targetStyle="height: 300px; background: #e0e0e0;" wrap></Row>
        <p>m: between</p>
        <Row m="between" targetStyle="height: 300px; background: #e0e0e0;" wrap></Row>
        <p>m: around</p>
        <Row m="around" targetStyle="height: 300px; background: #e0e0e0;" wrap></Row>
        <p>m: evenly</p>
        <Row m="evenly" targetStyle="height: 300px; background: #e0e0e0;" wrap></Row>
      </div>
    );
  },
});

export const x = () => Vue.extend({
  render() {
    return (
      <div>
        <p>x: center</p>
        <Row x="center" m="center" units={3} targetStyle="height: 300px; background: #e0e0e0;" wrap></Row>
        <p>x: left</p>
        <Row x="left" m="center" units={2} targetStyle="height: 300px; background: #e0e0e0;" wrap></Row>
        <p>x: right</p>
        <Row x="right" m="center" units={2} targetStyle="height: 300px; background: #e0e0e0;" wrap></Row>
        <p>x: between</p>
        <Row x="between" m="center" units={2} targetStyle="height: 300px; background: #e0e0e0;" wrap></Row>
        <p>x: around</p>
        <Row x="around" m="center" units={2} targetStyle="height: 300px; background: #e0e0e0;" wrap></Row>
        <p>x: evenly</p>
        <Row x="evenly" m="center" units={2} targetStyle="height: 300px; background: #e0e0e0;" wrap></Row>
      </div>
    );
  },
});

export const y = () => Vue.extend({
  render() {
    return (
      <div>
        <p>y: center</p>
        <Row y="center" units={2} targetStyle="height: 200px; background: #e0e0e0;"></Row>
        <p>y: top</p>
        <Row y="top" units={2} targetStyle="height: 200px; background: #e0e0e0;"></Row>
        <p>y: bottom</p>
        <Row y="bottom" units={2} targetStyle="height: 200px; background: #e0e0e0;"></Row>
      </div>
    );
  },
});

export const wrap = () => Vue.extend({
  render() {
    return (
      <Row units={7} wrap></Row>
    );
  },
});

export const column = () => Vue.extend({
  render() {
    return (
      <div style="overflow: hidden;">
        <Grid column gap={2}>
          <Grid.Item span={12} style="background: #efefef; height: 100px;"></Grid.Item>
          <Grid.Item span={2} style="background: #efefef; height: 100px;"></Grid.Item>
          <Grid.Item span={5} style="background: #efefef; height: 100px;"></Grid.Item>
          <Grid.Item span={2} style="background: #efefef; height: 100px;"></Grid.Item>
        </Grid>
      </div>
    );
  },
});

export const offset = () => Vue.extend({
  render() {
    return (
      <div>
        <Grid style="height: 200px; background: #e0e0e0;" y="center">
          <Grid.Item offset={2} span={2} style="background: #efefef; height: 100px;"></Grid.Item>
          <Grid.Item offset={2} span={2} style="background: #efefef; height: 100px;"></Grid.Item>
          <Grid.Item offset={2} span={2} style="background: #efefef; height: 100px;"></Grid.Item>
        </Grid>
      </div>
    );
  },
});

