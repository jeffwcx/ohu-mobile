import 'vue-tsx-support/enable-check';
import Vue from 'vue'
import { LocaleDef } from './components/locale/types';

declare module 'vue/types/vue' {
  interface VueConstructor {
    util: {
      defineReactive(obj: object, key: string, value: any): void;
    }
  }

  interface Vue {
    $ohuLang: string;
    $ohuMessages: {
      [key: string]: LocaleDef;
    };
  }
}

declare module 'stickybits' {
  export interface ApplyStyleOptions {
    classes: Record<string, boolean>;
    styles: Record<string ,string>;
  }
  export namespace StickyBits {
    export interface Options {
      applyStyle?: (option: ApplyStyleOptions, instance: StickyBits.Instance) => void;
    }
    export interface Instance {
      state?: 'sticky' | 'default' | 'stuck';
    }
  }
}
