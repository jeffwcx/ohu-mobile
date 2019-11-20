import { PopupOutSideEvents, PopupOutSideProps } from '../Popup';
import { VueEventWrapper, IconProperty } from '@/global';
import { CreateElement, VNode } from 'vue';
import { MethodBaseOptions } from '../_utils/createPopupMethodApi';

export interface DialogEvents extends PopupOutSideEvents {
  onOk: void;
  onCancel: void;
  onAbort: DialogActionOptions;
}

export interface DialogActionOptions {
  type?: 'ok' | 'cancel';
  text?: string;
  color?: string;
  loading?: boolean;
  disabled?: boolean;
  handle?: () => Promise<boolean | undefined> | boolean | void;
}

export interface DialogProps extends PopupOutSideProps {
  icon?: IconProperty;
  title?: string;
  content?: string,
  cancelBtn?: string | DialogActionOptions | null;
  okBtn?: string | DialogActionOptions | null;
  actions?: DialogActionOptions[] | null;
  layout?: 'row' | 'column';
}

export type DialogOptions = MethodBaseOptions & DialogProps & VueEventWrapper<DialogEvents> & {
  renderTitle?: (h?: CreateElement) => (VNode | VNode[]);
};

export type DialogAlertOptions = Omit<DialogOptions, 'cancelBtn' | 'actions'>;

export type DialogConfirmOptions = Omit<DialogOptions, 'actions'>;
