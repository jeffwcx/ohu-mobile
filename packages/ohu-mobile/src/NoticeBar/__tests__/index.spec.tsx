import { VolumeDownOutlined } from '@ohu-mobile/icons';
import { config, mount } from '@vue/test-utils';
import NoticeBar from '..';
import { wait } from '../../_utils/test';

describe('NoticeBar', () => {
  // events
  it('close event', async () => {
    const onClose = jest.fn();
    const onClick = jest.fn();
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
    expect(wrapper.find('.ohu-notice-bar__text').classes('is-inline')).toBeTruthy();
    await wrapper.setProps({ multiline: true });
    expect(wrapper.find('.ohu-notice-bar__text').classes('is-wrap')).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('set icon', () => {
    const wrapper = mount(NoticeBar, {
      propsData: {
        icon: VolumeDownOutlined,
        text: 'Text'
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('action', () => {
    const wrapper = mount(NoticeBar, {
      propsData: {
        action: 'link'
      },
      slots: {
        icon: 'S',
        default: 'Text'
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
  config.showDeprecationWarnings = false;
  it('scrollable', async () => {
    const setW = jest.fn().mockImplementation(() => {
      wrapper.setData({
        marqueeWidth: 543,
        marqueeContainerWidth: 524,
      });
    });
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
    const transformText = inner.element.style['transform'];
    expect(transformText).toBe('translateX(-543px)');
    await inner.trigger('transitionend');
    expect(inner.element.style['transform']).toBe('translateX(524px)');
    await wait(300);
    expect(inner.element.style['transform']).toBe('translateX(-543px)');
  });

});
