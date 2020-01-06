import Vue from 'vue';
import { LocaleDef } from '../src/locale/types';

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
