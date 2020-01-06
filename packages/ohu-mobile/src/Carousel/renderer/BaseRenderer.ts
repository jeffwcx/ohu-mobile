import {
  CarouselChangeEvent, CarouselInitLifeCycle,
  CarouselPageInfo, CarouselModeOptions,
  RenderStageItemFunc, RenderStageFunc, CarouselGoOptions,
} from '../interface';
import { VNode } from 'vue';

export default class BaseRenderer <O extends CarouselModeOptions = CarouselModeOptions,
  T extends CarouselChangeEvent = CarouselChangeEvent> implements CarouselInitLifeCycle<T> {
  public options: O;
  public currentPage: number = 0;
  public lastPage: number = 0;
  public currentIndex: number = 0;
  public lastIndex: number = 0;
  public stageSize: number = 0;
  public slideSize: number = 0;
  public slideNum: number = 0;
  public totalPage: number = 0;
  public loop: boolean;
  public rewind: boolean;
  public renderStageItem: RenderStageItemFunc;
  public renderStage: RenderStageFunc;
  public disable = false;
  constructor(options: O) {
    const { renderChild, renderStage, loop, rewind } = options;
    this.options = options;
    this.renderStage = renderStage;
    this.renderStageItem = renderChild;
    this.loop = loop || false;
    if (this.loop) {
      this.rewind = true;
    } else {
      this.rewind = rewind || false;
    }
  }
  getPagination(page: number): CarouselPageInfo {
    throw new Error('Method not implemented.');
  }
  render(children: VNode[]): VNode[] | VNode {
    throw new Error('Method not implemented.');
  }
  go(options: CarouselGoOptions) {
    throw new Error('Method not implemented.');
  }
}
