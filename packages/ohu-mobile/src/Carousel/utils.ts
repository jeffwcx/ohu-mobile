import type { CSSProperties } from 'vue';
import { CSSValue, CarouselSlideDirection } from './types';

export function computeCSSValue(
  cssValue: string | number,
  defaultUnit = 'px',
): CSSValue {
  let unit = defaultUnit;
  let value = 0;
  if (typeof cssValue === 'string') {
    cssValue.replace(/([0-9]+)([a-zA-Z]+)?/g, (_, v, u) => {
      if (v) value = parseInt(v, 10);
      if (u) unit = u;
      return '';
    });
  }
  return { unit, value };
}

export function getClientRectByDirection(
  el: Element,
  direction: CarouselSlideDirection,
) {
  const { width, height } = el.getBoundingClientRect();
  if (direction === 'horizontal') {
    return width;
  }
  return height;
}

export function setTransformByDirection(
  style: CSSProperties,
  direction: CarouselSlideDirection,
  offset: number,
) {
  if (direction === 'horizontal') {
    style.transform = `translate3d(${offset}px, 0, 0)`;
  } else {
    style.transform = `translate3d(0, ${offset}px, 0)`;
  }
}
