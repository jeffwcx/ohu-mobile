import { prefix } from '../_utils/shared';
import props from 'vue-strict-prop';
import { componentFactoryOf } from 'vue-tsx-support';
import './styles/index.scss';
import { EsModuleComponent } from 'vue/types/options';
import { LazyloadScopedSlots, LazyloadEvents, LazyloadTransitions } from './types';
import { VNode } from 'vue';
import { ImgHTMLAttributes } from 'vue-tsx-support/types/dom';


const baseLazyloadName = `${prefix}lazyload`;

const animations = {
  fade: `${prefix}lazyload-fade`,
  none: '',
};


const Lazyload = componentFactoryOf<LazyloadEvents, LazyloadScopedSlots>().create({
  name: baseLazyloadName,
  props: {
    disabled: props(Boolean).default(false),
    root: props.ofType<Element | null>().default(null),
    threshold: props(Number).default(0.01),
    rootMargin: props(String).default('0px'),
    tag: props(String).default('div'),
    src: props(String).default(''),
    asyncComponent: props.ofType<(() => Promise<EsModuleComponent>) | null>().default(null),
    imgAttrs: props.ofType<ImgHTMLAttributes>().optional,
    imgStyle: props.ofType<Partial<CSSStyleDeclaration>>().optional,
    animation: props.ofType<LazyloadTransitions>().default('fade'),
  },
  data() {
    return {
      hasLoaded: false,
      asyncNode: null,
      asyncError: null,
      hasImageLoaded: false,
    } as {
      hasLoaded: boolean;
      asyncNode: (null | VNode);
      asyncError: Error | null;
      hasImageLoaded: boolean;
    };
  },
  methods: {
    reload() {
      this.asyncError = null;
      this.hasLoaded = false;
      this.hasImageLoaded = false;
      this.$nextTick(() => {
        this.loadAsync();
      });
    },
    loadAsync() {
      if (this.asyncComponent) {
        this.asyncComponent()
          .then((data) => {
            this.$emit('loaded');
            this.asyncNode = this.$createElement(data.default);
          })
          .catch((error) => {
            this.$emit('error', error);
            this.asyncError = error;
          })
          .finally(() => {
            this.hasLoaded = true;
          });
      } else if (this.src) {
        this.asyncNode = this.$createElement('img', {
          attrs: {
            src: this.src,
            ...this.imgAttrs,
          },
          style: this.imgStyle,
          on: {
            error: (error: Error) => {
              this.$emit('error', error);
              this.asyncError = error;
              this.hasImageLoaded = true;
            },
            load: () => {
              this.$emit('loaded');
              this.hasImageLoaded = true;
            },
          },
        });
      } else {
        this.hasLoaded = true;
      }
    },
    initObserver() {
      const observer = new IntersectionObserver((entries, observer) => {
        if (entries[0]) {
          if (entries[0].isIntersecting && entries[0].intersectionRatio > 0) {
            this.reload()
            observer.unobserve(this.$el);
          }
        }
      }, {
        root: this.root,
        rootMargin: this.rootMargin,
        threshold: this.threshold,
      });
      observer.observe(this.$el);
      this.$on('hook:beforeDestroy', () => {
        observer.disconnect();
      });
    },
  },
  mounted() {
    if (this.disabled) {
      this.reload();
      return;
    }
    this.initObserver();
  },
  render() {
    const { $slots, $scopedSlots,
      hasLoaded, asyncNode, asyncError, reload,
      hasImageLoaded, animation,
    } = this;
    const content = $scopedSlots.default
      ? $scopedSlots.default(hasLoaded)
      : ($slots.default && $slots.default[0]);
    const placeholder = $slots.placeholder && $slots.placeholder[0];
    const error = $scopedSlots.error
      ? $scopedSlots.error({ reload, error: asyncError || undefined })
      : ($slots.error && $slots.error[0]);
    if (asyncError) {
      return <div class={baseLazyloadName}>{error}</div>;
    }
    let node;
    if (this.src) {
      node = [
        <div key="content">{asyncNode}</div>,
        hasImageLoaded ||
        <div key="placeholder" style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}>{ placeholder }</div>
      ];
    } else {
      node = hasLoaded
        ? <div key="content">{ asyncNode || content }</div>
        : <div key="placeholder">{placeholder}</div>;
    }
    return (
      <transition-group class={baseLazyloadName} name={animations[animation]} tag={this.tag}>
        {node}
      </transition-group>
    );
  },
});

export default Lazyload;
