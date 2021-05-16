import { CloseOutlined } from '@ohu-mobile/icons';
import { config, mount } from '@vue/test-utils';
import Vue from 'vue';
import Popup from '..';
import Button from '../../Button';
import { wait } from '../../_utils/test';
import VueRouter from 'vue-router';

config.stubs!.transition = false;


function resizeWindow(width: number, height: number) {
  Object.defineProperties(window, {
    innerWidth: { value: width, configurable: true },
    innerHeight: { value: height, configurable: true },
  });
  window.dispatchEvent(new Event('resize'));
}

function createDiv() {
  const div = document.createElement('div');
  document.body.appendChild(div);
  return div;
}

describe('Popup', () => {
  it('v-model and popup-header', async () => {
    const div = createDiv();
    const onClose = jest.fn();
    const onConfirm = jest.fn();
    const wrapper = mount(Vue.extend({
      data() {
        return {
          visible: false,
        };
      },
      render() {
        return (
          <Popup
            v-model={this.visible}
            usePortal={false}
            maskClosable
            zIndex={1000}
            onClose={onClose}
            targetStyle={{ width: '100px', height: '100px' }}>
            <Popup.Header
              title="标题"
              minorText="minorText"
              center
              closeIcon={CloseOutlined}
              confirm
              onConfirm={onConfirm}>
            </Popup.Header>
          </Popup>
        );
      },
    }), {
      attachTo: div,
    });
    wrapper.setData({ visible: true });
    await Vue.nextTick();
    expect(wrapper.html()).toMatchSnapshot();
    await wrapper.find('.ohu-popup-header__cancel').trigger('click');
    expect(onClose).toBeCalledTimes(1);
    expect(wrapper.vm.visible).toBeFalsy();
    await wrapper.find('.ohu-popup-header__ok').trigger('click');
    expect(onConfirm).toBeCalledTimes(1);
    wrapper.destroy();
  });

  it('should add class and style to wrapper when using `targetClass` and `targetStyle`', async () => {
    const div = createDiv();
    const onOpen = jest.fn();
    const wrapper = mount(Popup, {
      propsData: {
        visible: true,
        targetClass: 'cls',
        targetStyle: { width: '50%', height: '200px' },
        usePortal:false,
        zIndex: 1001,
      },
      listeners: {
        open: onOpen,
      },
      slots: {
        default: 'text',
      },
      attachTo: div,
    });
    await Vue.nextTick();
    expect(wrapper.html()).toMatchSnapshot();
    expect(onOpen).toBeCalledTimes(1);
  });

  it('should detect edge in anchor mode', async () => {
    const div = createDiv();
    const mockAnchor = {
      getBoundingClientRect: jest.fn().mockReturnValue({
        bottom: 391,
        height: 48,
        left: 22,
        right: 101,
        top: 343,
        width: 80,
        x: 22,
        y: 343,
      }),
    };
    const wrapper = mount(Vue.extend({
      data() {
        return {
          visible: false,
        };
      },
      render() {
        return (
          <div>
            <Popup
              v-model={this.visible}
              mask
              maskClosable
              position="right"
              transformOrigin={{ vertical: 'bottom', horizontal: 'center' }}
              anchor={() => mockAnchor as any}
              usePortal={false}
              edgeDetect>
              <p>anchor and edge detect</p>
            </Popup>
            <Button onClick={() => this.visible = true}>anchor</Button>
          </div>
        );
      },
    }), {
      attachTo: div,
    });
    await wrapper.find('.ohu-btn').trigger('click');
    await Vue.nextTick();
    const popup = wrapper.find('.ohu-popup').element
    expect(popup.style['top']).toBe('367px');
    expect(popup.style['left']).toBe('102px');
    expect(popup.style['transformOrigin']).toBe('bottom center');
    resizeWindow(100, 500);
    await wait(600);
    expect(popup.style['left']).toBe('88px');
  });

  it('should emit `close` event when mask is clicked', async () => {
    const div = createDiv();
    const onClose = jest.fn();
    const wrapper = mount(Popup, {
      propsData: {
        visible: true,
        zIndex: 1002,
        position: 'bottom',
        fullscreen: true,
        maskFrosted: true,
        usePortal: false,
        tapThrough: true,
      },
      listeners: {
        close: onClose,
      },
      slots: {
        default: Vue.extend({
          render() {
            return (
              <div style="width: 100px;height: 200px;">mask</div>
            );
          },
        }),
      },
      attachTo: div,
    });

    await Vue.nextTick();
    expect(wrapper.html()).toMatchSnapshot();
    await wrapper.find('[role="dialog"]').trigger('click');
    expect(onClose).toBeCalledTimes(1);
  });


  it('should add component to body when use call `open()`', async () => {
    const div = createDiv();
    const afterClose = jest.fn();
    jest.spyOn(document.body, 'appendChild');
    const wrapper = mount(Vue.extend({
      methods: {
        open() {
          Popup.open({
            parent: this,
            animate: 'none',
            onAfterClose: afterClose,
            render() {
              return <p>Function Call</p>;
            },
          });
        },
        close() {
          Popup.close();
        }
      },
      render() {
        return (
          <div>
          </div>
        );
      },
    }), {
      attachTo: div,
    });
    await Vue.nextTick();
    wrapper.vm.open();
    await wait(300);
    expect(document.body.appendChild).toBeCalledWith(expect.objectContaining({
      title: 'TEST',
    }));
    wrapper.vm.close();
    await wait(300);
    expect(afterClose).toBeCalled();
  });

  it('should be closed when mask has been touched', async () => {
    const div = createDiv();
    const onClose = jest.fn();
    const wrapper = mount(Popup, {
      propsData: {
        visible: true,
        closeOnMaskTouched: true,
        fullscreen: true,
        usePortal: false,
        partialMask: 'top',
      },
      slots: {
        default: 'text',
      },
      listeners: {
        close: onClose,
      },
      attachTo: div,
    });
    await Vue.nextTick();
    wrapper.find('[role="document"]').trigger('touchstart');
    wrapper.find('[role="dialog"]').trigger('touchstart');
    await wrapper.find('[role="dialog"]').trigger('touchend');
    expect(onClose).toBeCalled();
  });


  // https://github.com/jeffwcx/ohu-mobile/issues/23
  it('should hide when it changes from deactivated to activated', async () => {
    const div = createDiv();
    const A = Vue.extend({
      render() {
        return (
          <div>
            <Popup
              visible
              scrollBody
              usePortal={false}
              targetStyle={{ height: '120vh', width: '100px' }}>
              A
            </Popup>
          </div>
        );
      },
    });
    const B = Vue.extend({
      render() {
        return <div>B</div>
      },
    });
    const router = new VueRouter({
      mode: 'hash',
      routes: [
        { path: '/', name: 'a', component: A },
        { path: '/b', name: 'b', component: B },
      ],
    });
    Vue.use(VueRouter);
    const wrapper = mount(Vue.extend({
      router,
      methods: {
        pushToB() {
          router.push('/b');
        },
      },
      render() {
        return (
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        );
      },
    }), {
      attachTo: div,
    });
    await wait(300);
    expect(document.body.style.overflow).toBe('hidden');
    wrapper.vm.pushToB();
    await wait(300);
    expect(document.body.style.overflow).toBe('');
  });

});
