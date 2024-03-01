import Vue, { CSSProperties } from 'vue';
import type { IconProps } from './Icon';
import type { SVGIconDef } from '@ohu-mobile/icons/lib/types';

export type IconDef = SVGIconDef;

export type IconProperty = string | IconDef | IconProps;

export type VueEventWrapper<E> = {
  [K in keyof E]?: (event: E[K]) => any;
};

export type PickProperty<T, K extends keyof T> = T[K];

export type VueInstance = InstanceType<typeof Vue>;

export type Mixin<T> = VueInstance & T;

export type CSSProps = CSSProperties;
