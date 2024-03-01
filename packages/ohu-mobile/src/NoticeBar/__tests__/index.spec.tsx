import { VolumeDownOutlined } from '@ohu-mobile/icons';
import { config, mount } from '@vue/test-utils';
import NoticeBar from '..';
import { wait } from '../../_utils/test';
import { describe, it, expect, vi } from 'vitest';

describe('NoticeBar', () => {
  // events
  it('close event', async () => {
    const onClose = vi.fn();
    const onClick = vi.fn();
    const wrapper = mount(NoticeBar, {
      propsData: {
        action: 'closable',
        text: 'Text',
      },
      listeners: {
        close: onClose,
        click: onClick,
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
    await wrapper.find('[role=button]').trigger('click');
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledTimes(0);
    expect(wrapper.isVisible()).toBeFalsy();
    await wrapper.trigger('click');
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  // props
  it('multiline', async () => {
    const wrapper = mount(NoticeBar, {
      propsData: {
        text: 'longtextlongtextlongtextlongtextlongtextlongtextlongtextlongtextlongtextlongtext',
      },
    });
    expect(
      wrapper.find('.ohu-notice-bar__text').classes('is-inline'),
    ).toBeTruthy();
    await wrapper.setProps({ multiline: true });
    expect(
      wrapper.find('.ohu-notice-bar__text').classes('is-wrap'),
    ).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('set icon', () => {
    const wrapper = mount(NoticeBar, {
      propsData: {
        icon: VolumeDownOutlined,
        text: 'Text',
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('action', () => {
    const wrapper = mount(NoticeBar, {
      propsData: {
        action: 'link',
      },
      slots: {
        icon: 'S',
        default: 'Text',
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
  config.showDeprecationWarnings = false;
  it('scrollable', async () => {
    const wrapper = mount(NoticeBar, {
      propsData: {
        text: 'longtextlongtextlongtextlongtextlongtextlongtextlongtextlongtextlongtextlongtext',
        scrollable: true,
      },
      methods: {
        setMarqueeWidth() {
          return {
            marqueeWidth: 543,
            marqueeContainerWidth: 524,
          };
        },
      },
    });
    await wait(1000);
    const inner = wrapper.find('.ohu-notice-bar__text div');
    const innerEl = inner.element as HTMLDivElement;
    const transformText = innerEl.style['transform'];
    expect(transformText).toBe('translate3d(-543px, 0, 0)');
    await inner.trigger('transitionend');
    expect(innerEl.style['transform']).toBe('translate3d(524px, 0, 0)');
    await wait(300);
    expect(innerEl.style['transform']).toBe('translate3d(-543px, 0, 0)');
  });

  it('deactivated and activated', async () => {
    const wrapper = mount(NoticeBar, {
      propsData: {
        text: 'longtext longtext longtext longtext',
        scrollable: true,
        offset: '30%',
      },
    });
    const width =
      wrapper.vm.$data.marqueeContainerWidth + wrapper.vm.$data.marqueeWidth;
    await wait(1200);
    wrapper.vm.$emit('hook:deactivated');
    await wait(200);
    wrapper.vm.$emit('hook:activated');
    await wait(200);
    expect(wrapper.vm.$data.marqueeMoveDistance).toEqual(width);
  });
});
