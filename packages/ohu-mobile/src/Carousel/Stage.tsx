import { defineComponent, props } from '../_utils/defineComponent';
import { CarouselSlideDirection, CarouselStageProps, CarouselChangeEvent, CarouselEvents, CSSValue } from './types';
import { computeCSSValue, getClientRectByDirection, setTransformByDirection } from './utils';
import { cloneVNodes } from '../_utils/vnode';
import { VNode, VNodeData } from 'vue/types/umd';
import { defaultUnit } from './constants';


export interface CarouselStageScopedSlots {
  indicator: {
    pages: number;
    slides: number;
    steps: number;
    // pagination相关参数
    lastStepIndex: number;
    stepIndex: number;
    lastSlideIndex: number;
    slideIndex: number;
  };
}


export const stageProps = {
  value: props(Number).default(0),
  loop: props(Boolean).default(false),
  // 允许倒带
  rewind: props(Boolean).default(false),
  direction: props.ofType<CarouselSlideDirection>().default('horizontal'),
  // 使用该属性，slide的大小会根据style的设定决定
  autoSize: props(Boolean).default(false),
  // 每次变换，需要移动的步数
  moveStep: props(Number).optional,
  // 间隔，每个slide之间的
  gap: props(Number, String).default(0),
  // 在有gap的情况下，center会使分片居中
  center: props(Boolean).default(false),
  // 一个page包含的slide数量
  perPage: props(Number).validator(v => v > 0).default(1),
  easing: props(String).default('cubic-bezier(0.165, 0.84, 0.44, 1)'),
  // 是否支持手势
  supportGesture: props(Boolean).default(true),
  minSwipeDistance: props(Number).default(40),
  gestureFollow: props(Boolean).default(true),
  scrollAngle: props(Number).default(45),
  animationDuration: props(Number).default(400),
};

/**
 * 所有page都在stage上，且自由在stage上变换
 * 一个page可能包含多个slide
 */
