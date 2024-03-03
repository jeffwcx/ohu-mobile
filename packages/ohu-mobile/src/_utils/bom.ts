export function getScrollTop(element: Element | Window) {
  if (element === window) {
    return Math.max(window.scrollY || 0, document.documentElement.scrollTop);
  }
  return (element as HTMLElement).scrollTop;
}

export function getClientHeight(element: Element | Window) {
  if (element === window) {
    return Math.max(document.documentElement.clientHeight, window.innerHeight);
  }
  return (element as HTMLElement).clientHeight;
}

export function getScrollHeight(element: HTMLElement) {
  return element.scrollHeight;
}

export function getTopOffsetOfWrapperAndInner(
  wrapper: Element | Window,
  inner: Element,
) {
  let top = 0;
  if (wrapper !== window) {
    const wrapperRect = (wrapper as Element).getBoundingClientRect();
    top = wrapperRect.top;
  }
  const innerRect = inner.getBoundingClientRect();
  return Math.abs(top - innerRect.top);
}

export function isElementSticky(scroller: Element | Window, el: Element) {
  let st = 0;
  if (scroller !== window) {
    st = (scroller as Element).getBoundingClientRect().top;
  }
  const { bottom } = el.getBoundingClientRect();
  return bottom - st > 0;
}

export function reachBottom(element: Element | Window, distance: number = 0) {
  const scrollElement =
    element === window ? document.body : (element as HTMLElement);
  const scrollHeight = getScrollHeight(scrollElement);
  return (
    scrollHeight - (getClientHeight(element) + getScrollTop(element)) <=
    distance
  );
}
