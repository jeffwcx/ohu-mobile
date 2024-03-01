import { CheckboxOption } from '../CheckboxGroup';
import { ListProps } from '../List';
import { RadioGroupProps, RadioGroupEvents } from '../RadioGroup';

export interface RadioListProps extends RadioGroupProps, ListProps {
  position?: 'left' | 'right';
  button?: boolean;
  paddingDivider?: boolean;
}

export interface RadioListEvents extends RadioGroupEvents {}

export interface RadioListRenderOptions {
  option: CheckboxOption;
  index: number;
  checked: boolean;
}

export interface RadioListScopedSlots {
  renderItem?: RadioListRenderOptions;
  renderIcon?: RadioListRenderOptions;
  renderAction?: RadioListRenderOptions;
  renderThumb?: RadioListRenderOptions;
  renderText?: RadioListRenderOptions;
  renderMinorText?: RadioListRenderOptions;
}
