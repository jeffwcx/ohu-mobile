import { LoadingProps } from '../Loading';

export interface ListProps {
  loading?: boolean;
  loadingProps?: LoadingProps;
  finished?: boolean;
  finishedText?: string;
}


export interface ListItemProps {
  text?: string;
  minorText?: string;
  disabled?: boolean;
  button?: boolean;
  divider?: boolean;
  paddingDivider?: boolean;
}

export interface ListItemEvents {
  onClick: Event;
}


export interface ListSubheaderProps {
  sticky: boolean;
}
