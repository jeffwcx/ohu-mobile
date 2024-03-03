import Loading, { LoadingProps } from '../Loading';
import localeMixin from '../_utils/localeMixin';
import { ListProps, ListEvents } from './types';
import { defineComponent, props } from '../_utils/defineComponent';
import { reachBottom } from '../_utils/bom';
import { VueConstructor } from 'vue/types/umd';

export const listProps = {
  loading: props(Boolean).default(false),
  loadingProps: props<LoadingProps>(Object).default(() => ({})),
  finished: props(Boolean).default(false),
  finishedText: String,
  scrollContainer:
    props.ofType<(self: InstanceType<VueConstructor>) => Element>().optional,
  infinite: props(Boolean).default(false),
  infiniteDistance: props(Number).default(50),
  infiniteCheck: props(Boolean).default(true),
};

export default defineComponent<ListProps, ListEvents>('list')
  .mixin(localeMixin('OhuList'))
  .create({
    props: listProps,
    data() {
      return {
        scrollHandler: null as (() => void) | null,
        scroller: window as Window | Element,
      };
    },
    watch: {
      infinite(cur) {
        if (cur) {
          this.registryScroll();
        } else {
          this.clearHandler();
        }
      },
    },
    methods: {
      registryScroll() {
        if (this.scrollContainer instanceof Function) {
          this.scroller = this.scrollContainer(this);
        }
        let handler = () => {
          if (this.finished) {
            this.scroller.removeEventListener('scroll', handler);
          }
          if (reachBottom(this.scroller, this.infiniteDistance)) {
            this.$emit('infinite');
          }
        };
        this.scrollHandler = handler;
        if (this.infiniteCheck) {
          handler();
        }
        this.scroller.addEventListener('scroll', this.scrollHandler);
        this.$once('hook:beforeDestroy', () => {
          this.clearHandler();
        });
      },
      clearHandler() {
        if (this.scrollHandler) {
          this.scroller.removeEventListener('scroll', this.scrollHandler);
          this.scrollHandler = null;
        }
      },
    },
    mounted() {
      if (this.infinite) {
        this.registryScroll();
      }
    },
    render() {
      const root = this.$rootCls();
      const { $slots, loading, loadingProps, finished, finishedText } = this;
      const loadingNode = $slots.loading || (
        <Loading {...{ props: loadingProps }} />
      );
      return (
        <ul class={root} role="feed">
          {$slots.default}
          <div class={root.element('bottom')}>
            {loading && loadingNode}
            {finished && (
              <span>{finishedText || this.$l.defaultFinishedText}</span>
            )}
          </div>
        </ul>
      );
    },
  });
