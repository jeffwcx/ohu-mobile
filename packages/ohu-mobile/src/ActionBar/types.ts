import { ButtonProps } from '../Button';

export type ActionOption = Omit<ButtonProps, 'inline'> & {
  text?: string;
  onClick?: (e: Event) => void;
};

export interface ActionBarProps {
  actions?: ActionOption[];
  divider?: boolean;
  visible?: boolean;
}

export interface ActionBarEvents {
  onClick: ActionOption;
}
