import Dialog from './Dialog';
import createPopupMethodApi from '../_utils/createPopupMethodApi';
import { DialogAlertOptions, DialogConfirmOptions, DialogOptions } from './types';

const { createOpenApi, close } = createPopupMethodApi(Dialog);

export default Object.assign(Dialog, {
  alert: createOpenApi<DialogAlertOptions, DialogOptions>({
    cancelBtn: null,
  }),
  confirm: createOpenApi<DialogConfirmOptions, DialogOptions>({}),
  open: createOpenApi<DialogOptions>({}),
  closeAll: close,
});

export * from './types';
