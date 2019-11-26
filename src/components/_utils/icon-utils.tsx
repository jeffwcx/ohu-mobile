import { IconProperty } from '@/global';
import { VNodeData, CreateElement } from 'vue';
import Icon, { IconProps } from '../Icon';

export function isIconProps(icon: IconProperty): icon is IconProps {
  return !!(icon as IconProps).type;
}

export function getIcon(h: CreateElement, icon?: IconProperty, props?: Record<string, any>) {
  if (icon) {
    if (isIconProps(icon))  {
      if (props) {
        Object.assign(icon, props);
      }
      const iconData: VNodeData = {
        props: icon,
      };
      return h(Icon, iconData);
    }
    return h(Icon, { props: { type: icon, ...props } });
  }
}
