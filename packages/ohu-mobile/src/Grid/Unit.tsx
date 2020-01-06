import { component } from 'vue-tsx-support';
import { prefix } from '../_utils/shared';
import vars from '../_styles/variables';
import props from 'vue-strict-prop';
import './styles/index.scss';
import { parseStyleText } from '../_utils/props-util';


const baseUnitName = `${prefix}unit`;
export default component({
  name: baseUnitName,
  props: {
    span: props(Number).validator(v => v > 0 && v <= vars.gridUnits).optional,
    shrink: props(Boolean).default(true),
    grow: props(Boolean).default(false),
    offset: props(Number).optional,
  },
  render() {
    const { $slots, $vnode, span, shrink, grow, offset } = this;
    const cls = {
      [baseUnitName]: true,
      [`is-${span}-${vars.gridUnits}`]: !!span,
      'is-no-shrink': !shrink,
      'is-grow': grow,
      [`is-offset-${offset}`]: offset !== undefined,
    }
    let innerStyle;
    let innerClass: Record<string, boolean> = {};
    if ($vnode && $vnode.data) {
      const nodeStyle = $vnode.data.style;
      const nodeClass = $vnode.data.class;
      if (typeof nodeStyle === 'string') {
        innerStyle = parseStyleText(nodeStyle);
      } else {
        innerStyle = {...nodeStyle};
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
        <div style={innerStyle} class={innerClass}>{$slots.default}</div>
      </div>
    );
  },
});
