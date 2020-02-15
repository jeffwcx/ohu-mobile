import { defineComponent } from '../defineComponent';
import { BlockContext } from '../classHelper';
import { mount } from '@vue/test-utils';



interface TestProps {
  hasIcon?: boolean;
}

interface InnerProps {
  _p: string;
}

describe('defineComponent API', () => {
  it('bem test', () => {
    const Button = defineComponent<TestProps, {}, {}, InnerProps>('button')
      .create({
        props: {
          hasIcon: {
            type: Boolean,
            default: false,
          },
        },
        render() {
          let root = this.root();
          expect(root).toBeInstanceOf(BlockContext);
          expect(this.bem).toHaveProperty('block');
          this.hasIcon && root.has('icon');
          const inner = root.element('inner');
          return (
            <div class={root}>
              <div class={inner}></div>
            </div>
          );
        },
      });
    const w = mount(Button, { propsData: { hasIcon: true } });
    expect(w.html()).toBe(`<div class="ohu-button has-icon">
  <div class="ohu-button__inner"></div>
</div>`);
    expect((Button as any).options.name).toBe('ohu-button');
  });
});