export default defineComponent<CarouselStageProps, CarouselEvents, CarouselStageScopedSlots>('carousel-stage')
  .create({
    props: stageProps,
    computed: {
      gapValue() {
        return computeCSSValue(this.gap);
      },
      moveStepValue() {
        if (this.moveStep && this.moveStep < this.perPage) {
          return this.moveStep;
        }
        return this.perPage;
      },
      // 窗口状态
      windowStatus() {
        const { steps, lastStepIndex } = this;
        if (this.currentAction === 'next' && lastStepIndex === steps - 1) {
          return 1;
        }
        if (this.currentAction === 'prev' && lastStepIndex === 0) {
          return -1;
        }
        return 0;
      },
      canLoop() {
        let loop = this.loop;
        if (this.steps <= 1 || this.autoSize) {
          loop = false;
        }
        if (loop) {
          // 下列情况不能形成loop效果
          if ((this.slides - this.moveStepValue) !== (this.steps - 1) * this.moveStepValue) {
            loop = false;
          }
        }
        return loop;
      },
    },
    data() {
      return {
        currentAction: '' as 'next' | 'prev' | 'goTo' | '',
        // 所有slide的偏移量，需要事先计算好
        slideOffsets: [] as number[],
        slideSizes: [] as number[],
        // stage样式
        stageStyle: {
          transitionProperty: 'all',
          transitionTimingFunction: this.easing,
        } as Partial<CSSStyleDeclaration>,
        stageSize: 0,
        // page数量
        pages: 0,
        // slide数量
        slides: 0,
        // steps, steps真实反映变换数量
        steps: 0,
        // pagination相关参数
        lastStepIndex: 0,
        stepIndex: 0,
        lastSlideIndex: 0,
        slideIndex: 0,
        // 禁止移动
        disable: false,
        // 动画时长
        duration: this.animationDuration,
        // 由center引起的偏移
        centerOffset: 0,
        initialized: false,
        touching: false,
        swipeData: {
          startTime: -1,
          startX: -1,
          startY: -1,
          currentX: -1,
          currentY: -1,
        },
      };
    },
    watch: {
      value(cur) {
        if (this.stepIndex !== cur) {
          this.goTo(cur);
        }
      },
      direction: 'init',
      autoSize: 'init',
    },
    methods: {
      renderItems() {
        let children = this.$slots.default;
        if (!children) return;
        if (this.canLoop) {
          children = [
            ...cloneVNodes(children.slice(this.slides - this.perPage, this.slides), true),
            ...children,
            ...cloneVNodes(children.slice(0, this.perPage), true),
          ];
        }
        let childenNodes = children.map((node, index) => {
          const itemSize = this.slideSizes[index];
          const itemStyle: Partial<CSSStyleDeclaration> = {};
          if (this.direction === 'horizontal') {
            itemStyle.width = itemSize + defaultUnit;
          } else {
            itemStyle.width = '100%';
            itemStyle.height = itemSize + defaultUnit;
          }
          let gap = this.gapValue;
          if (gap.value !== 0) {
            if (this.center) {
              const paddingValue = gap.value / 2 + gap.unit;
              if (this.direction === 'horizontal') {
                itemStyle.paddingLeft = paddingValue;
                itemStyle.paddingRight = paddingValue;
              } else {
                itemStyle.paddingTop = paddingValue;
                itemStyle.paddingBottom = paddingValue;
              }
            } else {
              if (this.direction === 'horizontal') {
                itemStyle.paddingRight = gap.value + gap.unit;
              } else {
                itemStyle.paddingBottom = gap.value + gap.unit;
              }
            }
          }
          return (
            <div class={this.bem.block('carousel-item')}
              style={itemStyle}>
              {node}
            </div>
          );
        });
        return (
          <div class={this.root().is(this.direction)}
            style={this.stageStyle}
            onTransitionend={this.handleStageTransitionEnd}>
            {childenNodes}
          </div>
        );
      },
      init() {
        this.initialized = false;
        let children = this.$slots.default;
        if (!children) return;
        this.slides = children.length;
        this.pages = Math.floor(this.slides / this.perPage);
        this.steps = Math.ceil(this.slides / this.moveStepValue);
        if (this.canLoop) {
          children = [
            ...cloneVNodes(children.slice(this.slides - this.perPage, this.slides), true),
            ...children,
            ...cloneVNodes(children.slice(0, this.perPage), true),
          ];
        }
        let slideSize = 0;
        const stageWrapper = this.$refs.wrapper as HTMLElement;
        let wrapperSize = getClientRectByDirection(stageWrapper, this.direction);
        slideSize = (wrapperSize / this.perPage);
        if (this.perPage === 1) {
          slideSize += this.gapValue.value;
        }
        if (this.center) {
          this.centerOffset = (wrapperSize - slideSize) / 2;
        }
        let slideOffsets = [0];
        let slideSizes: number[] = [];
        children.map((node) => {
          let itemSize = slideSize;
          if (this.autoSize) {
            let size = this.getAutoSize(node);
            if (size) {
              itemSize = size;
            }
          }
          const lastSlidePos = slideOffsets[slideOffsets.length - 1];
          const offset = lastSlidePos + itemSize;
          slideOffsets.push(offset);
          slideSizes.push(itemSize);
        });
        let endIndex = slideOffsets.length - 1;
        const totalStageSize = slideOffsets[endIndex];
        this.slideOffsets = slideOffsets.slice(0, endIndex);
        this.slideSizes = slideSizes;
        this.stageSize = totalStageSize;
        // 初始化pagination信息
        const { stepIndex, slideIndex } = this.getPagination(this.value);
        this.lastSlideIndex = slideIndex;
        this.lastStepIndex = stepIndex;
        this.stepIndex = stepIndex;
        this.slideIndex = slideIndex;
        // 初始化时不要产生动画
        this.duration = 0;
        this.setStage();
        this.$nextTick(() => {
          this.duration = this.animationDuration;
        });
        this.initialized = true;
      },
      handleStageTransitionEnd() {
        if (this.windowStatus === 1 || this.windowStatus == -1) {
          this.duration = 0;
          this.setStage(true);
          this.$nextTick(() => {
            this.duration = this.animationDuration;
            this.disable = false;
          });
        } else {
          this.disable = false;
        }
        this.currentAction = '';
      },
      // isNormal用以标定是否需要复位
      getTransformOffset(isNormal = false) {
        const { slideOffsets, slides, perPage, slideIndex, centerOffset } = this;
        let pos = slideOffsets[slideIndex];
        if (this.canLoop) {
          pos = slideOffsets[slideIndex + perPage];
          if (!isNormal && !this.touching) {
            if (this.windowStatus === 1) {
              pos = slideOffsets[slides + perPage];
            } else if (this.windowStatus === -1) {
              pos = slideOffsets[perPage - this.moveStepValue];
            }
          }
        }
        return centerOffset - pos;
      },
      setStage(isNormal = false) {
        let stageStyle: Partial<CSSStyleDeclaration> = {
          transitionDuration: this.touching ? '0ms' : `${this.duration}ms`,
          transitionProperty: 'all',
          transitionTimingFunction: this.easing,
        };
        let stageCSSSize = `${this.stageSize}px`;
        if (this.direction === 'horizontal') {
          stageStyle.width = stageCSSSize;
        } else {
          stageStyle.height = stageCSSSize;
        }
        let offset = this.getTransformOffset(isNormal);
        if (this.touching) {
          const o = this.getSwipeOffset();
          offset += o.offset;
        }
        setTransformByDirection(stageStyle, this.direction, offset);
        this.stageStyle = stageStyle;
      },
      getAutoSize(node: VNode) {
        const style = node.data!.style as { width?: string, height?: string };
        const slideSizeValue = this.direction === 'horizontal' ? style.width : style.height;
        if (style && slideSizeValue) {
          const { value } = computeCSSValue(slideSizeValue);
          if (this.gapValue.value !== 0) {
            return value + this.gapValue.value;
          }
          return value;
        }
        return;
      },
      getPagination(stepIndex: number) {
        const { slides, moveStepValue, rewind, steps } = this;
        stepIndex = stepIndex >= 0 ? stepIndex : 0;
        let slideIndex = stepIndex * moveStepValue;
        if (stepIndex >= steps) {
          if (rewind) {
            stepIndex = stepIndex % steps;
          } else {
            stepIndex = steps - 1;
          }
        }
        if (slideIndex >= slides) {
          if (rewind) {
            slideIndex = slideIndex % slides;
          } else {
            slideIndex = slides - 1;
          }
        }
        return { slideIndex, stepIndex };
      },
      goTo(index: number) {
        if (this.disable || this.steps === 1) return false;
        if (index === this.stepIndex) return false;
        if (index < 0 || index > this.steps) return false;
        if (this.currentAction === '') {
          this.currentAction = 'goTo';
        }
        const { slideIndex, stepIndex } = this.getPagination(index);
        this.lastStepIndex = this.stepIndex;
        this.lastSlideIndex = this.slideIndex;
        this.stepIndex = stepIndex;
        this.slideIndex = slideIndex;
        if (this.canLoop) {
          this.disable = true;
        }
        this.setStage();
        this.$emit('change', {
          from: this.lastStepIndex,
          to: this.slideIndex,
          fromIndex: this.lastSlideIndex,
          toIndex: this.slideIndex,
        } as CarouselChangeEvent);
        return true;
      },
      prev(autoplay = false) {
        let success = false;
        this.currentAction = 'prev';
        if (this.stepIndex === 0 && (this.rewind || this.loop || autoplay)) {
          success = this.goTo(this.steps - 1);
        } else {
          success = this.goTo(this.stepIndex - 1);
        }
        return success;
      },
      next(autoplay = false) {
        let success = false;
        this.currentAction = 'next';
        if (this.stepIndex === this.steps - 1 && (this.rewind || this.loop || autoplay)) {
          success = this.goTo(0);
        } else {
          success = this.goTo(this.stepIndex + 1);
        }
        return success;
      },
      getSwipeOffset() {
        const offsetX = this.swipeData.currentX - this.swipeData.startX;
        const offsetY = this.swipeData.currentY - this.swipeData.startY;
        return {
          offsetX,
          offsetY,
          offset: this.direction === 'horizontal' ? offsetX : offsetY,
        };
      },

      isScrolling() {
        const { startX, startY, currentX, currentY } = this.swipeData;
        const distanceX = Math.abs(currentX - startX);
        const distanceY = Math.abs(currentY - startY);
        if (distanceX * distanceX + distanceY * distanceY >= 25) {
          const angle = (Math.atan2(distanceY, distanceX) * 180 / Math.PI);
          return this.direction === 'horizontal'
            ? angle > this.scrollAngle
            : (90 - angle) > this.scrollAngle
        }
        return false;
      },
      handleMouse(e: MouseEvent) {
        this.handleEvent(e.type, { pageX: e.pageX, pageY: e.pageY }, e);
      },
      handleEvent(type: string, { pageX, pageY }: { pageX: number, pageY: number }, e: Event) {
        let parent = this.$parent as any;
        switch (type) {
          case 'mousedown':
          case 'touchstart':
            parent.stopPlay();
            this.touching = true;
            this.swipeData = {
              startTime: Date.now(),
              startX: pageX,
              startY: pageY,
              currentX: -1,
              currentY: -1,
            };
            break;
          case 'mousemove':
          case 'touchmove':
            if (!this.touching) return;
            this.touching = true;
            this.swipeData = {
              ...this.swipeData,
              currentX: pageX,
              currentY: pageY,
            };
            if (this.isScrolling()) {
              return;
            }
            e.preventDefault();
            if (this.gestureFollow) {
              this.setStage();
            }
            break;
          case 'mouseleave':
          case 'mouseup':
          case 'touchcancel':
          case 'touchend':
            const o = this.getSwipeOffset();
            this.touching = false;
            if (Date.now() - this.swipeData.startTime < 300 && this.swipeData.currentX < 0) {
              parent.startPlay();
              return;
            }
            let success = false;
            if (Math.abs(o.offset) > this.minSwipeDistance) {
              success = o.offset < 0 ? this.next() : this.prev();
            }
            this.swipeData = {
              startTime: -1,
              startX: -1,
              startY: -1,
              currentY: -1,
              currentX: -1,
            };
            if (!success) {
              this.setStage();
            }
            parent.startPlay();
            break;
        }
      },
      handleTouch(e: TouchEvent) {
        const { type, changedTouches } = e;
        let { pageX, pageY } = changedTouches[0];
        this.handleEvent(type, { pageX, pageY }, e);
      },
    },
    mounted() {
      this.init();
    },
    render() {
      const root = this.root();
      const {
        $scopedSlots,
        pages,
        slides,
        steps,
        lastSlideIndex,
        lastStepIndex,
        stepIndex,
        slideIndex,
      } = this;
      const wrapperNodeData: VNodeData = {
        class: root.block('wrapper'),
        ref: 'wrapper',
      };
      if (this.supportGesture) {
        let events: Record<string, Function> = {};
        if ('ontouchstart' in window) {
          events = {
            touchstart: this.handleTouch,
            touchmove: this.handleTouch,
            touchend: this.handleTouch,
            touchcancel: this.handleTouch,
          };
        }
        if ('onmousedown' in window) {
          events = Object.assign(events, {
            mousedown: this.handleMouse,
            mousemove: this.handleMouse,
            mouseup: this.handleMouse,
            mouseleave: this.handleMouse,
          });
        }
        wrapperNodeData.on = events;
      }
      return (
        <div {...wrapperNodeData}>
          {
            this.initialized
              ? this.renderItems()
              : this.$slots.default
          }
          {
            $scopedSlots.indicator
            &&
            $scopedSlots.indicator({
              pages,
              slides,
              steps,
              lastSlideIndex,
              lastStepIndex,
              stepIndex,
              slideIndex,
            })
          }
        </div>
      );
    },
  });
