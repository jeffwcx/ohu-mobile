
export interface CSSValue {
  value: number;
  unit: string;
}

export type CarouselSlideDirection = 'horizontal' | 'vertical';


export interface CarouselChangeEvent {
  from: number;
  to: number;
  fromIndex: number;
  toIndex: number;
  [key: string]: any;
}

export interface CarouselEvents {
  onChange: CarouselChangeEvent;
  onInput: number;
}

export type CarouselMode = 'slide' | 'fade';


export interface CarouselStageProps {
  value?: number;
  loop?: boolean;
  direction?: CarouselSlideDirection;
  rewind?: boolean;
  autoSize?: boolean;
  perPage?: number;
  moveStep?: number;
  gap?: number | string;
  center?: boolean;
  easing?: string;
  supportGesture?: boolean;
  minSwipeDistance?: number;
  gestureFollow?: boolean;
  scrollAngle?: number;
  animationDuration?: number;
}

export interface CarouselProps extends CarouselStageProps {
  autoplay?: boolean;
  interval?: number;
  indicator?: boolean;
  indicatorDarkMode?: boolean;
  width?: string;
  height?: string;
  resize?: boolean;
}

