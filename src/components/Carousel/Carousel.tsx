import { componentFactoryOf } from 'vue-tsx-support';
import props from 'vue-strict-prop';
import { prefix } from '../_utils/shared';
import { VNode } from 'vue';
import SlideInit from './SlideInit';
import './styles/index.scss';

export interface CarouselChangeEvent {
  from: number;
  to: number;
  fromIndex: number;
  toIndex: number;
};

export interface CarouselEvents {
  onChange: CarouselChangeEvent;
  onInput: CarouselChangeEvent;
}

export const carouselBaseName = `${prefix}carousel`;
export const carouselStageCls = `${carouselBaseName}__stage`;
export const carouselStageWrapper = `${carouselStageCls}-wrapper`;
export const carouselItemCls = `${carouselBaseName}-item`;

const Carousel = componentFactoryOf<CarouselEvents>().create({
  name: carouselBaseName,
  props: {
    value: props(Number).default(0),
    loop: props(Boolean).default(false),
    autoplay: props(Boolean).default(false),
    interval: props(Number).default(3000),
    indicator: props(Boolean).default(false),
    height: String,
    mode: props.ofStringLiterals('slide', 'fade', 'cover').default('slide'),
    // ---- only works in 'slide' mode
    direction: props.ofStringLiterals('vertical', 'horizontal').default('horizontal'),
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
      showStageContent: false,
      stageContent: [],
      stepChange: () => {},
    } as {
      showStageContent: boolean;
      stageContent: VNode[] | VNode;
      stepChange: Function;
    };
  },
  mounted() {
    this.initStage();
  },
  methods: {
    initStage() {
      const stage = this.$refs.stage as HTMLElement;
      const { $slots } = this;
      if (!stage || !$slots.default || ($slots.default && $slots.default.length === 0) ) return;
      if (this.mode === 'slide') {
        const { perPage, gap, moveStep, center, easing, direction, autoSize } = this;
        const initInstance = new SlideInit({
          perPage, gap,
          center, easing,
          direction, autoSize,
          moveStep,
          pageIndex: this.value,
          stage,
        });
        this.stageContent = initInstance.createStage(
          $slots.default,
          (props, children) => {
            props.class = carouselItemCls;
            return <div {...props}>{children}</div>
          },
          (props, children) => {
            props.class = {
              [carouselStageCls]: true,
              [`is-${direction}`]: true,
            };
            props.ref = 'stageContent';
            return <div {...props}>{children}</div>;
          }
        );
        this.stepChange = (stage: HTMLElement, pageIndex: number) => {
          const event = initInstance.createStepAction()(stage, pageIndex);
          this.$emit('change', event);
          this.$emit('input', event);
        };
        this.showStageContent = true;
      }
    },
    action() {
      const stage = this.$refs.stageContent as HTMLElement;
      if (stage) {
        this.stepChange(stage, this.value);
      }
    }
  },
  render() {
    const { showStageContent, stageContent, height } = this;
    return (
      <div class={carouselBaseName} style={{ height }}>
        <div class={carouselStageWrapper} ref="stage">
          { showStageContent && stageContent }
        </div>
      </div>
    );
  },
});

export default Carousel;
