import { VNode } from 'vue';
import { componentFactory } from 'vue-tsx-support';
import props from 'vue-strict-prop';
import { prefix } from '../_utils/shared';
import { cloneVNode } from '../_utils/vnode';
import vars from '../_styles/variables';
import * as componentVars from '../_styles/component.variables';
import './styles/index.scss';

const cMarkerBaseName = `${prefix}corner-marker`;
const cMarkerTextCls = `${cMarkerBaseName}__text`;
const cMarkerTriangleCls = `${cMarkerBaseName}__triangle`;

const themes = {
  gold: {
    color: vars.colorTextBaseInverse,
    fillColor: componentVars.cmarkerBgGold,
  },
  red: {
    color: componentVars.cmarkerTextRed,
    fillColor: componentVars.cmarkerBgRed,
  },
  grey: {
    color: vars.colorTextBaseInverse,
    fillColor: componentVars.cmarkerBgGrey,
  },
};

const directionMap: {[key: string]: number} = {
  up: 0,
  right: 1,
  down: 2,
  left: 3,
};

const CornerMarker = componentFactory.create({
  name: cMarkerBaseName,
  props: {
    theme: props.ofStringLiterals('gold', 'red', 'grey').default('grey'),
    color: String,
    fillColor: String,
    position: props.ofStringLiterals(
      'up-left',
      'up-right',
      'down-left',
      'down-right'
    ).default('up-right'),
    text: props(String).default(''),
  },
  computed: {
    currentTheme() {
      if (this.color && this.fillColor) {
        return {
          color: this.color,
          fillColor: this.fillColor,
        };
      }
      return themes[this.theme];
    },
    cls() {
      const hasChildren = this.$slots.default instanceof Array;
      const clsMap = {
        [cMarkerBaseName]: true,
        [`is-${this.position}`]: hasChildren,
      };
      return clsMap;
    },
    triangleStyle() {
      const theme = this.currentTheme;
      const [y, x] = this.position.split('-');
      const arr = new Array(4).fill('transparent');
      arr[directionMap[y]] = theme.fillColor;
      arr[directionMap[x]] = theme.fillColor;
      return {
        borderColor: arr.join(' '),
      };
    },
  },
  methods: {

  },
  render(h) {
    const {
      cls,
      text,
      $slots,
    } = this;
    const cmarker = (
      <div class={cls} style={{ color: this.currentTheme.color }}>
        <div class={cMarkerTriangleCls} style={this.triangleStyle}></div>
        <div class={cMarkerTextCls}>{text}</div>
      </div>
    );
    // select first vnode
    if ($slots.default) {
      const container: VNode = cloneVNode($slots.default[0], true);
      if (!container.children) {
        container.children = [];
      }
      container.children.push(cmarker);
      return container;
    }
    return cmarker;
  },
});

export default CornerMarker;
