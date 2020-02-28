import { IconDef } from '../types';

export type NoticeBarType = 'warning' | 'default';
export type NoticeBarAction = 'link' | 'closable';

export interface NoticeBarProps {
  text?: string;
  icon?: IconDef;
  type?: NoticeBarType;
  multiline?: boolean;
  timeout?: number;
  scrollable?: boolean;
  action?: NoticeBarAction;
}

export interface NoticeBarEvents {
  onClose: void;
  onClick: Event;
}
