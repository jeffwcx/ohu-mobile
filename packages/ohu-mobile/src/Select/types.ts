import { RadioOption } from '../RadioGroup';
import { CheckboxOption } from '../CheckboxGroup';
import { IconDef } from '../types';
import { PopupProps, PopupHeaderProps } from '../Popup';

export type SelectOption = RadioOption | CheckboxOption;

export interface SelectProps {
  name?: string;
  value?: any | any[];
  title?: string;
  options?: SelectOption[];
  confirm?: boolean;
  multiple?: boolean;
  icon?: IconDef;
  minHeight?: string;
  maxHeight?: string;
  native?: boolean;
  outline?: boolean;
  noBorder?: boolean;
  popupProps?: PopupProps;
  headerProps?: PopupHeaderProps;
}

export interface SelectEvents {
  onChange: any | any[];
  onConfirm: any;
  onSelect: any;
  onShow: void;
  onHide: void;
}

export interface SelectScopedSlots {
  control: SelectOption[] | SelectOption;
}
