import Carousel from '..';
import Vue from 'vue';
import docs from '../README.md';
import './styles.scss';
import Button from '../../Button';

export default {
  title: '🧩Components|DataDisplay/Carousel',
  parameters: {
    component: Carousel,
    notes: { markdown: docs }
  },
};

export const basic = () => Vue.extend({
  data() {
    return {
      index: 0,
    };
  },
  methods: {
    next() {
      this.index += 1;
    },
    prev() {
      if (this.index > 0) {
        this.index -= 1;
      }
    }
  },
  render() {
    return (
      <div>
        <Carousel value={this.index} onInput={({ to }) => { this.index = to }}>
          <div class="basic-demo-item">1</div>
          <div class="basic-demo-item">2</div>
          <div class="basic-demo-item">3</div>
        </Carousel>
        <div class="basic-demo-operations">
          <Button type="primary" size="sm" onClick={this.prev}>prev</Button>
          <Button type="primary" size="sm" onClick={this.next}>next</Button>
        </div>
      </div>
    );
  },
});


export const perPage = () => Vue.extend({
  data() {
    return {
      index: 0,
    };
  },
  methods: {
    next() {
      this.index += 1;
    },
    prev() {
      this.index -= 1;
    }
  },
  render() {
    return (
      <div>
        <Carousel value={this.index} perPage={2} gap="2em" onInput={({ to }) => { this.index = to }}>
          <div class="basic-demo-item">1</div>
          <div class="basic-demo-item">2</div>
          <div class="basic-demo-item">3</div>
        </Carousel>
        <div class="basic-demo-operations">
          <Button type="primary" size="sm" onClick={this.prev}>prev</Button>
          <Button type="primary" size="sm" onClick={this.next}>next</Button>
        </div>
      </div>
    );
  },
});

export const moveStep = () => Vue.extend({
  data() {
    return {
      index: 0,
    };
  },
  methods: {
    next() {
      this.index += 1;
    },
    prev() {
      this.index -= 1;
    }
  },
  render() {
    return (
      <div>
        <Carousel value={this.index} perPage={2} moveStep={1} gap="2em" onInput={({ to }) => { this.index = to }}>
          <div class="basic-demo-item">1</div>
          <div class="basic-demo-item">2</div>
          <div class="basic-demo-item">3</div>
        </Carousel>
        <div class="basic-demo-operations">
          <Button type="primary" size="sm" onClick={this.prev}>prev</Button>
          <Button type="primary" size="sm" onClick={this.next}>next</Button>
        </div>
      </div>
    );
  },
});
