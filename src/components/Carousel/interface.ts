import { VNode, VNodeData } from 'vue';

export interface CSSValue {
  value: number;
  unit: string;
}

export interface CarouselPageInfo {
  page: number;
  index: number;
}
export type CarouselSlideDirection = 'horizontal' | 'vertical';

export interface CarouselSlideOptions {
  stage: HTMLElement;
  pageIndex: number;
  direction: CarouselSlideDirection;
  autoSize: boolean;
  perPage: number;
  moveStep: number;
  gap: string | number;
  center: boolean;
  easing: string;
}


export interface CarouselInitConstuctor<T> {
  new (options: T): CarouselInitLifeCycle;
}

export type StageChildrenFunc = (props: VNodeData, children: VNode[]) => VNode;
export type StageFunc = StageChildrenFunc;
export interface CarouselInitLifeCycle {
  getPagination: (page: number) => CarouselPageInfo;
  createStage: (children: VNode[], createChild: StageChildrenFunc, createStage: StageFunc) => any;
  createStepAction: () => any;
}

export interface CarouselChangeInfo {
  fromPage: number;
  toPage: number;
  fromIndex: number;
}
