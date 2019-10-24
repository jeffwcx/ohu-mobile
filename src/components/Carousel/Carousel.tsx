import { componentFactoryOf } from 'vue-tsx-support';
import props from 'vue-strict-prop';
import { prefix } from '../_utils/shared';
import SlideRenderer from './renderer/SlideRenderer';
import './styles/index.scss';
import { CarouselChangeEvent, CarouselInitLifeCycle } from './interface';
import FadeRenderer from './renderer/FadeRenderer';

export interface CarouselEvents {
  onChange: CarouselChangeEvent;
  onInput: CarouselChangeEvent;
}

export const carouselBaseName = `${prefix}carousel`;
export const carouselStageCls = `${carouselBaseName}__stage`;
export const carouselIndicatorCls = `${carouselBaseName}__indicator`;
export const carouselIndicatorDotCls = `${carouselIndicatorCls}__dot`;
export const carouselStageWrapper = `${carouselStageCls}-wrapper`;
export const carouselItemCls = `${carouselBaseName}-item`;

const Carousel = componentFactoryOf<CarouselEvents>().create({
  name: carouselBaseName,
  props: {
    value: props(Number).default(0),
    loop: props(Boolean).default(false),
    autoplay: props(Boolean).default(false),
    interval: props(Number).default(3000),
    indicator: props(Boolean).default(true),
    indicatorDarkMode: props(Boolean).default(false),
    width: String,
    height: String,
    mode: props.ofStringLiterals('slide', 'fade').default('slide'),
    // ---- only works in 'slide' mode
    direction: props.ofStringLiterals('vertical', 'horizontal').default('horizontal'),
    rewind: props(Boolean).default(false),
    autoSize: props(Boolean).default(false),
    cover: props(Boolean).default(false),
    perPage: props(Number).validator(v => v > 0).default(1),
    moveStep: Number,
    gap: props(Number, String).default(0),
    center: props(Boolean).default(false),
    easing: props(String).default('cubic-bezier(0.165, 0.84, 0.44, 1)'),
  },
  watch: {
    value: 'action',
  },
  data() {
    return {
      renderInstance: null,
      stageStyle: {},
      stepChange: () => {},
    } as {
      renderInstance: CarouselInitLifeCycle | null;
      stageStyle: object;
      stepChange: Function;
    };
  },
  mounted() {
    this.initStage();
  },
  methods: {
    initStage() {
      const stage = this.$refs.stage as HTMLElement;
      const { loop, $slots } = this;
      if (!stage || !$slots.default || ($slots.default && $slots.default.length === 0) ) return;
      const callback = (event: CarouselChangeEvent) => {
        this.$emit('change', event);
        this.$emit('input', event);
      }
      if (this.mode === 'slide') {
        const { perPage, gap, moveStep, center, easing, direction, autoSize, rewind } = this;
        this.renderInstance = new SlideRenderer({
          perPage, gap,
          center, easing,
          direction, autoSize,
          moveStep,
          pageIndex: this.value,
          stage,
          loop: !autoSize ? loop : false,
          rewind,
          renderChild: (props, children) => {
            props.class = carouselItemCls;
            return <div {...props}>{children}</div>
          },
          renderStage: (props, children) => {
            props.class = {
              [carouselStageCls]: true,
              [`is-${direction}`]: true,
            };
            if (props.style) {
              this.stageStyle = props.style as object;
            }
            return <div {...props}>{children}</div>;
          }
        });
        this.stepChange = (pageIndex: number) => {
          if (this.renderInstance) {
            this.renderInstance.go({ pageIndex, callback, style: this.stageStyle });
          }
        };
      } else if (this.mode === 'fade') {
        this.renderInstance = new FadeRenderer({
          stage,
          loop,
          pageIndex: this.value,
          renderChild: (props, children) => {
            props.class = carouselItemCls;
            return (
              <div{...props}>{children}</div>
            );
          },
          renderStage: (props, children) => {
            props.class = {
              [carouselStageCls]: true,
              'is-overlay': true
            };
            return (
              <div{...props}>{children}</div>
            );
          },
        });
        this.stepChange = (pageIndex: number) => {
          if (this.renderInstance) {
            this.renderInstance.go({ pageIndex, callback });
          }
        };
      }
    },
    action() {
      this.stepChange(this.value);
    }
  },
  render() {
    const { width, height, $slots } = this;
    return (
      <div class={carouselBaseName} style={{ height, width }}>
        <div class={carouselStageWrapper} ref="stage">
          {
            this.renderInstance
            && $slots.default
            && this.renderInstance.render($slots.default)
          }
        </div>
        {
          this.renderInstance
          && this.indicator
          &&
          <div class={[carouselIndicatorCls, `is-${this.direction}`]}>
            {
              new Array(this.renderInstance.totalPage)
                .fill(0)
                .map((_, index) => {
                  const cls: {[key: string]: boolean} = {
                    [carouselIndicatorDotCls]: true,
                    'is-active': !!(this.renderInstance && this.renderInstance.currentPage === index),
                    'is-dark': this.indicatorDarkMode,
                  };
                  return <span class={cls} tabindex={0} role="button"></span>
                })
            }
          </div>
        }
      </div>
    );
  },
});

export default Carousel;
