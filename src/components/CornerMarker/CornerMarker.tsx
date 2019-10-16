import { VNode } from 'vue';
import { componentFactory } from 'vue-tsx-support';
import props from 'vue-strict-prop';
import { prefix } from '../_utils/shared';
import { cloneVNode } from '../_utils/vnode';
import './styles/index.scss';

const cMarkerBaseName = `${prefix}corner-marker`;
const cMarkerTextCls = `${cMarkerBaseName}__text`;
const cMarkerTriangleCls = `${cMarkerBaseName}__triangle`;

const themes = {
  gold: {
    color: '#FFF',
    fillColor: '#DBB46E',
  },
  red: {
    color: 'rgba(255, 45, 49, 0.75)',
    fillColor: 'rgba(255, 72, 77, 0.149)',
  },
  grey: {
    color: '#FFF',
    fillColor: 'rgba(135, 147, 174, 0.302)',
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
