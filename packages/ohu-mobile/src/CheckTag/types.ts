import { CheckboxProps, CheckboxEvents } from '../Checkbox';
import { TagSize } from '../Tag';

type NoUsedProps = 'checkedIcon' | 'unCheckedIcon' | 'color' | 'unCheckedColor' | 'indeterminate' | 'indeterminateIcon' | 'labelClickable';

export interface CheckTagProps extends Omit<CheckboxProps, NoUsedProps> {
  tagSize?: TagSize;
}

export interface CheckTagEvents extends CheckboxEvents {}
