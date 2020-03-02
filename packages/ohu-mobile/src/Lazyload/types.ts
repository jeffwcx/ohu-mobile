import { EsModuleComponent } from 'vue/types/options';
import { ImgHTMLAttributes } from 'vue-tsx-support/types/dom';

export interface LazyloadScopedSlots {
  default?: boolean;
  error?: {
    reload: () => void;
    error?: Error;
  };
}


export interface LazyloadEvents {
  onError: Error;
  onLoaded: void;
}

export type LazyloadTransitions = 'fade' | 'none';

export interface LazyloadProps {
  disabled?: boolean;
  src?: string;
  rootElement?: Element | null;
  threshold?: number;
  rootMargin?: string;
  tag?: string;
  asyncComponent?: (() => Promise<EsModuleComponent>) | null;
  animation?: LazyloadTransitions;
  imgAttrs?: ImgHTMLAttributes;
  imgStyle?: Partial<CSSStyleDeclaration>;
}
