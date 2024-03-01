import Icon from '../Icon';
import Divider from '../Divider';
import { IconDef } from '../types';
import { PopoverItemEvents } from './types';
import { $prefix, $popoverDividerColor } from '../_config/variables';
import { defineComponent, props } from '../_utils/defineComponent';

export const basePopoverItemName = `${$prefix}popover-item`;

export default defineComponent<{}, PopoverItemEvents>('popover-item').create({
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
    },
  },
  render() {
    const { $slots, icon, divider, disabled } = this;
    const cls = this.$rootCls().is(disabled && 'disabled');
    return (
      <div
        class={cls}
        role="button"
        onClick={this.onClick}
        onTouchstart={this.onTouchstart}
      >
        <div class={cls.element('content')}>
          {icon && (
            <div class={cls.element('icon')}>
              <Icon type={icon}></Icon>
            </div>
          )}
          <div class={cls.element('text')}>{$slots.default}</div>
        </div>
        {divider && <Divider color={$popoverDividerColor}></Divider>}
      </div>
    );
  },
});
