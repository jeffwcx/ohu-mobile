import { PopupOutSideProps, PopupOutSideEvents } from '../Popup';
import { MethodBaseOptions, PopupDepositComponent } from '../_utils/createPopupMethodApi';
import { IconProperty } from '../types';

export interface ToastProps extends PopupOutSideProps {
  icon?: IconProperty;
  duration?: number;
  content?: string;
  loading?: boolean;
}

export interface ToastEvents extends PopupOutSideEvents {}

export type ToastOptions = MethodBaseOptions & ToastProps;

export declare function toastInfo(content: string, duration?: number, options?: PopupOutSideProps & MethodBaseOptions): PopupDepositComponent;
export declare function toastLoading(content: string, options?: PopupOutSideProps & MethodBaseOptions): PopupDepositComponent;

export type ToastInfoOptions = Parameters<typeof toastInfo> | Parameters<typeof toastLoading>;

export type ToastLoadingOptions = ToastInfoOptions;
