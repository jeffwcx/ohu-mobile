import { RadioOption } from '../RadioGroup';
import { CheckboxOption } from '../CheckboxGroup';
import { IconDef } from '../types';
import { PopupProps, PopupHeaderProps, PopupEvents } from '../Popup';

export type SelectOption = RadioOption | CheckboxOption;

export type SelectBeforeFunc = () => (Promise<boolean> | boolean | void);

export interface SelectProps {
  name?: string;
  visible?: boolean;
  value?: any | any[];
  title?: string;
  options?: SelectOption[];
  confirm?: boolean;
  multiple?: boolean;
  icon?: IconDef | null;
  minHeight?: string;
  maxHeight?: string;
  popupContentStyle?: object;
  native?: boolean;
  outline?: boolean;
  noBorder?: boolean;
  fullScreen?: boolean;
  popupProps?: PopupProps;
  headerProps?: PopupHeaderProps;
  disabled?: boolean;
  placeholder?: string;
  allowClear?: boolean;
  beforeOpen?: SelectBeforeFunc;
  beforeClose?: SelectBeforeFunc;
}

export interface SelectEvents extends PopupEvents {
  onChange: any | any[];
  onConfirm: any;
  onSelect: any;
  onShow: void;
  onHide: void;
  onVisibleChange: boolean;
}

export interface SelectScopedSlots {
  control?: SelectOption[] | SelectOption;
  content?: {
    value: any;
    handleChange: (value: any, option: SelectOption | SelectOption[]) => void;
  };
}
