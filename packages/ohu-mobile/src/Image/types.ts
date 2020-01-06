import { LazyloadEvents, LazyloadScopedSlots } from '../Lazyload';

export interface ImageEvents extends LazyloadEvents {
  onReload: void;
}

export type ImageScopedSlots = Omit<LazyloadScopedSlots, 'default'>;
