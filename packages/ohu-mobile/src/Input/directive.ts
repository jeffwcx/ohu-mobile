import { VNode } from 'vue';

interface InputBaseElement extends Element {
  vmodel?: boolean;
  type?: string;
}
export const inBrowser = typeof window !== 'undefined';
export const UA = inBrowser && window.navigator.userAgent.toLowerCase();
export const isIE9 = UA && UA.indexOf('msie 9.0') > 0;
function makeMap(str: string, expectsLowerCase?: boolean) {
  const map = Object.create(null);
  const list = str.split(',');
  // tslint:disable-next-line:prefer-for-of
  for (let i = 0; i < list.length; i += 1) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? (val: string) => map[val.toLowerCase()]
    : (val: string) => map[val];
}
const isTextInputType = makeMap('text,number,password,search,email,tel,url');

function onCompositionStart(e: any) {
  e.target.composing = true;
}

function onCompositionEnd(e: any) {
  // prevent triggering an input event for no reason
  if (!e.target.composing) {
    return;
  }
  e.target.composing = false;
  trigger(e.target, 'input');
}

function trigger(el: InputBaseElement, type: string) {
  const e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}

/* istanbul ignore if */
if (isIE9) {
  // http://www.matts411.com/post/internet-explorer-9-oninput/
  document.addEventListener('selectionchange', () => {
    const el = document.activeElement as InputBaseElement;
    if (el && el.vmodel) {
      trigger(el, 'input');
    }
  });
}

export default {
  inserted(el: InputBaseElement, binding: any, vnode: VNode) {
    if (vnode.tag === 'textarea' || isTextInputType(el.type || '')) {
      if (!binding.modifiers || !binding.modifiers.lazy) {
        el.addEventListener('compositionstart', onCompositionStart);
        el.addEventListener('compositionend', onCompositionEnd);
        // Safari < 10.2 & UIWebView doesn't fire compositionend when
        // switching focus before confirming composition choice
        // this also fixes the issue where some browsers e.g. iOS Chrome
        // fires "change" instead of "input" on autocomplete.
        el.addEventListener('change', onCompositionEnd);
        /* istanbul ignore if */
        if (isIE9) {
          el.vmodel = true;
        }
      }
    }
  },
};
