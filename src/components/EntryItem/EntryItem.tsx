import { componentFactoryOf } from 'vue-tsx-support';
import props from 'vue-strict-prop';
import { prefix } from '../_utils/shared';
import './styles/index.scss';
import { SVGIconDef } from '../../global';
import Icon from '../Icon';
import { Location } from 'vue-router';

export interface EntryItemEvents {
  click: Event;
}

const entryItemBaseName = `${prefix}menu-item`;
const entryItemIconCls = `${entryItemBaseName}__icon`;
const entryItemTextCls = `${entryItemBaseName}__text`;
const entryItemMinorTextCls = `${entryItemBaseName}__minor-text`;
const EntryItem = componentFactoryOf<EntryItemEvents>().create({
  name: entryItemBaseName,
  props: {
    icon: props<string, SVGIconDef>(String, Object).optional,
    image: String,
    iconSize: String,
    iconAreaSize: props.ofStringLiterals('sm', 'md', 'lg').default('md'),
    text: String,
    textSize: props.ofStringLiterals('xsm', 'sm', 'md', 'lg').default('md'),
    minorText: String,
    to: props<string, Location>(String, Object).optional,
    url: String,
    replace: props(Boolean).default(false),
  },
  computed: {
    cls() {
      return {
        [entryItemBaseName]: true,
        [`is-icon-area-${this.iconAreaSize}`]: true,
        [`is-text-${this.textSize}`]: true,
      };
    },
  },
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
    const { cls, icon, image, text, minorText, iconSize, $slots } = this;
    const iconStyle: Partial<CSSStyleDeclaration> = {};
    if (iconSize) {
      iconStyle.width = iconSize;
      iconStyle.height = iconSize;
    }
    const textContent = $slots.default || text;
    return (
      <div class={cls} onClick={this.onClick}>
        <div class={entryItemIconCls}>
          { icon && <Icon type={icon} style={iconStyle}></Icon> }
          { image && <img style={iconStyle} src={image} alt="icon" /> }
        </div>
        { textContent && <span class={entryItemTextCls}>{ textContent }</span> }
        { minorText && <span class={entryItemMinorTextCls}>{ minorText }</span> }
      </div>
    );
  },
});

export default EntryItem;
