import { mount } from '@vue/test-utils';
import Vue from 'vue';
import Collapse from '..';


/**
 * 组件单元测试要点：
 * 1. 保证DOM结构正确
 * 2. 事件触发正确
 */

describe('Collapse', () => {
  it('render correct', () => {
    const Component = Vue.extend({
      render() {
        return (
          <Collapse value={1}>
            <Collapse.Item key={1}></Collapse.Item>
          </Collapse>
        );
      },
    });
    const wrapper = mount(Component);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should remove expandIcon', () => {
    const Component = Vue.extend({
      render() {
        return (
          <Collapse expandIcon={null}>
            <Collapse.Item title={'should remove expandIcon'} key={1}></Collapse.Item>
          </Collapse>
        );
      },
    });
    const wrapper = mount(Component);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('v-model value', () => {
    const Component = Vue.extend({
      data() {
        return {
          active: [1],
        };
      },
      render() {
        return (
          <Collapse v-model={this.active}>
            <Collapse.Item title="should open panel" key={1}></Collapse.Item>
            <Collapse.Item title="should open panel" key={2}></Collapse.Item>
            <Collapse.Item title="should open panel" key={3}></Collapse.Item>
          </Collapse>
        );
      },
    });
    const wrapper = mount(Component);
    wrapper.setData({ active: [2] });
    setTimeout(() => {
      expect(wrapper.findAll('.ohu-collapse-item').at(1).contains('.is-expand')).toBe(true);
    }, 0);
  });

  it('v-model `change` event', () => {
    const func = jest.fn();
    const Component = Vue.extend({
      render() {
        return (
          <Collapse onChange={func}>
            <Collapse.Item title="1" key="1"></Collapse.Item>
            <Collapse.Item title="2" key="2"></Collapse.Item>
          </Collapse>
        );
      },
    });
    const wrapper = mount(Component);
    wrapper.find('.ohu-collapse-item__header').trigger('click');
    expect(func).toBeCalled();
  });

  it('should open panel', () => {
    const Component = Vue.extend({
      data() {
        return {
          active: [1],
        };
      },
      render() {
        return (
          <Collapse v-model={this.active}>
            <Collapse.Item title="should open panel" key={1}></Collapse.Item>
            <Collapse.Item title="should open panel" key={2}></Collapse.Item>
            <Collapse.Item title="should open panel" key={3}></Collapse.Item>
          </Collapse>
        );
      },
    });
    const wrapper = mount(Component);
    const items = wrapper.findAll('.ohu-collapse-item__header');
    items.at(0).trigger('click');
    items.at(1).trigger('click');
    items.at(2).trigger('click');
    setTimeout(() => {
      expect(wrapper.vm.active).toBe([1, 2, 3]);
    }, 300);
  });

  it('should open one panel in `accordion` mode', () => {
    const Component = Vue.extend({
      render() {
        return (
          <Collapse accordion value={1}>
            <Collapse.Item title="1" key={1}>1</Collapse.Item>
            <Collapse.Item title="2" key={2}>2</Collapse.Item>
            <Collapse.Item title="3" key={3}>3</Collapse.Item>
          </Collapse>
        );
      },
    });
    const wrapper = mount(Component);
    const items = wrapper.findAll('.ohu-collapse-item');
    expect(items.length).toBe(3);
    if (items.length > 0) {
      expect(items.at(0).contains('.is-expand')).toBe(true);
      wrapper.findAll('.ohu-collapse-item__header').at(1).trigger('click');
      setTimeout(() => {
        expect(items.at(0).contains('.is-expand')).toBe(false);
        expect(items.at(1).contains('.is-expand')).toBe(true);
      }, 300);
    }
  });
});
