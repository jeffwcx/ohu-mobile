import { PopupOutSideProps } from '../Popup';

export interface DialogEvents extends PopupOutSideProps {
  onOk: void;
  onCancel: void;
}

export interface DialogActionOptions {
  type?: 'ok' | 'cancel';
  text?: string;
  color?: string;
  loading?: boolean;
  disabled?: boolean;
  handle?: () => any;
}
