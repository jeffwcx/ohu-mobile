import props from 'vue-strict-prop';
import { EsModuleComponent } from 'vue/types/options';
import { LazyloadScopedSlots, LazyloadEvents, LazyloadTransitions, LazyloadProps } from './types';
import { VNode } from 'vue';
import { ImgHTMLAttributes } from 'vue-tsx-support/types/dom';
import { $prefix } from '../_config/variables';
import { defineComponent } from '../_utils/defineComponent';

const animations = {
  fade: `${$prefix}lazyload-fade`,
  none: '',
};


const Lazyload = defineComponent<LazyloadProps, LazyloadEvents, LazyloadScopedSlots>('lazyload')
  .create({
    props: {
      disabled: props(Boolean).default(false),
      rootElement: props.ofType<Element | null>().default(null),
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
        observer: null,
      } as {
        hasLoaded: boolean;
        asyncNode: (null | VNode);
        asyncError: Error | null;
        hasImageLoaded: boolean;
        observer: null | IntersectionObserver;
      };
    },
    watch: {
      src() {
        this.init();
      },
      asyncComponent() {
        this.init();
      },
    },
    methods: {
      init() {
        this.initState();
        if (this.disabled) {
          this.reload();
          return;
        }
        this.initObserver();
      },
      initState() {
        this.asyncError = null;
        this.hasLoaded = false;
        this.hasImageLoaded = false;
      },
      reload() {
        this.initState();
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
        this.destroyObserver();
        const observer = new IntersectionObserver((entries, observer) => {
          if (entries[0]) {
            if (entries[0].isIntersecting && entries[0].intersectionRatio > 0) {
              this.reload();
              observer.unobserve(this.$el);
            }
          }
        }, {
          root: this.rootElement,
          rootMargin: this.rootMargin,
          threshold: this.threshold,
        });
        this.observer = observer;
        observer.observe(this.$el);
        this.$on('hook:beforeDestroy', () => {
          this.destroyObserver();
        });
      },
      destroyObserver() {
        if (this.observer) {
          this.observer.disconnect();
          this.observer = null;
        }
      },
    },
    mounted() {
      this.init();
    },
    render() {
      const root = this.root();
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
        return <div class={root}>{error}</div>;
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
        <transition-group class={root} name={animations[animation]} tag={this.tag}>
          {node}
        </transition-group>
      );
    },
  });

export default Lazyload;
