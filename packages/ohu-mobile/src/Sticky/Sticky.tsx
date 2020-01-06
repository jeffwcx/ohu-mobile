import { prefix } from '../_utils/shared';
import props from 'vue-strict-prop';
import { componentFactoryOf } from 'vue-tsx-support';
import stickyPolyfill, { StickyBits } from 'stickybits';
import { StickyEvents } from './types';
import './styles/index.scss';

const eventMap = {
  default: 'normal',
  sticky: 'fixed',
  stuck: 'stuck',
};

const baseStickyName = `${prefix}sticky`;
export default componentFactoryOf<StickyEvents>().create({
  name: baseStickyName,
  props: {
    top: props(Number).default(0),
    bottom: props(Number).optional,
    disableEvents: props(Boolean).default(false),
    useFixed: props(Boolean).default(false),
    tag: props(String).default('div'),
  },
  computed: {
    options() {
      const stickyOptions: StickyBits.Options = {
        useStickyClasses: !this.disableEvents,
        useFixed: this.useFixed,
        applyStyle: (_, instance) => {
          const state = instance.state;
          if (state && eventMap[state]) {
            this.$emit(eventMap[state], state);
          }
        },
      };
      if (this.top !== undefined) {
        stickyOptions.stickyBitStickyOffset = this.top;
      }
      if (this.bottom !== undefined) {
        stickyOptions.stickyBitStickyOffset = this.bottom;
        stickyOptions.verticalPosition = 'bottom';
      }
      return stickyOptions;
    },
  },
  mounted() {
    const el = this.$refs.stickyEl as HTMLElement;
    if (el) {
      const instance = stickyPolyfill(el, this.options);
      this.$once('hook:updated', () => {
        instance.update(this.options);
      });
      this.$once('hook:beforeDestroy', () => {
        instance.cleanup();
      });
    }
  },
  render(h) {
    const node = this.$slots.default && this.$slots.default[0];
    const style: Partial<CSSStyleDeclaration> = {};
    if (this.bottom !== undefined) {
      style.bottom = this.bottom + 'px';
    } else {
      style.top = this.top + 'px';
    }
    return h(
      this.tag,
      { class: baseStickyName, style, ref: 'stickyEl' },
      [ node ]
    );
  },
});
