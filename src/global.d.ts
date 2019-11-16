import { VueConstructor, VNodeData } from 'vue';

export interface SVGIconDef {
  name: string;
  theme: 'outlined' | 'filled' | 'multi-color' | 'illustration';
  attrs: {
    viewBox?: string;
  },
  children?: string;
}

export type VueEventWrapper<E> = {
  [K in keyof E]?: (event: E[K]) => any;
}

export type PickProperty<T, K extends keyof T> = T[K];
export type TsxProps<T extends VueConstructor> = Omit<PickProperty<InstanceType<T>, '_tsxattrs'>,
'style' | 'domPropsInnerHTML' | 'id' | 'key' | 'class' | 'ref' | 'refInFor' | 'scopedSlots' | 'staticClass' | 'slot'>;
