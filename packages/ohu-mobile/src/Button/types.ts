import { IconDef } from '../types';
import { NavigateProps } from '../_utils/navigate';

export interface ButtonEvents {
  onClick: Event;
}

export type ButtonTypes = 'default' | 'primary' | 'link' | 'translucent';

export type ButtonSizes = 'sm' | 'md' | 'lg';

export interface ButtonProps extends NavigateProps {
  type?: ButtonTypes;
  plain?: boolean;
  size?: ButtonSizes;
  loading?: boolean;
  disabled?: boolean;
  inline?: boolean;
  icon?: string | IconDef;
  round?: boolean;
  link?: boolean;
  tabindex?: number;
  htmlType?: string;
}
