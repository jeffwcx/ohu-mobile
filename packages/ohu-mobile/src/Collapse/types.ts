import { IconDef } from '../types';

export type CollapseExpandIconPosition = 'left' | 'right';

export type CollapseValue = (string | number)[] | string | number;

export interface CollapseProps {
  expandIcon?: IconDef | null;
  expandIconPosition?: CollapseExpandIconPosition;
  value?: CollapseValue;
  accordion?: boolean;
}

export interface CollapseEvents {
  onChange: CollapseValue;
}

export interface CollapseItemProps {
  key: string | number;
  title?: string;
  hasList?: boolean;
  disabled?: boolean;
}

export interface CollapseItemEvents {}
