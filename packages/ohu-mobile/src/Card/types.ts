
export interface CardProps {
  shadow?: boolean;
  borderless?: boolean;
  divider?: boolean;
}

export interface CardHeaderProps {
  status?: 'error' | 'success' | 'normal';
  bold?: boolean;
  extra?: string;
}
