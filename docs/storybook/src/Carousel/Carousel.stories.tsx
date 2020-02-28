import Button from '@/Button';
import '@/Button/style';
import Carousel, { CarouselChangeEvent } from '@/Carousel';
import '@/Carousel/style';
import '@/Carousel/style';
import Vue from 'vue';
import docs from '@/Button/README.md';
import './styles.scss';

export default {
  title: 'Components|DataDisplay/Carousel',
  parameters: {
    component: Carousel,
    options: {
      showPanel: true,
    },
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
    },
    onInput({ to }: CarouselChangeEvent) {
      this.index = to;
    }
  },
  render() {
    return (
      <div>
        <Carousel value={this.index} gap="10px" onInput={this.onInput}>
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
        <Carousel value={this.index} indicatorDarkMode perPage={3} moveStep={1} gap="2em" onInput={({ to }) => { this.index = to }}>
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

export const center = () => Vue.extend({
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
        <Carousel value={this.index} center perPage={2} moveStep={1} gap="2em" onInput={({ to }) => { this.index = to }}>
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

export const loopAndMultiSlide = () => Vue.extend({
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
      if (this.index === 0) {
        this.index = 5;
      } else {
        this.index -= 1;
      }
    }
  },
  render() {
    return (
      <div>
        <Carousel value={this.index} loop perPage={3} moveStep={1} gap="2em" onInput={({ to }) => { this.index = to }}>
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

export const centerAndLoop = () => Vue.extend({
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
      if (this.index === 0) {
        this.index = 5;
      } else {
        this.index -= 1;
      }
    }
  },
  render() {
    return (
      <div>
        <Carousel value={this.index} center loop perPage={3} moveStep={1} gap="2em" onInput={({ to }) => { this.index = to }}>
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

export const loop = () => Vue.extend({
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
      if (this.index === 0) {
        this.index = 5;
      } else {
        this.index -= 1;
      }
    }
  },
  render() {
    return (
      <div>
        <Carousel value={this.index} loop onInput={({ to }) => { this.index = to }}>
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

export const fade = () => Vue.extend({
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
        <Carousel mode="fade" value={this.index} onInput={({ to }) => { this.index = to }}>
          <img width="100%" height="100%" src="http://via.placeholder.com/750x200/FF9999/FFFFFF?text=hello" alt=""/>
          <img width="100%" height="100%" src="http://via.placeholder.com/750x200/FFCC99/FFFFFF?text=world" alt=""/>
          <img width="100%" height="100%" src="http://via.placeholder.com/750x200/66CC99/FFFFFF?text=!" alt=""/>
        </Carousel>
        <div class="basic-demo-operations">
          <Button type="primary" size="sm" onClick={this.prev}>prev</Button>
          <Button type="primary" size="sm" onClick={this.next}>next</Button>
        </div>
      </div>
    );
  },
});
