import { EasingFunction } from './easing';
import raf from 'raf';

export interface AnimateOptions {
  timingFunction: EasingFunction;
  duration: number;
  done?: () => void;
  props: {
    height?: number | [number, number];
    width?: number | [number, number];
    scaleX?: number | [number, number];
    scaleY?: number | [number, number];
    scaleZ?: number | [number, number];
    // to be expanded
  };
}


const getPropChangeFunc = (initProp: number, endPropValue: number, execFunc: (value: number) => void) =>  {
  return (progress: number) => {
    const d = endPropValue - initProp;
    let p = Math.abs(d) * progress;
    if (d < 0) {
      p = initProp - p;
    }
    return execFunc(p);
  };
}


export default function animate (el: HTMLElement, { timingFunction, duration, done, props }: AnimateOptions) {
  let distanceArr: ((progress: number) => void)[] = [];
  if (props.width !== undefined) {
    let initValue;
    let endValue;
    if (typeof props.width === 'number') {
      const { width } = el.getBoundingClientRect();
      initValue = width;
      endValue = props.width;
    } else {
      const [i, e] = props.width;
      initValue = i;
      endValue = e;
    }
    distanceArr.push(getPropChangeFunc(
      initValue,
      endValue,
      (value) => {
        el.style.width = `${value}px`;
      },
    ));
  }
  if (props.height !== undefined) {
    let initValue;
    let endValue;
    if (typeof props.height === 'number') {
      const { height } = el.getBoundingClientRect();
      initValue = height;
      endValue = props.height;
    } else {
      const [i, e] = props.height;
      initValue = i;
      endValue = e;
    }
    distanceArr.push(getPropChangeFunc(
      initValue,
      endValue,
      (value) => {
        el.style.height = `${value}px`;
      },
    ));
  }
  let currentTime = Date.now();
  let tick = () => {
    const interval = Date.now() - currentTime;
    const execFunc = () => {
      const distanceProgress = timingFunction(interval / duration);
      distanceArr.forEach((func) => {
        func(distanceProgress);
      });
    };
    if (interval >= duration) {
      execFunc();
      done && done();
      return;
    }
    execFunc();
    raf(tick);
  };
  raf(tick);
}
