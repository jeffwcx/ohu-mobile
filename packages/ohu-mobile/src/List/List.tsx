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
  scrollContainer: props.ofType<(self: InstanceType<VueConstructor>) => Element>().optional,
  infinite: props(Boolean).default(false),
  infiniteDistance: props(Number).default(50),
  infiniteCheck: props(Boolean).default(true),
};


export default defineComponent<ListProps, ListEvents>('list')
  .mixin(localeMixin('OhuList'))
  .create({
    props: listProps,
    methods: {
      registryScroll() {
        let scroller: Window | Element = window;
        if (this.scrollContainer instanceof Function) {
          scroller = this.scrollContainer(this);
        }
        let handler = () => {
          if (this.finished) {
            scroller.removeEventListener('scroll', handler);
          }
          if (reachBottom(window, this.infiniteDistance)) {
            this.$emit('infinite');
          }
        };
        if (this.infiniteCheck) {
          handler();
        }
        scroller.addEventListener('scroll', handler);
        this.$once('hook:beforeDestroy', () => {
          scroller.removeEventListener('scroll', handler);
        });
      },
    },
    mounted() {
      if (this.infinite) {
        this.registryScroll();
      }
    },
    render() {
      const root = this.root();
      const {
        $slots,
        loading,
        loadingProps,
        finished,
        finishedText,
      } = this;
      const loadingNode = $slots.loading || <Loading {...{props: loadingProps}} />;
      return (
        <ul class={root} role="feed">
          {$slots.default}
          <div class={root.element('bottom')}>
            {loading && loadingNode}
            {
              finished
              &&
              <span>{finishedText || this.$l.defaultFinishedText}</span>
            }
          </div>
        </ul>
      );
    },
  });
