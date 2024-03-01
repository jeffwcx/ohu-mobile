import { mount } from '@vue/test-utils';
import Vue from 'vue';
import Input from '..';
import EditBoxFilled from '@ohu-mobile/icons/lib/EditBoxFilled';
import Button from '../../Button';
import { describe, it, expect, vi } from 'vitest';

function createDiv() {
  const div = document.createElement('div');
  document.body.appendChild(div);
  return div;
}

describe('Input', () => {
  it('basic', () => {
    const wrapper = mount(Input, {});
    expect(wrapper.element).toMatchSnapshot();
  });
  it('v-model', async () => {
    const Test = Vue.extend({
      data() {
        return {
          value: '1',
        };
      },
      render() {
        return <Input v-model={this.value} />;
      },
    });
    const wrapper = mount(Test);
    await wrapper.setData({
      value: '2',
    });
    const input = wrapper.find('input').element as HTMLInputElement;
    expect(input.value).toEqual('2');
    input.value = '1';
    await wrapper.find('input').trigger('input');
    expect(wrapper.vm.value).toEqual('1');
  });
  it('allowClear', () => {
    const func = vi.fn();
    const Test = Vue.extend({
      data() {
        return {
          value: '1',
        };
      },
      render() {
        return <Input v-model={this.value} allowClear onClear={func} />;
      },
    });
    const wrapper = mount(Test);
    wrapper.vm.value = '2';
    expect(wrapper.element).toMatchSnapshot();
    wrapper.find('.ohu-input__adornment button').trigger('click');
    setTimeout(() => {
      expect(wrapper.vm.value).toEqual('');
      expect(func).toBeCalled();
    });
  });

  it('allowTogglePassword', () => {
    const Test = Vue.extend({
      render() {
        return <Input type="password" />;
      },
    });
    const wrapper = mount(Test);
    expect(wrapper.element).toMatchSnapshot();
    const input = wrapper.find('input').element as HTMLInputElement;
    input.value = 'password';
    wrapper.find('button').trigger('click');
    Vue.nextTick(() => {
      expect(input.type).toBe('text');
      wrapper.find('button').trigger('click');
      Vue.nextTick(() => {
        expect(wrapper.element).toMatchSnapshot();
        expect(input.type).toBe('password');
      });
    });
  });

  it('outline', () => {
    const wrapper = mount(Input, {
      propsData: {
        outline: true,
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('noBorder', () => {
    const wrapper = mount(Input, {
      propsData: {
        noBorder: true,
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('adornment', () => {
    const wrapper = mount(Input, {
      propsData: {
        startAdornment: 'kg',
        endAdornment: EditBoxFilled,
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('buttonAdornment', () => {
    const wrapper = mount(Input, {
      slots: {
        endAdornment: Button,
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('textarea', () => {
    const wrapper = mount(Input, {
      propsData: {
        type: 'textarea',
        rows: 2,
        cols: 4,
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('disabled and readony', () => {
    const wrapper = mount(Input, {
      propsData: {
        disabled: true,
        readonly: true,
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('focus and blur event', async () => {
    const blurFunc = vi.fn();
    const focusFunc = vi.fn();
    const wrapper = mount(Input, {
      propsData: {
        type: 'text',
      },
      listeners: {
        blur: blurFunc,
        focus: focusFunc,
      },
      attachTo: createDiv(),
    });
    await wrapper.find('input').trigger('focus');
    expect(focusFunc).toBeCalled();
    await wrapper.find('input').trigger('blur');
    expect(blurFunc).toBeCalled();
  });

  it('enter event', async () => {
    const func = vi.fn();
    const Test = Vue.extend({
      render() {
        return <Input onEnter={func} />;
      },
    });
    const wrapper = mount(Test);
    await wrapper.find('input').trigger('keydown.enter');
    expect(func).toBeCalled();
  });

  it('event valueChange and change', async () => {
    const valueChangeFunc = vi.fn();
    const changeFunc = vi.fn();
    const wrapper = mount(Input, {
      listeners: {
        valueChange: valueChangeFunc,
        change: changeFunc,
      },
      attachTo: createDiv(),
    });
    const input = wrapper.find('input').element as HTMLInputElement;
    input.value = 'value';
    await wrapper.find('input').trigger('input');
    expect(valueChangeFunc).toBeCalled();
    expect(changeFunc).toBeCalled();
  });
});
