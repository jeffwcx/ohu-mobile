import 'vue-tsx-support/enable-check';

import Vue from 'vue'
import { PopupOpenOptions } from './components/Popup';

declare module 'vue/types/vue' {
  // temp use, need better plan
  interface Vue {
    _component: Vue | null;
    _wrapper: HTMLElement | null;
  }
  // temp use, need better plan
  interface VueConstructor {
    open: (props: PopupOpenOptions) => void;
    close: () => void;
  }
}
