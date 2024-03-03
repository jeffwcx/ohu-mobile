import Icon from '../Icon';
import { CSSProperties, VNode } from 'vue';
import { IconDef } from '../types';
import { EntryItemEvents, EntryItemProps } from './types';
import { defineComponent, props } from '../_utils/defineComponent';
import Badge, { BadgeProps } from '../Badge';
import navigate from '../_utils/navigate';

export const entryItemProps = {
  icon: props<string, IconDef>(String, Object).optional,
  image: String,
  iconSize: String,
  iconAreaSize: props.ofStringLiterals('sm', 'md', 'lg').default('md'),
  text: String,
  textSize: props.ofStringLiterals('xsm', 'sm', 'md', 'lg').default('md'),
  minorText: String,
  to: props<string, object>(String, Object).optional,
  url: String,
  replace: props(Boolean).default(false),
  badge: props<string, number, BadgeProps>(String, Number, Object).optional,
};

export default defineComponent<EntryItemProps, EntryItemEvents>(
  'entry-item',
).create({
  props: entryItemProps,
  methods: {
    onClick(e: Event) {
      navigate(this);
      this.$emit('click', e);
    },
    wrapBadge(vnode: VNode[] | VNode | string) {
      const { badge } = this;
      if (badge === undefined) return;
      let badgeProps: BadgeProps = {};
      if (typeof badge === 'string' || typeof badge === 'number') {
        badgeProps.text = badge;
      } else {
        badgeProps = badge;
      }
      return <Badge {...{ props: badgeProps }}>{vnode}</Badge>;
    },
  },
  render() {
    const root = this.$rootCls();
    const {
      $slots,
      icon,
      image,
      text,
      minorText,
      iconSize,
      iconAreaSize,
      textSize,
      badge,
    } = this;
    root.is([`icon-area-${iconAreaSize}`, `text-${textSize}`]);
    const iconStyle: CSSProperties = {};
    if (iconSize) {
      iconStyle.width = iconSize;
      iconStyle.height = iconSize;
    }
    let textContent: string | VNode[] | VNode | undefined =
      $slots.default || text;
    let iconArea: VNode[] | VNode | undefined = $slots.icon;
    if (!iconArea) {
      if (icon) {
        iconArea = <Icon type={icon} style={iconStyle}></Icon>;
      }
      if (image) {
        iconArea = <img style={iconStyle} src={image} alt="icon" />;
      }
    }
    if (badge && iconArea) {
      iconArea = this.wrapBadge(iconArea);
    }
    if (!iconArea && badge && textContent) {
      textContent = this.wrapBadge(textContent);
    }
    return (
      <div class={root} onClick={this.onClick} role="button">
        {iconArea && <div class={root.element('icon')}>{iconArea}</div>}
        {textContent && <span class={root.element('text')}>{textContent}</span>}
        {minorText && (
          <span class={root.element('minor-text')}>{minorText}</span>
        )}
      </div>
    );
  },
});
