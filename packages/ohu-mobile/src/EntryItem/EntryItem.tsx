
import Icon from '../Icon';
import { Location } from 'vue-router';
import { VNode } from 'vue';
import { IconDef } from '../types';
import { EntryItemEvents, EntryItemProps } from './types';
import { defineComponent, props } from '../_utils/defineComponent';
import Badge, { BadgeProps } from '../Badge';

export const entryItemProps = {
  icon: props<string, IconDef>(String, Object).optional,
  image: String,
  iconSize: String,
  iconAreaSize: props.ofStringLiterals('sm', 'md', 'lg').default('md'),
  text: String,
  textSize: props.ofStringLiterals('xsm', 'sm', 'md', 'lg').default('md'),
  minorText: String,
  to: props<string, Location>(String, Object).optional,
  url: String,
  replace: props(Boolean).default(false),
  badge: props<string, number, BadgeProps>(String, Number, Object).optional,
}

export default defineComponent<EntryItemProps, EntryItemEvents>('entry-item').create({
  props: entryItemProps,
  methods: {
    onClick(e: Event) {
      this.$emit('click', e);
      const { to, $router, url, replace } = this;
      if (to && $router) {
        replace ? $router.replace(to) : $router.push(to);
      } else if (url) {
        replace ? window.location.replace(url) : window.location.href = url;
      }
    },
  },
  render() {
    const root = this.root();
    const {
      $slots,
      icon, image, text, minorText, iconSize, iconAreaSize, textSize, badge,
    } = this;
    root.is([`icon-area-${iconAreaSize}`, `text-${textSize}`]);
    const iconStyle: Partial<CSSStyleDeclaration> = {};
    if (iconSize) {
      iconStyle.width = iconSize;
      iconStyle.height = iconSize;
    }
    const textContent = $slots.default || text;
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
      let badgeProps: BadgeProps = {};
      if (typeof badge === 'string' || typeof badge === 'number') {
        badgeProps.text = badge;
      } else {
        badgeProps = badge;
      }
      iconArea = <Badge {...{ props: badgeProps }}>{iconArea}</Badge>
    }
    return (
      <div class={root} onClick={this.onClick} role="button">
        {
          iconArea
          &&
          <div class={root.element('icon')}>{ iconArea }</div>
        }
        { textContent && <span class={root.element('text')}>{ textContent }</span> }
        { minorText && <span class={root.element('minor-text')}>{ minorText }</span> }
      </div>
    );
  },
});
