import { componentFactoryOf } from 'vue-tsx-support';
import props from 'vue-strict-prop';
import { VNodeData } from 'vue';
import { ListItemEvents } from './types';
import { $prefix } from '../_config/variables';

const baseListItemName = `${$prefix}list-item`;
const listItemAvatarCls = `${baseListItemName}-avatar`;
const listItemThumbCls = `${baseListItemName}-thumb`;
const listItemIconCls = `${baseListItemName}-icon`;
const listItemMainCls = `${baseListItemName}__main`;
const listItemTextCls = `${baseListItemName}-text`;
const listItemTextPrimaryCls = `${listItemTextCls}__primary`;
const listItemTextMinorCls = `${listItemTextCls}__minor`;
const listItemActionCls = `${baseListItemName}-action`;
export default componentFactoryOf<ListItemEvents>().create({
  name: baseListItemName,
  props: {
    text: String,
    minorText: String,
    disabled: props(Boolean).default(false),
    button: props(Boolean).default(false),
    divider: props(Boolean).default(true),
    paddingDivider: props(Boolean).default(true),
  },
  render() {
    const { $slots, text, minorText, button, divider, disabled, paddingDivider } = this;
    const hasAction = !!$slots.action;
    const rootClass = {
      [baseListItemName]: true,
      'has-action': hasAction,
      'is-button': button,
      'has-divider': divider,
      'is-disabled': disabled,
      'has-divider-padding': paddingDivider,
    };
    const props: VNodeData = {
      class: rootClass,
    };
    if (button) {
      props.on = {
        click: (e: Event) => {
          if (disabled) return;
          this.$emit('click', e);
        },
        touchstart: (e: TouchEvent) => {
          this.$emit('touchstart', e);
        },
      };
    }
    const textNode = $slots.text || text;
    const minorTextNode = $slots.minorText || minorText;
    const centerNode = $slots.default
      ? $slots.default
      : (
        <div class={listItemTextCls}>
          {
            textNode
            &&
            <span class={listItemTextPrimaryCls}>{textNode}</span>
          }
          {
            minorTextNode
            &&
            <p class={listItemTextMinorCls}>{minorTextNode}</p>
          }
        </div>
      );
    return (
      <li {...props}>
        <div class={listItemMainCls}>
          {
            $slots.thumb
            &&
            <div class={listItemThumbCls}>{$slots.thumb}</div>
          }
          {
            $slots.avatar
            &&
            <div class={listItemAvatarCls}>{$slots.avatar}</div>
          }
          {
            $slots.icon
            &&
            <div class={listItemIconCls}>{$slots.icon}</div>
          }
          {centerNode}
        </div>
        {
          hasAction
          &&
          <div class={listItemActionCls}>
            { $slots.action }
          </div>
        }
      </li>
    );
  },
});
