import { IconProperty } from '@/global';

export interface DropMenuProps {
  defaultValue?: Record<string, any> | any[];
  direction?: 'up' | 'down';
  divider?: boolean;
}

export interface DropMenuEvents {
  onChange: DropMenuChangeEvent;
}


export interface DropMenuItemOptions {
  label?: string;
  value: any;
  disabled?: boolean;
}
export interface DropMenuChangeEvent extends DropMenuItemOptions {
  key?: number | string;
  index: number;
}

export interface DropMenuItemProps {
  title?: string;
  disabled?: boolean;
  options?: DropMenuItemOptions[];
  checkIcon?: IconProperty;
}

export interface DropMenuItemEvents {}
