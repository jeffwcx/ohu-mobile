import { ListSubheaderProps, ListProps } from '../List';

export interface IndexListProps {
  /**
   * Enables label bubble with selected index when swipe over IndexBar
   */
  label?: boolean;
  indexes?: (string | number)[];
  innerScroll?: boolean;
  enableIndex?: boolean;
  listProps?: ListProps;
}

export interface IndexListSelectEvent {
  index: string | number;
  group: IndexListGroupProps;
}

export interface IndexListEvents {
  onSelect: IndexListSelectEvent;
}

export interface IndexListAnchorScopedSlot extends IndexListGroupProps {
  pressed: boolean;
  active: boolean;
}

export interface IndexListScopedSlots {
  label?: IndexListGroupProps;
  anchor?: IndexListAnchorScopedSlot;
}


export interface IndexListGroupProps extends ListSubheaderProps {
  /**
   * index name for each group
   */
  index: string | number;
  /**
   * subheader title
   */
  title?: string;
  /**
   * extra data
   */
  attach?: any;
  /**
   * show subheader, default true
   */
  subheader?: boolean;
}

export interface IndexListGroupEvents {}
