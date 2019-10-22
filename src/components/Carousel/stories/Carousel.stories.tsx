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
          <div class="basic-demo-item">4</div>
          <div class="basic-demo-item">5</div>
          <div class="basic-demo-item">6</div>
          <div class="basic-demo-item">7</div>
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
          <div class="basic-demo-item">4</div>
          <div class="basic-demo-item">5</div>
          <div class="basic-demo-item">6</div>
        </Carousel>
        <div class="basic-demo-operations">
          <Button type="primary" size="sm" onClick={this.prev}>prev</Button>
          <Button type="primary" size="sm" onClick={this.next}>next</Button>
        </div>
      </div>
    );
  },
});


export const vertical = () => Vue.extend({
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
        <Carousel style="height: 200px; background: grey;" direction="vertical" gap="20" value={this.index} onInput={({ to }) => { this.index = to }}>
          <div class="vertical-demo-item">1</div>
          <div class="vertical-demo-item">2</div>
          <div class="vertical-demo-item">3</div>
        </Carousel>
        <div class="basic-demo-operations">
          <Button type="primary" size="sm" onClick={this.prev}>prev</Button>
          <Button type="primary" size="sm" onClick={this.next}>next</Button>
        </div>
      </div>
    );
  },
});


export const autoSize = () => Vue.extend({
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
        <p>horizontal</p>
        <Carousel value={this.index} autoSize gap="10px" onInput={({ to }) => { this.index = to }}>
          <div class="basic-demo-item" style={{ width: '200px' }}>1</div>
          <div class="basic-demo-item" style={{ width: '100px' }}>2</div>
          <div class="basic-demo-item" style={{ width: '400px' }}>3</div>
        </Carousel>
        <p>vertical</p>
        <Carousel value={this.index} height="250px" autoSize direction="vertical" gap="10px" onInput={({ to }) => { this.index = to }}>
          <div class="vertical-demo-item" style={{ height: '200px', width: '100%' }}>1</div>
          <div class="vertical-demo-item" style={{ height: '150px', width: '100%' }}>2</div>
          <div class="vertical-demo-item" style={{ height: '50px', width: '100%' }}>3</div>
        </Carousel>
        <div class="basic-demo-operations">
          <Button type="primary" size="sm" onClick={this.prev}>prev</Button>
          <Button type="primary" size="sm" onClick={this.next}>next</Button>
        </div>
      </div>
    );
  },
});
