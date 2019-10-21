import { componentFactoryOf } from 'vue-tsx-support';
import props from 'vue-strict-prop';
import { prefix } from '../_utils/shared';
import { VNodeData, VNode } from 'vue';
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

function getClientRect(el: Element) {
  return el.getBoundingClientRect();
}

const defaultUnit = 'px';

const Carousel = componentFactoryOf<CarouselEvents>().create({
  name: carouselBaseName,
  props: {
    value: props(Number).validator((value) => {
      return value >= 0;
    },).default(0),
    loop: props(Boolean).default(false),
    autoplay: props(Boolean).default(false),
    interval: props(Number).default(3000),
    indicator: props(Boolean).default(false),
    mode: props.ofStringLiterals('slide', 'fade').default('slide'),
    // ---- only works in 'slide' mode
    direction: props.ofStringLiterals('vertical', 'horizontal').default('horizontal'),
    cover: props(Boolean).default(false),
    // ---- start: only works in 'horizontal' direction ----
    // the number of slides in one page
    perPage: props(Number).validator(v => v > 0).default(1),
    moveStep: Number,
    gap: props(Number, String).default(0),
    center: props(Boolean).default(false),
    // ---- end: only works in 'horizontal' direction ----
    easing: props(String).default('cubic-bezier(0.165, 0.84, 0.44, 1)'),
  },
  watch: {
    value() {
      this.action();
    },
  },
  computed: {
    gapValue() {
      let unit = defaultUnit;
      let value = 0;
      if (typeof this.gap === 'string') {
        this.gap.replace(/(\d+)(\w+)/g, (_, v, u) => {
          if (v) value = parseInt(v, 10);
          if (u) unit = u;
          return '';
        });
      }
      return { unit, value };
    },
    moveStepValue() {
      if (!this.moveStep) return this.perPage;
      return this.moveStep;
    },
  },
  data() {
    return {
      showStageContent: false,
      stageContent: [],
      slideNum: 0,
      currentIndex: this.value * (this.moveStep ? this.perPage : this.moveStep),
      currentPage: this.value,
      change: () => {},
    } as {
      showStageContent: boolean;
      stageContent: VNode[] | VNode;
      slideNum: number;
      change: Function;
      currentIndex: number;
      currentPage: number;
    };
  },
  mounted() {
    this.initStageContent();
  },
  methods: {
    getCurrentIndex(paginationIndex: number) {
      const { slideNum, moveStepValue, perPage } = this;
      paginationIndex = paginationIndex >= 0 ? paginationIndex : 0;
      const l = paginationIndex * moveStepValue;
      const totalPage = Math.ceil(slideNum / perPage);
      return {
        currentIndex: l >= slideNum ? slideNum - 1 : l,
        currentPage: paginationIndex >= totalPage ? totalPage - 1: paginationIndex,
      };
    },
    initStageContent() {
      const stage = this.$refs.stage;
      const { perPage, gap, center, easing, $slots } = this;
      const { width } = getClientRect(stage as Element);
      if ($slots.default) {
        const defaultSlides = $slots.default;
        const slideNum = defaultSlides.length;
        this.slideNum = slideNum;
        const slideWidth = (width / perPage);
        const stageContentStyle: Partial<CSSStyleDeclaration> = {
          width: slideWidth * slideNum + defaultUnit,
          transition: `all 500ms ${easing}`,
        };
        let offsetX = 0;
        if (center) {
          offsetX = width / 2 - slideWidth / 2;
        }
        stageContentStyle.transform = `translate3d(${offsetX}px, 0, 0)`;
        this.change = (stage: HTMLElement, pageIndex: number) => {
          const from = this.currentPage;
          const fromIndex = this.currentIndex;
          const { currentIndex, currentPage } = this.getCurrentIndex(pageIndex);
          this.currentIndex = currentIndex;
          this.currentPage = currentPage;
          const transformOffset = offsetX - slideWidth * this.currentIndex;
          stage.style.transform = `translate3d(${transformOffset}px, 0, 0)`;
          const changeEvent: CarouselChangeEvent = {
            from,
            to: this.currentPage,
            fromIndex,
            toIndex: this.currentIndex,
          };
          this.$emit('change', changeEvent);
          this.$emit('input', changeEvent);
        };
        const slidesContent = defaultSlides.map(node => {
          const itemStyle: Partial<CSSStyleDeclaration> = {
            width: slideWidth + defaultUnit,
          };
          if (gap !== 0) {
            let itemGap = this.gapValue;
            if (center) {
              const paddingValue = itemGap.value / 2 + itemGap.unit;
              itemStyle.paddingLeft = paddingValue;
              itemStyle.paddingRight = paddingValue;
            } else {
              itemStyle.paddingRight = itemGap.value + itemGap.unit;
            }
          }
          const itemProps: VNodeData = { style: itemStyle, class: carouselItemCls };
          return <div {...itemProps}>{node}</div>
        });
        const stageContentProps: VNodeData = {
          class: carouselStageCls,
          style: stageContentStyle,
          ref: 'stageContent',
        };
        this.stageContent = (
          <div {...stageContentProps}>{slidesContent}</div>
        );
        this.showStageContent = true;
      }
    },
    action() {
      const stage = this.$refs.stageContent as HTMLElement;
      if (stage) {
        this.change(stage, this.value);
      }
    }
  },
  render() {
    const { showStageContent, stageContent } = this;
    return (
      <div class={carouselBaseName}>
        <div class={carouselStageWrapper} ref="stage">
          { showStageContent && stageContent }
        </div>
      </div>
    );
  },
});

export default Carousel;
