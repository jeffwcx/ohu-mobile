import { CheckboxProps } from '../Checkbox/types';
export interface CheckboxGroupEvents {
  onChange: any;
}

export type CheckboxOption<T = any> = CheckboxProps & {
  label?: string;
  attach?: T;
  children?: CheckboxOption<T>[];
};

export interface CheckboxGroupProps {
  name?: string;
  value?: Array<any>;
  disabled?: boolean;
  options?: Array<CheckboxOption | string>;
  max?: number;
}

export interface CheckboxGroupScopedSlots {
  renderOption?: {
    option: CheckboxOption | string;
    index: number;
  };
}
