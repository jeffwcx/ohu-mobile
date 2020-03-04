import { IconProperty } from '../types';
import { SwitchBaseEvents } from '../_internal/SwitchBase';

export interface AgreeProps {
  name?: string;
  checked?: boolean;
  disabled?: boolean;
  color?: string;
  unCheckedColor?: string;
  checkedIcon?: IconProperty | null;
  unCheckedIcon?: IconProperty | null;
}

export interface AgreeEvents extends SwitchBaseEvents {}
