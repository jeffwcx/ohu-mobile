import Icon from './Icon';
import { IconDef } from '../types';

export interface IconProps {
  type: string | IconDef;
  color?: string;
  theme?: 'outlined' | 'filled' | 'multi-color' | 'o' | 'f' | 'm';
  spin?: boolean;
  rotate?: number;
};
export default Icon;

