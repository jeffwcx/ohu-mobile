import { LoadingProps } from '../Loading';
import { VueConstructor } from 'vue/types/umd';

export interface ListProps {
  loading?: boolean;
  loadingProps?: LoadingProps;
  finished?: boolean;
  finishedText?: string;
  scrollContainer?: (self: InstanceType<VueConstructor>) => Element;
  infinite?: boolean;
  infiniteDistance?: boolean;
  infiniteCheck?: boolean;
}

export interface ListEvents {
  onInfinite: void;
}

export interface ListItemProps {
  text?: string;
  minorText?: string;
  disabled?: boolean;
  button?: boolean;
  divider?: boolean;
  paddingDivider?: boolean;
  layoutReverse?: boolean;
}

export interface ListItemEvents {
  onClick: Event;
}


export interface ListSubheaderProps {
  sticky: boolean;
}
