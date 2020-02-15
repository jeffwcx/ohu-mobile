
export interface CardProps {
  shadow?: boolean;
  borderless?: boolean;
  divider?: boolean;
}

export type CardHeaderStatus = 'error' | 'success' | 'normal';
export interface CardHeaderProps {
  status?: CardHeaderStatus;
  bold?: boolean;
  extra?: string;
}
