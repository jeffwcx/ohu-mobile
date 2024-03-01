import { VNodeData } from 'vue';
import type { LocaleDef } from './locale/types';
import 'vue-router';
import type {
  Element as TsxElement,
  ElementClass as TsxElementClass,
  CombinedTsxComponentAttrs,
  AttributesOf,
  PropsOf,
  PrefixedEventsOf,
  OnOf,
  IsPropsObjectAllowed,
  IntrinsicElements as TsxIntrinsicElements,
} from 'vue-tsx-support/types/base';
import type {
  TransitionProps,
  TransitionGroupProps,
  KeepAliveProps,
} from 'vue-tsx-support/types/builtin-components';
declare module 'vue/types/vue' {
  interface Vue {
    $ohuLang: string;
    $ohuMessages: {
      [key: string]: LocaleDef;
    };
  }
}

declare global {
  namespace VueTsxSupport.JSX {
    interface Element extends TsxElement {}
    interface ElementClass extends TsxElementClass {}
    type LibraryManagedAttributes<C, P> = C extends new () => infer V
      ? CombinedTsxComponentAttrs<
          AttributesOf<V>,
          PropsOf<V>,
          PrefixedEventsOf<V>,
          OnOf<V>,
          V extends { $scopedSlots: infer X } ? X : {},
          IsPropsObjectAllowed<V>
        > &
          (V extends { _tsxattrs: infer T } ? T : {})
      : P;

    // interface ElementAdditionalAttrs {
    //   props?: VNodeData['props'];
    // }

    interface IntrinsicElements extends TsxIntrinsicElements {
      // allow unknown elements
      [name: string]: any;

      // builtin components
      transition: CombinedTsxComponentAttrs<
        TransitionProps,
        {},
        {},
        {},
        {},
        true
      >;
      'transition-group': CombinedTsxComponentAttrs<
        TransitionGroupProps,
        {},
        {},
        {},
        {},
        true
      >;
      'keep-alive': CombinedTsxComponentAttrs<
        KeepAliveProps,
        {},
        {},
        {},
        {},
        true
      >;
    }
  }
}
