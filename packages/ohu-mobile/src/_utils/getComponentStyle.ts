import { BlockContext } from './classHelper';
import { colors } from './shared';

export default function getComponentStyle(root: BlockContext, color: string, fontColor: string) {
  let style: Partial<CSSStyleDeclaration> = {};
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
