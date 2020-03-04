import Lazyload, { LazyloadProps } from '../Lazyload';
import { VNodeData } from 'vue';
import Skeleton from '../Skeleton';
import { ImageEvents, ImageScopedSlots, ImageProps } from './types';
import localeMixin from '../_utils/localeMixin';
import { ImgHTMLAttributes } from 'vue-tsx-support/types/dom';
import { defineComponent, props } from '../_utils/defineComponent';


export default defineComponent<ImageProps, ImageEvents, ImageScopedSlots>('image')
  .mixin(localeMixin('OhuImage'))
  .create({
    props: {
      src: props(String).default(''),
      alt: props(String).default(''),
      width: props(String).default(''),
      height: props(String).default(''),
      fit: props.ofStringLiterals('contain', 'cover', 'fill', 'scale-down', 'none').optional,
      lazy: props.ofType<Omit<LazyloadProps, 'src' | 'asyncComponent'> | boolean>().default(false),
      reload: props(Boolean).default(false),
      reloadStopPropagation: props(Boolean).default(false),
      round: props(Boolean).default(false),
      errorTip: props(String, Boolean).optional,
    },
    render() {
      const root = this.root();
      const { $slots, $scopedSlots, $listeners,
        lazy, src, alt, width, height, fit, errorTip, round,
      } = this;
      root.is([ round && 'round' ])
      const placeholderClass = root.element('placeholder');
      const placeholder = $slots.placeholder ? (
        <div class={placeholderClass} slot="placeholder">
          {$slots.placeholder}
        </div>
      ) : (
        <Skeleton slot="placeholder" class={placeholderClass}>
          <Skeleton shape="rect"></Skeleton>
        </Skeleton>
      );
      const lazyloadProps: VNodeData = {
        class: root,
        style: { width, height },
        on: $listeners,
        scopedSlots: {
          error: $scopedSlots.error || (({ reload }) => {
            return (
              <div class={root.element('error')} onClick={(e) => {
                if (this.reload) {
                  if (this.reloadStopPropagation) {
                    e.stopPropagation()
                  }
                  reload();
                  this.$emit('reload');
                }
              }}>
                {
                  errorTip === true
                    ? this.$l['defaultErrorTip']
                    : (errorTip !== undefined && errorTip)
                }
              </div>
            );
          }),
        },
      };
      const imgAttrs: ImgHTMLAttributes = { alt };
      let props: LazyloadProps;
      if (lazy) {
        props = typeof lazy === 'boolean'
          ? { src, imgAttrs, imgStyle: { objectFit: fit } }
          : { src, imgAttrs, ...lazy };

      } else {
        props = { disabled: true, src, imgAttrs };
      }
      if (fit) {
        props.imgStyle = {
          objectFit: fit,
        };
      }
      lazyloadProps.props = props;
      return (
        <Lazyload {...lazyloadProps}>
          {placeholder}
        </Lazyload>
      );
    },
  });
