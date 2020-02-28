import { EntryItemEvents, EntryItemProps } from '../EntryItem';

export interface TabbarEvents {
  onChange: string | number;
  onInput: string | number;
}

export interface TabbarProps {
  value?: string | number;
  border?: boolean;
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
