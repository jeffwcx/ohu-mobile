import { BadgePosition, BadgeProps, BadgeType } from './types';
import { defineComponent, props } from '../_utils/defineComponent';
import { colors } from '../_utils/shared';
import getComponentStyle from '../_utils/getComponentStyle';
import { CSSProperties } from 'vue';

export default defineComponent<BadgeProps>('badge').create({
  props: {
    type: props.ofType<BadgeType>().default('tag'),
    color: props(String).default('red'),
    fontColor: String,
    position: props.ofType<BadgePosition>().default('up-right'),
    text: props(String, Number).default(''),
    overflowNumber: props(Number).default(99),
  },
  render() {
    const root = this.$rootCls();
    const { type, text, color, fontColor, position, overflowNumber, $slots } =
      this;
    let style = getComponentStyle(root, color, fontColor);
    let inner;
    let badge = root.element(type);
    if (type === 'corner') {
      badge.is([$slots.default instanceof Array && position]);
      const cornerRootStyle: CSSProperties = {};
      const cornerTextStyle: CSSProperties = {};
      if (!colors.includes(color)) {
        cornerRootStyle.color = color;
      }
      if (fontColor) {
        cornerTextStyle.color = fontColor;
      }
      inner = (
        <div class={badge} style={cornerRootStyle}>
          <div class={badge.element('triangle')}></div>
          <div class={badge.element('text')} style={cornerTextStyle}>
            {text}
          </div>
        </div>
      );
    } else if (type === 'tag') {
      let innerText = text;
      if (typeof text === 'number' && text > overflowNumber) {
        innerText = `${overflowNumber}+`;
      }
      inner = (
        <span class={badge} style={style}>
          {innerText}
        </span>
      );
    } else {
      inner = <span class={badge} style={style}></span>;
    }
    if ($slots.default) {
      return (
        <div class={root.is('wrapper')}>
          {$slots.default}
          {inner}
        </div>
      );
    }
    return <div class={root}>{inner}</div>;
  },
});
