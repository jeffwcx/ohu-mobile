import props from 'vue-strict-prop';
import { parseStyleText } from '../_utils/props-util';
import { $gridUnits } from '../_config/variables';
import { defineComponent } from '../_utils/defineComponent';

export default defineComponent('unit').create({
  props: {
    span: props(Number).validator((v) => v > 0 && v <= $gridUnits).optional,
    shrink: props(Boolean).default(true),
    grow: props(Boolean).default(false),
    offset: props(Number).optional,
  },
  render() {
    const { $slots, $vnode, span, shrink, grow, offset } = this;
    const cls = this.$rootCls()
      .is(!!span && `${span}-${$gridUnits}`)
      .is(!shrink && 'no-shrink')
      .is(grow && 'grow')
      .is(offset !== undefined && `offset-${offset}`);
    let innerStyle;
    let innerClass: Record<string, boolean> = {};
    if ($vnode && $vnode.data) {
      const nodeStyle = $vnode.data.style;
      const nodeClass = $vnode.data.class;
      if (typeof nodeStyle === 'string') {
        innerStyle = parseStyleText(nodeStyle);
      } else {
        innerStyle = { ...nodeStyle };
      }
      if (typeof nodeClass === 'string' && nodeClass.trim() !== '') {
        nodeClass.split(' ').forEach((c: string) => {
          innerClass[c.trim()] = true;
        });
      } else {
        innerClass = { ...nodeClass };
      }
      $vnode.data.style = '';
      $vnode.data.class = '';
    }
    return (
      <div class={cls}>
        <div style={innerStyle} class={innerClass}>
          {$slots.default}
        </div>
      </div>
    );
  },
});
