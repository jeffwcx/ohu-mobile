import { mount } from '@vue/test-utils';
import Bottom from '..';
import Card from '../../Card';

describe('Bottom', () => {
  it('DOM structure', () => {
    const wrapper = mount(Bottom, {
      slots: {
        default: [
          Card
        ],
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});
