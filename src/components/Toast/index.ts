import Toast from './Toast';
import createPopupMethodApi from '../_utils/createPopupMethodApi';
import { ToastOptions, ToastInfoOptions, ToastLoadingOptions } from './types';
import isPlainObject from '../_utils/isPlainObject';

const { createOpenApi, close, createCustomApi } = createPopupMethodApi(Toast, true);

const transformFunc = (content: string, arg1?: number | ToastOptions, arg2?: ToastOptions) => {
  const toastOptions: ToastOptions = { content };
  if (arg1 !== undefined) {
    if (typeof arg1 === 'number') {
      toastOptions.duration = arg1;
    } else if (isPlainObject(arg1)) {
      return Object.assign(toastOptions, arg1);
    }
  }
  if (arg2) {
    Object.assign(toastOptions, arg2);
  }
  return toastOptions;
};

export default Object.assign(Toast, {
  open: createOpenApi<ToastOptions>(),
  info: createCustomApi<ToastInfoOptions, ToastOptions>(transformFunc),
  loading: createCustomApi<ToastLoadingOptions, ToastOptions>(transformFunc, {
    loading: true,
    duration: 0,
  }),
  hide: close,
});

export * from './types';
