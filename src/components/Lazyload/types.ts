import { EsModuleComponent } from 'vue/types/options';

export interface LazyloadScopedSlots {
  default?: boolean;
  error?: {
    reload: () => void;
    error?: Error;
  };
}


export interface LazyloadEvents {
  onError: Error;
}

export interface LazyloadProps {
  root?: Element | null;
  threshold?: number;
  rootMargin?: string;
  tag?: string;
  asyncComponent?: (() => Promise<EsModuleComponent>) | null;
}
