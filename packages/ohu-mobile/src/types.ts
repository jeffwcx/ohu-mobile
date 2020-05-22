import 'vue-tsx-support/enable-check';
import Vue, { VueConstructor } from 'vue';
import { IconProps } from './Icon';
import { SVGIconDef } from '@ohu-mobile/icons/lib/types';

export type IconDef = SVGIconDef;

export type IconProperty = string | IconDef | IconProps;

export type VueEventWrapper<E> = {
  [K in keyof E]?: (event: E[K]) => any;
}

export type PickProperty<T, K extends keyof T> = T[K];
export type TsxProps<T extends VueConstructor> = Omit<PickProperty<InstanceType<T>, '_tsxattrs'>,
'style' | 'domPropsInnerHTML' | 'id' | 'key' | 'class' | 'ref' | 'refInFor' | 'scopedSlots' | 'staticClass' | 'slot'>;

export type VueInstance = InstanceType<typeof Vue>;

export type Mixin<T> = VueInstance & T;
