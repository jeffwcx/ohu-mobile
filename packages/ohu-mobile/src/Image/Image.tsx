import { componentFactoryOf } from 'vue-tsx-support';
import props from 'vue-strict-prop';
import Lazyload, { LazyloadProps } from '../Lazyload';
import { VNodeData } from 'vue';
import Skeleton from '../Skeleton';
import { ImageEvents, ImageScopedSlots } from './types';
import localeMixin from '../_utils/localeMixin';
import { ImgHTMLAttributes } from 'vue-tsx-support/types/dom';
import { $prefix } from '../_config/variables';

const baseImageName = `${$prefix}image`;
const imagePlaceholderCls = `${baseImageName}__placeholder`;
const imageErrorCls = `${baseImageName}__error`;

export default componentFactoryOf<ImageEvents, ImageScopedSlots>().mixin(localeMixin('OhuImage')).create({
  name: baseImageName,
  props: {
    src: props(String).default(''),
    alt: props(String).default(''),
    width: props(String).default(''),
    height: props(String).default(''),
    fit: props.ofStringLiterals('contain', 'cover', 'fill', 'scale-down', 'none').optional,
    lazy: props.ofType<Omit<LazyloadProps, 'src' | 'asyncComponent'> | boolean>().default(false),
    errorTip: props(String).default(''),
  },
  render() {
    const { $slots, $scopedSlots, $listeners,
      lazy, src, alt, width, height, fit, errorTip,
    } = this;
    const placeholder = $slots.placeholder ? (
      <div class={imagePlaceholderCls} slot="placeholder">
        {$slots.placeholder}
      </div>
    ) : (
      <Skeleton slot="placeholder" class={imagePlaceholderCls}>
        <Skeleton shape="rect"></Skeleton>
      </Skeleton>
    );
    const lazyloadProps: VNodeData = {
      class: baseImageName,
      style: { width, height },
      on: $listeners,
      scopedSlots: {
        error: $scopedSlots.error || (({ reload }) => {
          return (
            <div class={imageErrorCls} onClick={() => {
              reload();
              this.$emit('reload');
            }}>
              {errorTip || this.$l['defaultErrorTip']}
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
