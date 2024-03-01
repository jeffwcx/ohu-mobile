import { IconProperty } from '../types';
import { SyntheticEvent, InputHTMLAttributes } from 'vue-tsx-support/types/dom';

export interface InputBaseAttrs {
  max?: number | string;
  min?: number | string;
  maxlength?: string | number;
  minlength?: string | number;
  multiple?: boolean;
  tabindex?: string | number;
  step?: string | number;
  size?: string | number;
  required?: boolean;
  pattern?: string;
  accept?: string | number;
  autocomplete?: string;
  autofocus?: boolean;
  autosave?: string;
  placeholder?: string;
  rows?: string | number;
  cols?: string | number;
}

export interface InputProps extends InputBaseAttrs {
  name?: string;
  type?: string;
  value?: any;
  // show clear button?
  allowClear?: boolean;
  // show toggle eye?
  allowTogglePassword?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  outline?: boolean;
  startAdornment?: IconProperty | string;
  endAdornments?: IconProperty | string;
  noBorder?: boolean;
}

export type InputChangeEvent = SyntheticEvent<
  HTMLInputElement & { composing: boolean }
>;
export type InputFocusEvent = SyntheticEvent<InputHTMLAttributes, FocusEvent>;
export type InputBlurEvent = InputFocusEvent;

export interface InputEvents {
  onValueChange: any;
  onInput: InputChangeEvent;
  onChange: InputChangeEvent;
  onFocus: InputFocusEvent;
  onBlur: InputBlurEvent;
  onClear: void;
  onKeyDown: Event;
  onEnter: Event;
}
