import {
  CarouselInitLifeCycle, CarouselSlideOptions,
  CSSValue, CarouselSlideDirection,
  StageChildrenFunc, StageFunc,
} from './interface';
import { VNode } from 'vue';
import { computeCSSValue, getClientRectByDirection } from './utils';
import { defaultUnit } from './constants';

export default class SlideInit implements CarouselInitLifeCycle {
  private options: CarouselSlideOptions;
  private gap: CSSValue;
  private slidePosArr!: number[];
  private slideNum: number = 0;
  private moveStep: number;
  private offsetDis!: number;
  private currentPage: number;
  private currentIndex: number;
  private stageSize: number;
  private stageStyle: Partial<CSSStyleDeclaration> = {};
  constructor(options: CarouselSlideOptions) {
    const { gap, moveStep, perPage, pageIndex, stage, direction, easing } = options;
    this.gap = computeCSSValue(gap);
    this.moveStep = !moveStep ? perPage : moveStep;
    this.currentPage = pageIndex;
    this.currentIndex = this.moveStep * pageIndex;
    this.stageSize = getClientRectByDirection(stage, direction);
    this.options = options;
    this.stageStyle.transition = `all 500ms ${easing}`;
  }
  getPagination(page: number) {
    const { slideNum, moveStep } = this;
    page = page >= 0 ? page : 0;
    const l = page * moveStep;
    const totalPage = Math.ceil(slideNum / moveStep);
    return {
      index: l >= slideNum ? slideNum - 1 : l,
      page: page >= totalPage ? totalPage - 1: page,
    };
  }
  createStage(
    children: VNode[],
    createChild: StageChildrenFunc,
    createStage: StageFunc,
  ) {
    const slidePosArr: number[] = [0];
    const { gap, stageSize } = this;
    const { direction, autoSize, center, perPage } = this.options;
    let slideSize = (stageSize / perPage);
    if (perPage === 1) {
      slideSize += gap.value;
    }
    let offsetDis = 0;
    if (center) {
      offsetDis = (stageSize - slideSize) / 2;
    }
    this.setSlideTransform(this.stageStyle, direction, offsetDis);
    this.offsetDis = offsetDis;
    this.slideNum = children.length;
    const slideContent = children.map(node => {
      let itemSize = slideSize;
      if (autoSize) {
        // get all size of node
        const style = node.data!.style as { width?: string, height?: string };
        const slideSizeValue = direction === 'horizontal' ? style.width : style.height;
        if (style && slideSizeValue) {
          const { value } = computeCSSValue(slideSizeValue);
          if (gap.value !== 0) {
            itemSize = value + gap.value;
          }
        }
      }
      const lastSlidePos = slidePosArr[slidePosArr.length - 1];
      slidePosArr.push(Math.ceil(lastSlidePos + itemSize));
      const itemStyle: Partial<CSSStyleDeclaration> = {};
      if (direction === 'horizontal') {
        itemStyle.width = itemSize + defaultUnit;
      } else {
        itemStyle.width = '100%';
        itemStyle.height = itemSize + defaultUnit;
      }
      if (gap.value !== 0) {
        if (center) {
          const paddingValue = gap.value / 2 + gap.unit;
          if (direction === 'horizontal') {
            itemStyle.paddingLeft = paddingValue;
            itemStyle.paddingRight = paddingValue;
          } else {
            itemStyle.paddingTop = paddingValue;
            itemStyle.paddingBottom = paddingValue;
          }
        } else {
          if (direction === 'horizontal') {
            itemStyle.paddingRight = gap.value + gap.unit;
          } else {
            itemStyle.paddingBottom = gap.value + gap.unit;
          }
        }
      }
      return createChild({ style: itemStyle }, [node]);
    });
    this.slidePosArr = slidePosArr;
    const totalStageSize = slidePosArr[slidePosArr.length - 1] + defaultUnit;
    if (direction === 'horizontal') {
      this.stageStyle.width = totalStageSize;
    } else {
      this.stageStyle.height = totalStageSize;
    }
    return createStage({ style: this.stageStyle }, slideContent);
  }
  private setSlideTransform(
    style: Partial<CSSStyleDeclaration>,
    direction: CarouselSlideDirection,
    offsetDis: number,
  ) {
    if (direction === 'horizontal') {
      style.transform = `translate3d(${offsetDis}px, 0, 0)`;
    } else {
      style.transform = `translate3d(0, ${offsetDis}px, 0)`;
    }
  }
  createStepAction() {
    return (stage: HTMLElement, pageIndex: number) => {
      const { direction } = this.options;
      const { index, page } = this.getPagination(pageIndex);
      this.currentIndex = index;
      this.currentPage = page;
      const transformOffset = this.offsetDis - this.slidePosArr[index];
      this.setSlideTransform(stage.style, direction, transformOffset);
      return {
        from: this.currentPage,
        to: page,
        fromIndex: this.currentIndex,
        toIndex: index,
      };
    };
  }
}
