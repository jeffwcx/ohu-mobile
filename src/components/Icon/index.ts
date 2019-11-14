import Icon from './Icon';
import { SVGIconDef } from '@/global';

export interface IconProps {
  type: string | SVGIconDef;
  color?: string;
  theme?: 'outlined' | 'filled' | 'multi-color' | 'o' | 'f' | 'm';
  spin?: boolean;
  rotate?: number;
};
export default Icon;

