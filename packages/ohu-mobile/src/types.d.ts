import { VueConstructor, VNodeData } from 'vue';
import { IconProps } from './Icon';
import { SVGIconDef } from '../../ohu-mobile-icons/es/types';

export type IconDef = SVGIconDef;

export type IconProperty = string | IconDef | IconProps;

export type VueEventWrapper<E> = {
  [K in keyof E]?: (event: E[K]) => any;
}

export type PickProperty<T, K extends keyof T> = T[K];
export type TsxProps<T extends VueConstructor> = Omit<PickProperty<InstanceType<T>, '_tsxattrs'>,
'style' | 'domPropsInnerHTML' | 'id' | 'key' | 'class' | 'ref' | 'refInFor' | 'scopedSlots' | 'staticClass' | 'slot'>;
