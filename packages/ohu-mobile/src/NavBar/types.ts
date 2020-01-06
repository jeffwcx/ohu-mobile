export interface NavBarEvents {
  onClickLeft: Event;
}

export interface NavBarProps {
  type?: 'light' | 'primary';
  title?: string;
  leftArrow?: boolean;
  leftText?: string;
  divider?: boolean;
}
