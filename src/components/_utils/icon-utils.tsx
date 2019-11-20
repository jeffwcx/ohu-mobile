import { IconProperty } from '@/global';
import { VNodeData, CreateElement } from 'vue';
import Icon, { IconProps } from '../Icon';

export function isIconProps(icon: IconProperty): icon is IconProps {
  return !!(icon as IconProps).type;
}

export function getIcon(h: CreateElement, icon?: IconProperty) {
  if (icon) {
    if (isIconProps(icon))  {
      const iconData: VNodeData = {
        props: icon,
      };
      return h(Icon, iconData);
    }
    return h(Icon, { props: { type: icon } });
  }
}
