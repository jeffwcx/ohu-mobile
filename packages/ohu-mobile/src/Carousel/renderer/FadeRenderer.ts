import { CarouselPageInfo, CarouselFadeOptions, CarouselGoOptions } from '../interface';
import { VNode, VNodeData } from 'vue';
import { getClientRectByDirection, setTransformByDirection } from '../utils';
import { defaultUnit } from '../constants';
import BaseRenderer from './BaseRenderer';


export default class FadeRenderer extends BaseRenderer {
  constructor(options: CarouselFadeOptions) {
    super(options);
    const { pageIndex, stage } = options;
    this.currentPage = pageIndex >= 0 ? pageIndex : 0;
    this.currentIndex = this.currentPage;
    this.stageSize = getClientRectByDirection(stage, 'horizontal');
    this.slideSize = this.stageSize;
  }
  getPagination(page: number): CarouselPageInfo {
    const currentPage = page >= this.slideNum ? this.slideNum - 1 : page;
    return {
      page: currentPage,
      index: currentPage,
    };
  }
  render(
    children: VNode[],
  ): VNode | VNode[] {
    this.slideNum = children.length;
    this.totalPage = this.slideNum;
    const slideItems = children.map((node, index) => {
      const itemStyle: Partial<CSSStyleDeclaration> = {
        width: this.slideSize + defaultUnit,
        transitionProperty: 'opacity',
        transitionDuration: '500ms',
        transitionTimingFunction: 'ease',
      };
      if (index === this.currentIndex) {
        itemStyle.opacity = '1';
        itemStyle.pointerEvents = 'auto';
      } else {
        itemStyle.opacity = '0';
        itemStyle.pointerEvents = 'none'
      }
      setTransformByDirection(itemStyle, 'horizontal', -this.slideSize * index);
      const props: VNodeData = {
        style: itemStyle,
      };
      return this.renderStageItem(props, [node]);
    });
    return this.renderStage({}, slideItems);
  }
  go({ callback, pageIndex }: CarouselGoOptions) {
    const { index, page } = this.getPagination(pageIndex);
    this.currentIndex = index;
    this.currentPage = page;
    if (callback) {
      callback({
        from: this.currentPage,
        to: page,
        fromIndex: this.currentIndex,
        toIndex: index,
      });
    }
  }
}
