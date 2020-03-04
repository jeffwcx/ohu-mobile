import { LazyloadEvents, LazyloadScopedSlots, LazyloadProps } from '../Lazyload';

export interface ImageEvents extends LazyloadEvents {
  onReload: void;
}

export type ImageScopedSlots = Omit<LazyloadScopedSlots, 'default'>;

export type ImageFitMode = 'contain' | 'cover' | 'fill' | 'scale-down' | 'none';

export interface ImageProps {
  src?: string;
  alt?: string;
  width?: string;
  height?: string;
  fit?: ImageFitMode;
  lazy?: Omit<LazyloadProps, 'src' | 'asyncComponent'> | boolean;
  errorTip?: string | boolean;
  round?: boolean;
  reloadStopPropagation?: boolean;
  reload?: boolean;
}
