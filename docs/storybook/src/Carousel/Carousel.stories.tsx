import Button from '@/Button';
import '@/Button/style';
import Card from '@/Card';
import '@/Card/style';
import Carousel, { CarouselSlideDirection } from '@/Carousel';
import '@/Carousel/style';
import Vue from 'vue';
import docs from '@/Carousel/README.md';
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
      v1: 0,
      v2: 0,
      gap: '2em',
      direction: 'vertical' as CarouselSlideDirection,
      center: true,
    };
  },
  render() {
    return (
      <div>
        <Card shadow>
          <Card.Header>
            basic
          </Card.Header>
          <Carousel v-model={this.v1} style={{ background: '#aaa' }} resize>
            <div class="basic-demo-item">1</div>
            <div class="basic-demo-item">2</div>
          </Carousel>
          {this.v1}
        </Card>
        <Card shadow>
          <Card.Header>
            loop
          </Card.Header>
          <Carousel v-model={this.v1} loop style={{ background: '#aaa' }}>
            <div class="basic-demo-item">1</div>
            <div class="basic-demo-item">2</div>
          </Carousel>
          {this.v1}
        </Card>
        <Card shadow>
          <Card.Header>
            gap
          </Card.Header>
          <Carousel gap={this.gap} loop ref="carousel" center={this.center} style={{ background: '#aaa' }}>
            <div class="basic-demo-item">1</div>
            <div class="basic-demo-item">2</div>
            <div class="basic-demo-item">3</div>
            <div class="basic-demo-item">4</div>
          </Carousel>
          <p>
            <Button type="primary" size="md" inline onClick={(e) => {
              e.stopPropagation();
              (this.$refs.carousel as any).prev();
            }}>Prev</Button>
            <Button inline size="md" onClick={(e) => {
              e.stopPropagation();
              (this.$refs.carousel as any).next();
            }}>Next</Button>
          </p>
        </Card>
        <Card shadow>
          <Card.Header>
            step perPage center
          </Card.Header>
          <Carousel value={3} gap="1em" center loop perPage={2} moveStep={1}>
            <div class="basic-demo-item">1</div>
            <div class="basic-demo-item">2</div>
            <div class="basic-demo-item">3</div>
            <div class="basic-demo-item">4</div>
            <div class="basic-demo-item">5</div>
            <div class="basic-demo-item">6</div>
          </Carousel>
        </Card>
        <Card shadow>
          <Card.Header>
            autoSize
          </Card.Header>
          <Carousel autoSize>
            <div class="basic-demo-item" style={{ width: '200px' }}>1</div>
            <div class="basic-demo-item" style={{ width: '100px' }}>2</div>
            <div class="basic-demo-item" style={{ width: '400px' }}>3</div>
            <div class="basic-demo-item" style={{ width: '400px' }}>4</div>
          </Carousel>
        </Card>
        <Card shadow>
          <Card.Header>
            autoplay
          </Card.Header>
          <Carousel autoplay style={{ background: '#aaa' }}>
            <div class="basic-demo-item">1</div>
            <div class="basic-demo-item">2</div>
            <div class="basic-demo-item">3</div>
            <div class="basic-demo-item">4</div>
          </Carousel>
        </Card>
        <Card shadow>
          <Card.Header>
            autoplay loop
          </Card.Header>
          <Carousel loop autoplay style={{ background: '#aaa' }}>
            <div class="basic-demo-item">1</div>
            <div class="basic-demo-item">2</div>
            <div class="basic-demo-item">3</div>
            <div class="basic-demo-item">4</div>
          </Carousel>
        </Card>
      </div>
    );
  },
});


export const vertical = () => Vue.extend({
  data() {
    return {
      v1: 0,
      v2: 0,
      gap: '2em',
      direction: 'vertical' as CarouselSlideDirection,
      center: true,
    };
  },
  render() {
    return (
      <div>
        <Card shadow>
          <Card.Header>
            basic
          </Card.Header>
          <Carousel direction="vertical" style={{ height: '200px', background: '#aaa' }} v-model={this.v1}>
            <div class="vertical-demo-item">1</div>
            <div class="vertical-demo-item">2</div>
          </Carousel>
          {this.v1}
        </Card>
        <Card shadow>
          <Card.Header>
            loop
          </Card.Header>
          <Carousel v-model={this.v1} loop direction="vertical" style={{ height: '200px', background: '#aaa' }}>
            <div class="vertical-demo-item">1</div>
            <div class="vertical-demo-item">2</div>
          </Carousel>
          {this.v1}
        </Card>
        <Card shadow>
          <Card.Header>
            gap
          </Card.Header>
          <Carousel gap={this.gap} loop direction="vertical" ref="carousel" center={this.center} style={{ height: '200px', background: '#aaa' }}>
            <div class="vertical-demo-item">1</div>
            <div class="vertical-demo-item">2</div>
            <div class="vertical-demo-item">3</div>
            <div class="vertical-demo-item">4</div>
          </Carousel>
          <p>
            <Button type="primary" size="md" inline onClick={(e) => {
              e.stopPropagation();
              (this.$refs.carousel as any).prev();
            }}>Prev</Button>
            <Button inline size="md" onClick={(e) => {
              e.stopPropagation();
              (this.$refs.carousel as any).next();
            }}>Next</Button>
          </p>
        </Card>
        <Card shadow>
          <Card.Header>
            step perPage center
          </Card.Header>
          <Carousel value={3} direction="vertical" gap="1em" center loop perPage={2} moveStep={1} style={{ background: '#aaa', height: '200px' }}>
            <div class="vertical-demo-item">1</div>
            <div class="vertical-demo-item">2</div>
            <div class="vertical-demo-item">3</div>
            <div class="vertical-demo-item">4</div>
            <div class="vertical-demo-item">5</div>
            <div class="vertical-demo-item">6</div>
          </Carousel>
        </Card>
        <Card shadow>
          <Card.Header>
            autoSize
          </Card.Header>
          <Carousel direction="vertical" autoSize style={{ background: '#aaa', height: '200px' }}>
            <div class="basic-demo-item" style={{ height: '200px' }}>1</div>
            <div class="basic-demo-item" style={{ height: '100px' }}>2</div>
            <div class="basic-demo-item" style={{ height: '400px' }}>3</div>
            <div class="basic-demo-item" style={{ height: '400px' }}>4</div>
          </Carousel>
        </Card>
        <Card shadow>
          <Card.Header>
            autoplay
          </Card.Header>
          <Carousel autoplay direction="vertical" style={{ background: '#aaa', height: '200px' }}>
            <div class="vertical-demo-item">1</div>
            <div class="vertical-demo-item">2</div>
            <div class="vertical-demo-item">3</div>
            <div class="vertical-demo-item">4</div>
          </Carousel>
        </Card>
        <Card shadow>
          <Card.Header>
            autoplay loop
          </Card.Header>
          <Carousel loop direction="vertical" autoplay style={{ background: '#aaa', height: '200px' }}>
            <div class="vertical-demo-item">1</div>
            <div class="vertical-demo-item">2</div>
            <div class="vertical-demo-item">3</div>
            <div class="vertical-demo-item">4</div>
          </Carousel>
        </Card>
      </div>
    );
  },
});
