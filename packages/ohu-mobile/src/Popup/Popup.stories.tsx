import Vue from 'vue';

import Popup, { PopupPosition } from './index';
import './style';
import Card from '../Card';
import '../Card/style';
import Button from '../Button';
import '../Button/style';
import { CloseOutlined } from '@ohu-mobile/icons';
import VueRouter from 'vue-router';

export default {
  title: 'Components/FeedBack/Popup',
  parameters: {
    component: Popup,
    options: {
      showPanel: true,
    },
  },
};

export const Basic = () =>
  Vue.extend({
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
            targetStyle={{ width: '8rem', height: '8rem', background: '#fff' }}
          ></Popup>
          <Card shadow>
            <Card.Header>Basic</Card.Header>
            <Button type="primary" onClick={() => (this.v1 = true)}>
              open
            </Button>
          </Card>
        </div>
      );
    },
  });

export const Position = () =>
  Vue.extend({
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
            targetStyle={{ width: '100%', height: '6rem', background: '#fff' }}
          ></Popup>
          <Popup
            v-model={this.v3}
            position="bottom"
            targetStyle={{
              width: '100%',
              height: '6rem',
              overflow: 'scroll',
              background: '#fff',
            }}
          >
            <div style="height: 1000px;">
              <input
                onBlur={() => window.scrollTo(0, 0)}
                type="text"
                style="width: 60px; font-size: 18px;"
              />
            </div>
          </Popup>
          <Popup
            v-model={this.v4}
            position="left"
            targetStyle={{ width: '6rem', height: '100%', background: '#fff' }}
          >
            <Button type="primary" onClick={() => (this.v5 = true)}>
              打开right
            </Button>
          </Popup>
          <Popup
            v-model={this.v5}
            position="right"
            targetStyle={{ width: '6rem', height: '100%', background: '#fff' }}
          >
            <Button type="primary" onClick={() => (this.v4 = true)}>
              打开left
            </Button>
            <Button type="primary" onClick={() => (this.v4 = false)}>
              关闭left
            </Button>
          </Popup>
          <Card shadow>
            <Card.Header>position</Card.Header>
            <Button type="primary" onClick={() => (this.v2 = true)}>
              top
            </Button>
            <Button onClick={() => (this.v3 = true)}>bottom</Button>
            <Button type="primary" onClick={() => (this.v4 = true)}>
              left
            </Button>
            <Button onClick={() => (this.v5 = true)}>right</Button>
          </Card>
        </div>
      );
    },
  });

export const Animate = () =>
  Vue.extend({
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
            usePortal={false}
            animate="zoom"
            targetStyle={{ width: '8rem', height: '8rem', background: '#fff' }}
          ></Popup>
          <Popup
            v-model={this.vzs}
            animate="zoom-scale"
            targetStyle={{ width: '8rem', height: '8rem', background: '#fff' }}
          ></Popup>
          <Popup
            v-model={this.vf}
            animate="fade"
            targetStyle={{ width: '8rem', height: '8rem', background: '#fff' }}
          ></Popup>
          <Card shadow>
            <Card.Header>animate</Card.Header>
            <Button type="primary" onClick={() => (this.vf = true)}>
              fade
            </Button>
            <Button onClick={() => (this.vz = true)}>zoom</Button>
            <Button type="primary" onClick={() => (this.vzs = true)}>
              zoom-scale
            </Button>
          </Card>
        </div>
      );
    },
  });

export const Mask = () =>
  Vue.extend({
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
            targetStyle={{ width: '8rem', height: '8rem', background: 'grey' }}
          ></Popup>
          <Popup
            v-model={this.vmf}
            maskFrosted
            animate="fade"
            targetStyle={{ width: '8rem', height: '8rem', background: '#FFF' }}
          ></Popup>
          <Card shadow>
            <Card.Header>mask</Card.Header>
            <Button type="primary" onClick={() => (this.vm = true)}>
              without mask
            </Button>
            <Button type="translucent" onClick={() => (this.vmf = true)}>
              frosted mask
            </Button>
          </Card>
        </div>
      );
    },
  });

Vue.use(VueRouter);

export const Fullscreen = () =>
  Vue.extend({
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
            targetStyle={{ background: '#FFF' }}
            round
          >
            <Popup.Header center closeIcon={CloseOutlined}>
              标题
            </Popup.Header>
            <div style="height: 200vh"></div>
          </Popup>
          <Card shadow>
            <Card.Header>fullscreen</Card.Header>
            <Button type="primary" onClick={() => (this.vfs = true)}>
              fullscreen
            </Button>
          </Card>
        </div>
      );
    },
  });

