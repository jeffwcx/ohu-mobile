import { IconDef } from '../types';

export interface ButtonEvents {
  onClick: Event;
}

export interface ButtonProps {
  type?: 'default' | 'primary' | 'link' | 'translucent';
  plain?: boolean;
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  inline?: boolean;
  icon?: string | IconDef;
  round?: boolean;
}
