import { mount } from '@vue/test-utils';
import Vue from 'vue';
import IndexList from '..';
import { describe, it, expect } from 'vitest';

describe('IndexList', () => {
  it('Custom `indexes` should work', () => {
    const Component = Vue.extend({
      render() {
        return (
          <IndexList indexes={[1, 3]}>
            <IndexList.Group index={1} title="">
              <IndexList.Item>test</IndexList.Item>
            </IndexList.Group>
            <IndexList.Group index={2} title="">
              <IndexList.Item>test</IndexList.Item>
            </IndexList.Group>
            <IndexList.Group index={3} title="">
              <IndexList.Item>test</IndexList.Item>
            </IndexList.Group>
          </IndexList>
        );
      },
    });
    const wrapper = mount(Component);
    const nodes = wrapper.findAll('.ohu-index-list__bar ul li span');
    expect(nodes.length).toBe(2);
  });
});
