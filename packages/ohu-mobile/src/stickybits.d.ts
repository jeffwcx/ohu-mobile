import 'stickybits';
declare module 'stickybits' {
  export interface ApplyStyleOptions {
    classes: Record<string, boolean>;
    styles: Record<string, string>;
  }
  export namespace StickyBits {
    export interface Options {
      applyStyle?: (
        option: ApplyStyleOptions,
        instance: StickyBits.Instance,
      ) => void;
    }
    export interface Instance {
      state?: 'sticky' | 'default' | 'stuck';
    }
  }
}
