import { VNodeData } from 'vue';
import { ListItemEvents, ListItemProps } from './types';
import { defineComponent, props } from '../_utils/defineComponent';

export default defineComponent<ListItemProps, ListItemEvents>(
  'list-item',
).create({
  props: {
    text: String,
    minorText: String,
    disabled: props(Boolean).default(false),
    button: props(Boolean).default(false),
    divider: props(Boolean).default(true),
    paddingDivider: props(Boolean).default(true),
    layoutReverse: props(Boolean).default(false),
  },
  render() {
    const {
      $slots,
      text,
      minorText,
      button,
      divider,
      disabled,
      paddingDivider,
      layoutReverse,
    } = this;
    const hasAction = !!$slots.action;
    const root = this.$rootCls();
    root.has([
      hasAction && 'action',
      divider && 'divider',
      paddingDivider && 'divider-padding',
    ]);
    root.is([
      button && 'button',
      disabled && 'disabled',
      layoutReverse && 'reverse',
    ]);
    const props: VNodeData = {
      class: root,
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
    let textClass = root.block('text');
    const centerNode = $slots.default ? (
      $slots.default
    ) : (
      <div class={textClass}>
        {textNode && (
          <span class={textClass.element('primary')}>{textNode}</span>
        )}
        {minorTextNode && (
          <p class={textClass.element('minor')}>{minorTextNode}</p>
        )}
      </div>
    );
    return (
      <li {...props}>
        <div class={root.element('main')}>
          {$slots.thumb && (
            <div class={root.block('thumb')}>{$slots.thumb}</div>
          )}
          {$slots.avatar && (
            <div class={root.block('avatar')}>{$slots.avatar}</div>
          )}
          {$slots.icon && <div class={root.block('icon')}>{$slots.icon}</div>}
          {centerNode}
        </div>
        {hasAction && <div class={root.block('action')}>{$slots.action}</div>}
      </li>
    );
  },
});
