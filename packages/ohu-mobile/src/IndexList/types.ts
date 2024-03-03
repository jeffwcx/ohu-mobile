import { CombinedVueInstance } from 'vue/types/vue';
import { ListSubheaderProps, ListProps } from '../List';
import { ClassOptions } from '../_utils/classHelper';

export type IndexListGroupType = CombinedVueInstance<Vue, {}, {}, {}, {}>;

export interface IndexListProps {
  /**
   * Enables label bubble with selected index when swipe over IndexBar
   */
  label?: boolean;
  indexes?: (string | number)[];
  innerScroll?: boolean;
  enableIndex?: boolean;
  barClass?: ClassOptions;
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
