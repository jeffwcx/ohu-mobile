import type { ImportedComponent } from 'vue/types/options';
import { ImgHTMLAttributes } from 'vue-tsx-support/types/dom';
import type { CSSProperties } from 'vue';

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
  asyncComponent?: (() => Promise<ImportedComponent>) | null;
  animation?: LazyloadTransitions;
  imgAttrs?: ImgHTMLAttributes;
  imgStyle?: CSSProperties;
}
