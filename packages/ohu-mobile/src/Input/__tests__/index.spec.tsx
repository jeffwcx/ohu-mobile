import { mount } from '@vue/test-utils';
import Vue from 'vue';
import Input from '..';
import EditBoxFilled from '@ohu-mobile/icons/lib/EditBoxFilled';
import Button from '../../Button';

describe('Input', () => {
  it('basic', () => {
    const wrapper = mount(Input, {});
    expect(wrapper.element).toMatchSnapshot();
  });
  it('v-model', () => {
    const Test = Vue.extend({
      data() {
        return {
          value: '1',
        };
      },
      render() {
        return (
          <Input v-model={this.value} />
        );
      },
    });
    const wrapper = mount(Test);
    wrapper.vm.value = '2';
    setTimeout(() => {
      let input = wrapper.find('input').element as HTMLInputElement;
      expect(input.value).toEqual('2');
      wrapper.find('input').trigger('input', { target: { value: '1' }, composing: false  });
      setTimeout(() => {
        expect(wrapper.vm.value).toEqual('1');
      }, 0);
    }, 0);
  });
  it('allowClear', () => {
    const func = jest.fn();
    const Test = Vue.extend({
      data() {
        return {
          value: '1',
        };
      },
      render() {
        return (
          <Input v-model={this.value} allowClear onClear={func} />
        );
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
        return (
          <Input type="password" />
        );
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
        cols: 4
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

  it('focus and blur event', () => {
    const blurFunc = jest.fn();
    const focusFunc = jest.fn();
    const Test = Vue.extend({
      render() {
        return (
          <Input type="text" onBlur={blurFunc} onFocus={focusFunc} />
        );
      },
    });
    const wrapper = mount(Test);
    wrapper.find('input').trigger('focus');
    expect(focusFunc).toBeCalled();
    wrapper.find('input').trigger('blur');
    expect(blurFunc).toBeCalled();
  });

  it('enter event', () => {
    const func = jest.fn();
    const Test = Vue.extend({
      render() {
        return (
          <Input onEnter={func} />
        );
      },
    });
    const wrapper = mount(Test);
    wrapper.find('input').trigger('keydown.enter');
    expect(func).toBeCalled();
  });

  it('event valueChange and change', () => {
    const valueChangeFunc = jest.fn();
    const changeFunc = jest.fn();
    const Test = Vue.extend({
      data() {
        return {
          value: '',
        };
      },
      render() {
        return (
          <Input value={this.value} onValueChange={valueChangeFunc} onChange={changeFunc} />
        );
      },
    });
    const wrapper = mount(Test);
    const input = wrapper.find('input').element as HTMLInputElement;
    input.value = 'value';
    wrapper.find('input').trigger('change');
    setTimeout(() => {
      expect(valueChangeFunc).toBeCalled();
      expect(changeFunc).toBeCalled();
    }, 0);
  });

});
