import { VNodeData } from 'vue';
import { componentFactory } from 'vue-tsx-support';
import props from 'vue-strict-prop';
import { prefix } from '../_utils/shared';
import './styles/index.scss';

const themes = {
  primary: {
    color: '#2d7eff',
    background: 'rgba(47, 131, 255, 0.102)',
  },
  warning: {
    color: '#ff9434',
    background: 'rgba(255, 185, 76, 0.149 )',
  },
  gradient: {
    color: '#FFF',
    background: 'linear-gradient(315deg,rgba(255,186,77,1) 0%,rgba(255,146,51,1) 100%)',
  },
};

const tagBaseName = `${prefix}tag`;
const Tag = componentFactory.create({
  name: tagBaseName,
  props: {
    type: props.ofStringLiterals('primary', 'warning', 'gradient').default('primary'),
    shape: props.ofStringLiterals('square', 'fillet').default('square'),
    size: props.ofStringLiterals('sm', 'md').default('sm'),
    color: String,
    fillColor: String,
  },
  computed: {
    cls() {
      const clsMap = {
        [tagBaseName]: true,
        'is-md': this.size === 'md',
        'is-fillet': this.shape === 'fillet',
      };
      return clsMap;
    },
  },
  render(h) {
    const {
      cls,
      type,
      color,
      fillColor,
      $attrs,
      $slots,
    } = this;
    let style = {};
    if (color && fillColor) {
      style = {
        background: fillColor,
        color,
      };
    } else {
      style = themes[type];
    }
    const tagProps: VNodeData = {
      attrs: $attrs,
      class: cls,
      style,
    };
    return (
      <div {...tagProps}>
        {$slots.default}
      </div>
    );
  },
});

export default Tag;
