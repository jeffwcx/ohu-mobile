import { CheckboxGroupProps, CheckboxGroupEvents, CheckboxOption } from '../CheckboxGroup';
import { ListProps } from '../List';


export interface CheckListProps extends CheckboxGroupProps, ListProps {
  position?: 'left' | 'right';
  button?: boolean;
}


export interface CheckListEvents extends CheckboxGroupEvents {}


export interface CheckListRenderOptions {
  option: CheckboxOption;
  index: number;
  checked: boolean;
}

export interface CheckListScopedSlots {
  renderItem?: CheckListRenderOptions;
  renderIcon?: CheckListRenderOptions;
  renderAction?: CheckListRenderOptions;
  renderThumb?: CheckListRenderOptions;
  renderText?: CheckListRenderOptions;
  renderMinorText?: CheckListRenderOptions;
}
