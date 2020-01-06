import { componentFactory } from 'vue-tsx-support';
import props from 'vue-strict-prop';
import { prefix } from '../_utils/shared';
import { VNodeData } from 'vue';
import { transformToCamelCase } from './utils';
import { IconDef } from '../types';
import './styles/index.scss';

const allIcons: {
  [key: string]: IconDef,
} = {};

const shorthandMap = {
  o: 'outlined',
  f: 'filled',
  m: 'multi-color',
};

const themes = ['outlined', 'filled', 'multi-color', 'o', 'f', 'm'];

const baseIconName = `${prefix}icon`;
const Icon = componentFactory.create({
  name: baseIconName,
  props: {
    type: props<string, IconDef>(String, Object).required,
    color: String,
    theme: props.ofStringLiterals(...themes).default('outlined'),
    spin: props(Boolean).default(false),
    rotate: props(Number).default(0),
  },
  computed: {
    cls() {
      return {
        [baseIconName]: true,
        'is-spin': this.spin,
      };
    },
  },
  render() {
    let { cls, type, rotate, color, theme, $attrs } = this;
    let currentIcon;
    let title;
    if (typeof type === 'string') {
      let iconName = type;
      themes.some((t) => {
        const typestr = type.toString();
        const postfix = '-' + t;
        const result = typestr.endsWith(postfix);
        if (result) {
          const index = typestr.lastIndexOf(postfix);
          iconName = typestr.substring(0, index);
          theme = t;
        }
        return result;
      });
      if (theme === 'o' || theme === 'f' || theme === 'm') {
        theme = shorthandMap[theme];
      }
      type = iconName + '-' + theme;
      title = type;
      const iconType = transformToCamelCase(type);
      currentIcon = allIcons[iconType];
    } else {
      title = type.name;
      currentIcon = type;
    }
    if (!currentIcon) return <i></i>;
    const { attrs, children } = currentIcon;
    const style: Partial<CSSStyleDeclaration> = {};
    if (color) {
      style.color = color;
    }
    if (rotate > 0) {
      const rotateValue = `rotateZ(${rotate}deg)`;
      style.transform = rotateValue;
      style.webkitTransform = rotateValue;
    }
    const iconProps: VNodeData = {
      attrs: {
        ...$attrs,
        ...(attrs || {}),
        'aria-hidden': true,
        tabindex: -1,
        title,
        role: 'presentation',
      },
      class: cls,
      style,
      domProps: {
        innerHTML: children,
      },
    };
    return (
      <svg {...iconProps} focusable="false"></svg>
    );
  },
});

export default Icon;
