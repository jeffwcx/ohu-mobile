import 'vue-tsx-support/enable-check';
import 'stickybits';
import { VueConstructor } from 'vue';
import { IconProps } from './Icon';
import { SVGIconDef } from '@ohu-mobile/icons/lib/types';
import { LocaleDef } from './locale/types';

export type IconDef = SVGIconDef;

export type IconProperty = string | IconDef | IconProps;

export type VueEventWrapper<E> = {
  [K in keyof E]?: (event: E[K]) => any;
}

export type PickProperty<T, K extends keyof T> = T[K];
export type TsxProps<T extends VueConstructor> = Omit<PickProperty<InstanceType<T>, '_tsxattrs'>,
'style' | 'domPropsInnerHTML' | 'id' | 'key' | 'class' | 'ref' | 'refInFor' | 'scopedSlots' | 'staticClass' | 'slot'>;


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
