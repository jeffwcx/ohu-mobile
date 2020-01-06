import DropMenuItem from './DropMenuItem';
import { PopupOutSideEvents } from '../Popup';
import { IconProperty } from '../types';

export interface DropMenuProps {
  defaultValue?: Record<string, any> | any[];
  direction?: 'up' | 'down';
  divider?: boolean;
  itemActive?: boolean;
  mask?: boolean;
  checkIcon?: IconProperty;
  dropDownIcon?: IconProperty;
  popupStyle?: Partial<CSSStyleDeclaration>;
  popupClass?: string | Record<string, boolean> | Array<string>;
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

export interface DropMenuChangeOption extends DropMenuItemOptions {
  key?: number | string;
  index?: number;
}

export interface DropMenuItemProps {
  title?: string;
  disabled?: boolean;
  options?: DropMenuItemOptions[];
  checkIcon?: IconProperty;
  dropDownIcon?: IconProperty;
  popupStyle?: Partial<CSSStyleDeclaration>;
  popupClass?: string | Record<string, boolean> | Array<string>;
}

export interface DropMenuItemEvents extends PopupOutSideEvents {

}

export interface DropMenuItemScopedSlots {
  default: {
    checked?: DropMenuItemOptions,
    options: DropMenuItemOptions[],
    instance: InstanceType<typeof DropMenuItem>,
  };
}

