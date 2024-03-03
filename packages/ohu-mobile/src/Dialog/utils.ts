import { DialogActionOptions } from './types';
import { IconProps } from '../Icon';
import { DialogIconOption } from './Dialog';

export function createActionOptions(
  defaultOptions: DialogActionOptions,
  btn?: DialogActionOptions | string,
) {
  const action: DialogActionOptions = Object.assign({}, defaultOptions);
  if (typeof btn === 'string') {
    action.text = btn;
  } else {
    Object.assign(action, btn);
  }
  return action;
}
