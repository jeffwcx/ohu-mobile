import { IconDef } from '../types';
import { BadgeProps } from '../Badge';
import { NavigateProps } from '../_utils/navigate';

export interface EntryItemProps extends NavigateProps {
  icon?: string | IconDef;
  image?: string;
  iconSize?: string;
  iconAreaSize?: 'sm' | 'md' | 'lg';
  text?: string;
  textSize?: 'xsm' | 'sm' | 'md' | 'lg';
  minorText?: string;
  badge?: number | string | BadgeProps;
}

export interface EntryItemEvents {
  onClick: Event;
}
