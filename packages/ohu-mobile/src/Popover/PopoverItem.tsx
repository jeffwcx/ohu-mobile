import { componentFactoryOf } from 'vue-tsx-support';
import props from 'vue-strict-prop';
import Icon from '../Icon';
import Divider from '../Divider';
import { IconDef } from '../types';
import { PopoverItemEvents } from './types';
import { $prefix, $popoverDividerColor } from '../_config/variables';

export const basePopoverItemName = `${$prefix}popover-item`;
const popoverItemContentCls = `${basePopoverItemName}__content`;
const popoverItemIconCls = `${basePopoverItemName}__icon`;
const popoverItemTextCls = `${basePopoverItemName}__text`;

export default componentFactoryOf<PopoverItemEvents>().create({
  name: basePopoverItemName,
  props: {
    icon: props<string, IconDef>(String, Object).optional,
    divider: props(Boolean).default(true),
    disabled: props(Boolean).default(false),
  },
  methods: {
    onClick(e: Event) {
      if (this.disabled) return;
      this.$emit('click', e);
    },
    onTouchstart(e: TouchEvent) {
      this.$emit('touchstart', e);
    }
  },
  render() {
    const { $slots, icon, divider, disabled } = this;
    const cls = {
      [basePopoverItemName]: true,
      'is-disabled': disabled,
    };
    return (
      <div class={cls} role="button" onClick={this.onClick} onTouchstart={this.onTouchstart}>
        <div class={popoverItemContentCls}>
          {
            icon
            &&
            <div class={popoverItemIconCls}>
              <Icon type={icon}></Icon>
            </div>
          }
          <div class={popoverItemTextCls}>
            { $slots.default }
          </div>
        </div>
        { divider && <Divider color={$popoverDividerColor}></Divider> }
      </div>
    );
  },
});
