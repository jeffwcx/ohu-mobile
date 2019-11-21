import { IconProperty } from '@/global';

export interface DropMenuProps {
  defaultValue?: Record<string, any> | any[];
  direction?: 'up' | 'down';
  divider?: boolean;
}

export type DropMenuDataModel = Record<string | number, any>;

export interface DropMenuEvents {
  onChange: DropMenuDataModel;
  onItemChange: DropMenuChangeEvent;
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
  dropDownIcon?: IconProperty;
}

export interface DropMenuItemEvents {}

