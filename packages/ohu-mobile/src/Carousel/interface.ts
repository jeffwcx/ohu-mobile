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

export type RenderStageItemFunc = (props: VNodeData, children: VNode[]) => VNode;
export type RenderStageFunc = RenderStageItemFunc;
export interface CarouselModeOptions {
  stage: HTMLElement;
  pageIndex: number;
  renderChild: RenderStageItemFunc;
  renderStage: RenderStageFunc;
  loop?: boolean;
  rewind?: boolean;
}

export interface CarouselSlideOptions extends CarouselModeOptions {
  direction: CarouselSlideDirection;
  autoSize: boolean;
  perPage: number;
  moveStep: number;
  gap: string | number;
  center: boolean;
  easing: string;
}

export interface CarouselFadeOptions extends CarouselModeOptions {

}

export interface CarouselGoOptions<E extends CarouselChangeEvent = CarouselChangeEvent> {
  pageIndex: number;
  callback?: (args: E) => void;
  [key: string]: any;
}

export interface CarouselInitConstuctor<T> {
  new (options: T): CarouselInitLifeCycle;
}


export interface CarouselInitLifeCycle<E extends CarouselChangeEvent = CarouselChangeEvent> {
  disable: boolean;
  currentPage: number;
  lastPage: number;
  currentIndex: number;
  lastIndex: number;
  slideNum: number;
  totalPage: number;
  getPagination(page: number): CarouselPageInfo;
  render(children: VNode[]): VNode[] | VNode;
  go(options: CarouselGoOptions<E>): any;
}

export interface CarouselChangeEvent {
  from: number;
  to: number;
  fromIndex: number;
  toIndex: number;
  [key: string]: any;
}

export interface CarouselSlideChangeEvent extends CarouselChangeEvent {
  transformOffset: number;
}

export interface CarouselChangeInfo {
  fromPage: number;
  toPage: number;
  fromIndex: number;
}

export interface CarouselEvents {
  onChange: CarouselChangeEvent;
  onInput: CarouselChangeEvent;
}

export type CarouselMode = 'slide' | 'fade';

export interface CarouselProps {
  value?: number;
  loop?: boolean;
  autoplay?: boolean;
  interval?: number;
  indicator?: boolean;
  indicatorDarkMode?: boolean;
  width?: string;
  height?: string;
  mode?: CarouselMode;
  direction?: CarouselSlideDirection;
  rewind?: boolean;
  autoSize?: boolean;
  cover?: boolean;
  perPage?: number;
  moveStep?: number;
  gap?: number;
  center?: boolean;
  easing?: string;
}
