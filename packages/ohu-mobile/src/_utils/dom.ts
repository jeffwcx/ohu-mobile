
export type ScrollElement = HTMLElement | Window;

// github.com/youzan/vant/-/blob/src/utils/dom/scroll.ts
const overflowScrollReg = /scroll|auto/i;
export function getScrollEventTarget(element: HTMLElement, rootParent: ScrollElement = window) {
  let node = element;
  while (
    node &&
    node.tagName !== 'HTML' &&
    node.nodeType === 1 &&
    node !== rootParent
  ) {
    const { overflowY } = window.getComputedStyle(node);
    if (overflowScrollReg.test(overflowY as string)) {
      if (node.tagName !== 'BODY') {
        return node;
      }
      const { overflowY: htmlOverflowY } = window.getComputedStyle(node.parentNode as Element);
      if (overflowScrollReg.test(htmlOverflowY)) {
        return node;
      }
    }
    node = node.parentNode as HTMLElement;
  }
  return rootParent;
}
