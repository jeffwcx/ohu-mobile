import { RadioProps } from '../Radio';
import { IconProperty } from '../types';
export interface RadioGroupEvents {
  onChange: any;
}

export type RadioOption<T = any> = RadioProps & {
  label?: string;
  attach?: T;
  children?: RadioOption<T>[];
};

export interface RadioGroupProps {
  name?: string;
  value?: any;
  disabled?: boolean;
  options?: (RadioOption | string)[];
  color?: string;
  unCheckedColor?: string;
  checkedIcon?: IconProperty;
  unCheckedIcon?: IconProperty | null;
}
