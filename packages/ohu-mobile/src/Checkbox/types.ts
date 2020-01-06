import { CheckBaseProps, CheckBaseEvents } from '../_checkbase/CheckBase';
import { IconProperty } from '../types';

export interface CheckboxProps extends CheckBaseProps {
  indeterminate?: boolean;
  indeterminateIcon?: IconProperty;
}

export interface CheckboxEvents extends CheckBaseEvents {};
