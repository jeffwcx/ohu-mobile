import { EntryItemEvents, EntryItemProps } from '../EntryItem';

export interface TabbarChangeEvent {
  key: string | number;
  index: number;
  name?: string | number;
}

export interface TabbarEvents {
  onChange: TabbarChangeEvent;
  onInput: string | number;
}

export interface TabbarProps {
  value?: string | number;
  border?: boolean;
  borderInverse?: boolean;
  activeColor?: string;
  inActiveColor?: string;
  hasIndicator?: boolean;
  indicatorWidth?: number | string;
  indicatorHeight?: string;
  indicatorInverse?: boolean;
  vertical?: boolean;
  scroll?: boolean;
}

export interface TabbarItemEvents extends EntryItemEvents {}

export interface TabbarItemProps extends EntryItemProps {
  name?: string | number;
}
