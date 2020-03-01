import { TabbarProps, TabbarItemProps } from '../Tabbar';


export interface TabsProps extends TabbarProps {
  sticky?: boolean;
}

export interface TabsEvents {
  onInput: number;
}

export interface TabProps extends Omit<TabbarItemProps, 'name'> {
  title?: string;
}
