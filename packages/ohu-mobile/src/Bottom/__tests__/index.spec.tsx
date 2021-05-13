import { mount, config } from '@vue/test-utils';
import Bottom from '..';
import Card from '../../Card';

config.stubs!.transition = false;

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
