import 'vue-tsx-support/enable-check';

import Vue from 'vue'

declare module 'vue/types/vue' {
  // temp use
  interface Vue {
    _component: Vue | null;
    _wrapper: HTMLElement | null;
  }
}
