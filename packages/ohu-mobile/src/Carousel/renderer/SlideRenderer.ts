import {
  CarouselSlideOptions,
  CSSValue, CarouselSlideChangeEvent, CarouselGoOptions,
} from '../interface';
import { VNode } from 'vue';
import { computeCSSValue, getClientRectByDirection, setTransformByDirection } from '../utils';
import { defaultUnit } from '../constants';
import BaseRenderer from './BaseRenderer';
import { cloneVNodes } from '../../_utils/vnode';

const defaultDuration = '500ms';

export default class SlideRenderer extends BaseRenderer<CarouselSlideOptions, CarouselSlideChangeEvent> {
  private gap: CSSValue;
  private slidePosArr!: number[];
  private moveStep: number;
  private offsetDis!: number;
  private pageNum!: number;
  private transitionDuration: string;
  private stageStyle: Partial<CSSStyleDeclaration> = {};
  constructor(options: CarouselSlideOptions) {
    super(options);
    const {
      gap, moveStep, perPage, pageIndex,
      stage, direction, easing, center,
      renderChild,
      renderStage,
    } = options;
    this.gap = computeCSSValue(gap);
    this.moveStep = !moveStep ? perPage : moveStep;
    this.currentPage = pageIndex;
    this.lastPage = this.currentPage;
    this.currentIndex = this.moveStep * pageIndex;
    this.lastIndex = this.currentIndex;
    this.stageSize = getClientRectByDirection(stage, direction);
    this.transitionDuration = defaultDuration;
    this.stageStyle.transitionProperty = 'all';
    this.stageStyle.transitionTimingFunction = easing;
    let slideSize = (this.stageSize / perPage);
    if (perPage === 1) {
      slideSize += this.gap.value;
    }
    this.slideSize = slideSize;
    let offsetDis = 0;
    if (center) {
      offsetDis = (this.stageSize - slideSize) / 2;
    }
    this.offsetDis = offsetDis;
    this.renderStage = renderStage;
    this.renderStageItem = renderChild;
    let offset = offsetDis;
    if (this.loop) {
      offset = offsetDis - this.stageSize;
    }
    setTransformByDirection(this.stageStyle, direction, offset);
  }
  getPagination(page: number) {
    const { slideNum, moveStep, rewind, totalPage } = this;
    page = page >= 0 ? page : 0;
    let index = page * moveStep;
    if (page >= totalPage) {
      if (rewind) {
        page = page % totalPage;
      } else {
        page = totalPage - 1;
      }
    }
    if (index >= slideNum) {
      if (rewind) {
        index = index % slideNum;
      } else {
        index = slideNum - 1;
      }
    }
    return { index, page };
  }
  render(children: VNode[]) {
    const slidePosArr: number[] = [0];
    const { gap, slideSize } = this;
    const { direction, autoSize, center, perPage, loop } = this.options;
    this.slideNum = children.length;
    this.pageNum = this.slideNum / perPage;
    this.totalPage = Math.ceil(this.slideNum / this.moveStep);
    if (loop && this.pageNum > 1) {
      children = [
        ...cloneVNodes(children.slice(children.length - perPage, children.length), true),
        ... children,
        ...cloneVNodes(children.slice(0, perPage), true),
      ];
    }
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
      return this.renderStageItem({ style: itemStyle }, [node]);
    });
    const totalStageSize = slidePosArr[slidePosArr.length - 1] + defaultUnit;
    this.slidePosArr = slidePosArr.slice(0, -1);
    this.stageStyle.transitionDuration = this.transitionDuration;
    if (direction === 'horizontal') {
      this.stageStyle.width = totalStageSize;
    } else {
      this.stageStyle.height = totalStageSize;
    }
    return this.renderStage({
      style: this.stageStyle,
      on: {
        transitionstart: () => {
          if (this.loop) {
            this.disable = true;
          }
        },
        transitionend: () => {
          const { direction } = this.options;
          const offset = this.computeTransformOffset(true);
          if (this.windowStatus === 1 || this.windowStatus == -1) {
            this.transitionDuration = '0ms';
            this.stageStyle.transitionDuration = this.transitionDuration;
            setTransformByDirection(this.stageStyle, direction, offset);
            setTimeout(() => {
              this.transitionDuration = defaultDuration;
              this.disable = false;
            }, 0);
          } else {
            this.disable = false;
          }
        },
      },
    }, slideContent);
  }
  private get windowStatus() {
    const { lastIndex, slideNum, currentIndex } = this;
    if (lastIndex === slideNum - 1 && currentIndex === 0) {
      return 1;
    } else if (lastIndex === 0 && currentIndex === slideNum - 1) {
      return -1
    } else {
      return 0;
    }
  }
  private computeTransformOffset(isNormal = false) {
    const { slidePosArr, slideNum, options, currentIndex, offsetDis } = this;
    const { perPage } = options;
    let pos = slidePosArr[currentIndex];
    if (this.loop) {
      pos = slidePosArr[currentIndex + perPage];
      if (!isNormal) {
        if (this.windowStatus === 1) {
          pos = slidePosArr[slideNum + perPage];
        } else if (this.windowStatus === -1) {
          pos = slidePosArr[perPage - 1];
        }
      }
    }
    return offsetDis - pos;
  }

  go({ style, callback, pageIndex }: CarouselGoOptions) {
    if (this.disable && callback) {
      return callback({
        from: this.lastPage,
        to: this.currentPage,
        fromIndex: this.lastIndex,
        toIndex: this.currentIndex,
      })
    }
    const { direction } = this.options;
    const lastIndex = this.currentIndex;
    const lastPage = this.currentPage;
    const { index, page } = this.getPagination(pageIndex);
    if (this.loop && lastIndex === index && lastPage === page) {
      return;
    }
    this.lastIndex = lastIndex;
    this.lastPage = lastPage;
    this.currentIndex = index;
    this.currentPage = page;
    const transformOffset = this.computeTransformOffset();
    setTransformByDirection(style, direction, transformOffset);
    if (callback) {
      callback({
        from: this.lastPage,
        to: page,
        fromIndex: this.lastIndex,
        toIndex: index,
        transformOffset,
      });
    }
  }
}
