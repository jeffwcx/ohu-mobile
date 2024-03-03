import 'scroll-behavior-polyfill';

export interface ScrollToTargetPosition {
  size: number;
  offset: number;
}

export default function scrollIntoCenter(
  container: Element,
  targetPositon: ScrollToTargetPosition,
  vertical = false,
) {
  let containerSize = vertical ? container.clientHeight : container.clientWidth;
  const scrollOffset =
    targetPositon.offset - (containerSize - targetPositon.size) / 2;
  const options: ScrollToOptions = {
    behavior: 'smooth',
  };
  if (!vertical) {
    options.left = scrollOffset;
  } else {
    options.top = scrollOffset;
  }
  container.scroll(options);
}
