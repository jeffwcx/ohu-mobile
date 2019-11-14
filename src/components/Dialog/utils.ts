import { DialogActionOptions } from './types';
import { IconProps } from '../Icon';
import { DialogIconOption } from './Dialog';

export function createActionOptions(
  defaultOptions: DialogActionOptions,
  btn?: DialogActionOptions | string)
{
  const action: DialogActionOptions = defaultOptions;
  if (typeof btn === 'string') {
    action.text = btn;
  } else {
    Object.assign(action, btn);
  }
  return action;
}

export function isIconProps(icon: DialogIconOption): icon is IconProps {
  return !!(icon as IconProps).type;
}
