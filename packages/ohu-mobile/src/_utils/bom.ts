

export function getScrollTop(element: HTMLElement | Window) {
  if (element === window) {
    return Math.max(window.scrollY || 0, document.documentElement.scrollTop);
  }
  return (element as HTMLElement).scrollTop;
}

export function getClientHeight(element: HTMLElement | Window) {
  if (element === window) {
    return Math.max(document.documentElement.clientHeight, window.innerHeight);
  }
  return (element as HTMLElement).clientHeight;
}

export function getScrollHeight(element: HTMLElement) {
  return element.scrollHeight;
}


export function reachBottom(element: HTMLElement | Window, distance: number = 0) {
  const scrollElement = element === window ? document.body : element as HTMLElement;
  const scrollHeight = getScrollHeight(scrollElement);
  return scrollHeight - (getClientHeight(element) + getScrollTop(element)) <= distance;
}
