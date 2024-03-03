import { $prefix, $gridGapLevel } from '../_config/variables';
import { defineComponent, props } from '../_utils/defineComponent';

const rowCls = `${$prefix}row`;
const colCls = `${$prefix}col`;
const unitsGap = `${$prefix}units-gap`;
export default defineComponent('grid').create({
  props: {
    row: props(Boolean).default(true),
    column: props(Boolean).default(false),
    x: props.ofStringLiterals(
      'left',
      'right',
      'center',
      'between',
      'around',
      'baseline',
      'stretch',
      'evenly',
    ).optional,
    y: props.ofStringLiterals(
      'top',
      'bottom',
      'center',
      'baseline',
      'stretch',
      'between',
      'around',
      'evenly',
    ).optional,
    m: props.ofStringLiterals(
      'left',
      'right',
      'top',
      'bottom',
      'center',
      'between',
      'around',
      'stretch',
      'evenly',
    ).optional,
    gap: props(Number).validator((v) => v >= 0 && v <= $gridGapLevel).optional,
    wrap: props(Boolean).default(false),
    reverse: props(Boolean).default(false),
  },
  render() {
    const { $slots, x, y, m, gap, column, wrap, reverse } = this;
    const cls = {
      [column ? colCls : rowCls]: true,
      [`x-${x}`]: x !== undefined,
      [`y-${y}`]: y !== undefined,
      [`m-${m}`]: m !== undefined,
      [`${unitsGap}-${gap}`]: gap !== undefined && gap > 0,
      'is-multi': wrap,
      'is-reverse': reverse,
    };
    return <div class={cls}>{$slots.default}</div>;
  },
});