const A = Vue.extend({
  data() {
    return {
      visible: false,
    };
  },
  render() {
    return (
      <div class="demo">
        <Popup
          v-model={this.visible}
          animate="slide-down"
          position="bottom"
          targetStyle={{ width: '100%', height: '300px', background: '#FFF' }}
          round
        >
          <Button type="primary" to="/b">
            打开B
          </Button>
        </Popup>
        <Card shadow>
          <Button type="primary" onClick={() => (this.visible = true)}>
            A 打开Popup
          </Button>
        </Card>
      </div>
    );
  },
});
const B = Vue.extend({
  render() {
    return (
      <div class="demo">
        <Button type="primary" to="/a">
          打开A
        </Button>
      </div>
    );
  },
});

const router = new VueRouter({
  mode: 'hash',
  routes: [
    { path: '/a', component: A, alias: '/' },
    { path: '/b', component: B },
  ],
});

export const KeepState = () =>
  Vue.extend({
    router,
    render() {
      return (
        <div class="demo">
          <Card shadow>
            <h1>Keep State</h1>
            <keep-alive>
              <router-view></router-view>
            </keep-alive>
          </Card>
        </div>
      );
    },
  });

export const Scroll = () =>
  Vue.extend({
    data() {
      return {
        v: false,
      };
    },
    render() {
      return (
        <div style="padding: 8px;">
          <Popup
            v-model={this.v}
            scrollBody
            targetStyle={{
              width: '80vw',
              height: '120vh',
              margin: '32px',
              background: '#FFF',
            }}
          >
            <Card>
              <Card.Header>title</Card.Header>
            </Card>
          </Popup>
          <Button type="primary" onClick={() => (this.v = true)}>
            open
          </Button>
        </div>
      );
    },
  });

export const Anchor = () =>
  Vue.extend({
    data() {
      return {
        va: false,
        anchorEl: null,
        position: { vertical: 'bottom', horizontal: 'left' },
      } as {
        va: boolean;
        anchorEl: HTMLElement | null;
        position: PopupPosition;
      };
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
            targetStyle={{
              background: '#FFF',
              width: '200px',
              padding: '10px',
              boxShadow:
                '0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)',
            }}
          >
            <h2>This is PopOver</h2>
            <p>Here is description.</p>
          </Popup>
          <Card shadow>
            <Card.Header>transformOrigin</Card.Header>
            <div style="display: flex; min-height: 200px; flex-flow: row wrap; justify-content: space-between; align-content: space-around;"></div>
          </Card>
          <Card shadow>
            <Card.Header>position</Card.Header>
            <div style="display: flex; min-height: 200px; flex-flow: row wrap; justify-content: space-between; align-content: space-around;">
              <Button
                inline
                type="primary"
                onClick={(e) => this.setAnchor(e, 'top')}
              >
                top
              </Button>
              <Button
                inline
                type="primary"
                onClick={(e) => this.setAnchor(e, 'bottom')}
              >
                bottom
              </Button>
              <Button
                inline
                type="primary"
                onClick={(e) => this.setAnchor(e, 'left')}
              >
                left
              </Button>
              <Button
                inline
                type="primary"
                onClick={(e) => this.setAnchor(e, 'right')}
              >
                right
              </Button>
              <Button
                inline
                type="primary"
                onClick={(e) =>
                  this.setAnchor(e, { vertical: 'top', horizontal: 'left' })
                }
              >
                tl
              </Button>
              <Button
                inline
                type="primary"
                onClick={(e) =>
                  this.setAnchor(e, { vertical: 'top', horizontal: 'right' })
                }
              >
                tr
              </Button>
              <Button
                inline
                type="primary"
                onClick={(e) =>
                  this.setAnchor(e, { vertical: 'bottom', horizontal: 'left' })
                }
              >
                bl
              </Button>
              <Button
                inline
                type="primary"
                onClick={(e) =>
                  this.setAnchor(e, { vertical: 'bottom', horizontal: 'right' })
                }
              >
                br
              </Button>
              <Button
                inline
                type="primary"
                onClick={(e) => this.setAnchor(e, 'center')}
              >
                center
              </Button>
            </div>
          </Card>
        </div>
      );
    },
  });

export const FunctionalInvoke = () =>
  Vue.extend({
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
                <Button inline type="primary" onClick={() => Popup.close()}>
                  关闭
                </Button>
              </div>
            );
          },
        });
      },
    },
    render() {
      return (
        <div>
          <Button type="primary" onClick={this.openModal}>
            function call
          </Button>
        </div>
      );
    },
  });
