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
