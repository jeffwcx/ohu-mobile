import { TabbarProps, TabbarItemProps } from '../Tabbar';

export interface TabsProps extends TabbarProps {
  sticky?: boolean;
}

export interface TabsEvents {
  onChange: number | string;
}

export interface TabProps extends TabbarItemProps {
  name?: string;
  /**
   * title for tab
   */
  title?: string;
}
