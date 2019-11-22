import { component } from 'vue-tsx-support';
import { prefix } from '../_utils/shared';
import props from 'vue-strict-prop';
import './styles/index.scss';

const baseGridName = `${prefix}grid`;
const rowCls = `${prefix}row`;
const colCls = `${prefix}col`;
const unitsGap = `${prefix}units-gap`;
export default component({
  name: baseGridName,
  props: {
    row: props(Boolean).default(true),
    column: props(Boolean).default(false),
    x: props.ofStringLiterals('left', 'right', 'center', 'between', 'around', 'baseline', 'stretch').optional,
    y: props.ofStringLiterals('top', 'bottom', 'center', 'baseline', 'stretch', 'between', 'around').optional,
    m: props.ofStringLiterals('top', 'bottom', 'center', 'between', 'around', 'stretch').optional,
    gap: props(Number).validator((v) => v >= 0).optional,
    multi: props(Boolean).default(true),
  },
  render() {
    const { $slots, x, y, m, gap, column } = this;
    const cls = {
      [column ? colCls : rowCls ]: true,
      [`x-${x}`]: x !== undefined,
      [`y-${y}`]: y !== undefined,
      [`m-${m}`]: m !== undefined,
      [`${unitsGap}-${gap}`]: gap !== undefined && gap > 0,
      'is-multi': this.multi,
    }
    return (
      <div class={baseGridName}>
        <div class={cls}>{$slots.default}</div>
      </div>
    );
  },
});
