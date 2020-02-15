import { IconDef } from '../types';
import { Location } from 'vue-router';
import { BadgeProps } from '../Badge';

export interface EntryItemProps {
  icon?: string | IconDef;
  image?: string;
  iconSize?: string;
  iconAreaSize?: 'sm' | 'md' | 'lg';
  text?: string;
  textSize?: 'xsm' | 'sm' | 'md' | 'lg';
  minorText?: string;
  to?: string | Location;
  url?: string;
  replace?: boolean;
  badge?: number | string | BadgeProps;
}

export interface EntryItemEvents {
  onClick: Event;
}
