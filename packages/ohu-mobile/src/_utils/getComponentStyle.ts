import { CSSProperties } from 'vue';
import { BlockContext } from './classHelper';
import { colors } from './shared';

export default function getComponentStyle(
  root: BlockContext,
  color: string,
  fontColor: string,
) {
  let style: CSSProperties = {};
  if (color) {
    if (colors.includes(color)) {
      root.is(color);
    } else {
      style.background = color;
    }
  }
  if (fontColor) {
    style.color = fontColor;
  }
  return style;
}
