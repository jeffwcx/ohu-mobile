import { RadioProps, RadioEvents } from '../Radio';
import { TagSize } from '../Tag';

type NoUsedProps =
  | 'checkedIcon'
  | 'unCheckedIcon'
  | 'color'
  | 'unCheckedColor'
  | 'labelClickable';

export interface RadioTagProps extends Omit<RadioProps, NoUsedProps> {
  tagSize?: TagSize;
}

export interface RadiopTagEvents extends RadioEvents {}
