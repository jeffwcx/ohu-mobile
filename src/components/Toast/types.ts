import { PopupOutSideProps, PopupOutSideEvents } from '../Popup';
import { MethodBaseOptions, PopupDepositComponent } from '../_utils/createPopupMethodApi';
import { SVGIconDef } from '@/global';
import { IconProps } from '../Icon';

export interface ToastProps extends PopupOutSideProps {
  icon?: string | SVGIconDef | IconProps;
  duration?: number;
  content?: string;
  loading?: boolean;
}

export interface ToastEvents extends PopupOutSideEvents {}

export type ToastOptions = MethodBaseOptions & ToastProps;

export declare function toastInfo(content: string, duration?: number, options?: PopupOutSideProps & MethodBaseOptions): PopupDepositComponent;
export declare function toastLoading(content: string, options?: PopupOutSideProps & MethodBaseOptions): PopupDepositComponent;

export type ToastInfoOptions = Parameters<typeof toastInfo>;

export type ToastLoadingOptions = ToastInfoOptions | Parameters<typeof toastLoading>;
