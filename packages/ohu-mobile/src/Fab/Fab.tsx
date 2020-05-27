import { defineComponent, props } from '../_utils/defineComponent';
import { FabProps, FabEvents } from './types';
import Button, { buttonProps } from '../Button/Button';
import { ButtonTypes } from '../Button';
import { IconDef } from '../types';
import { AddOutlined, CloseOutlined } from '@ohu-mobile/icons';
import Icon from '../Icon';
import { $prefix } from '../_config/variables';
import { VNodeData, VueConstructor } from 'vue/types/umd';


function computeMaxRadius(x: number, y: number, w: number, h: number) {
  return Math.sqrt(Math.max(
    Math.pow(x, 2) + Math.pow(y, 2),
    Math.pow(w - x, 2) + Math.pow(y, 2),
    Math.pow(w - x, 2) + Math.pow(h - y, 2),
    Math.pow(x, 2) + Math.pow(h - y, 2),
  ));
}

const createFab = defineComponent<FabProps, FabEvents>('fab');



export default createFab.create({
  model: {
    prop: 'expand',
    event: 'change',
  },
  props: {
    ...buttonProps,
    type: props.ofType<ButtonTypes>().default('primary'),
    icon: props<string, IconDef>(String, Object).default(() => AddOutlined),
    round: props(Boolean).default(true),
    inline: props(Boolean).default(true),
    expand: props(Boolean).default(false),
    position: props(String).default('right-bottom'),
    direction: props(String).optional,
    mask: props(Boolean).default(false),
    maskClosable: props(Boolean).default(false),
    maskTransition: props(String).default('all 500ms cubic-bezier(0.19, 1, 0.22, 1)'),
    label: props(String).optional,
    text: props(String).optional,
    zIndex: props(Number).default(2),
    shadow: props(Boolean).default(true),
  },
  watch: {
    expand(cur) {
      this.internalExpand = cur;
    },
    internalExpand() {
      this.ripple();
    }
  },
  computed: {
    currentPos() {
      const [x, y] = this.position.split('-');
      return [ x || 'right', y || 'bottom' ];
    },
    actionsDirection() {
      if (this.direction) {
        return this.direction;
      }
      let defaultDir = 'up';
      let possibleDir = {
        up: true,
        down: true,
        left: true,
        right: true,
      };
      const [x, y] = this.currentPos;
      if (x === 'left') {
        delete possibleDir.left;
      }
      if (x === 'right') {
        delete possibleDir.right;
      }
      if (y === 'top') {
        delete possibleDir.up;
      }
      if (y === 'bottom') {
        delete possibleDir.down;
      }
      const result = Object.keys(possibleDir);
      if (result.length === 0) return defaultDir;
      return result[0];
    },
    fabPosition() {
      const btn = this.$refs.button as InstanceType<VueConstructor>;
      if (btn && btn.$el) {
        return btn.$el.getBoundingClientRect();
      }
    },
    labelDirection() {
      const [x, y] = this.currentPos;
      if (this.actionsDirection === 'up' || this.actionsDirection === 'down') {
        if (x === 'left' || x === 'center') {
          return 'right'
        } else if (x === 'right') {
          return 'left';
        }
      } else {
        if (y === 'top') {
          return 'bottom';
        } else if (y === 'bottom' || y === 'center') {
          return 'top';
        }
      }
      return 'right';
    },
  },
  data() {
    return {
      internalExpand: this.expand,
      maskPosition: {} as Partial<CSSStyleDeclaration>,
    };
  },
  methods: {
    maskAnimate() {
      let minRadius = 0;
      const rect = this.fabPosition;
      if (rect) {
        minRadius = Math.min(rect.width, rect.height);
      }
      if (minRadius !== 0) {
        const style: Partial<CSSStyleDeclaration> = {
          transform: 'scale3d(1, 1, 1)',
          borderRadius: minRadius + 'px',
          width: minRadius + 'px',
          height: minRadius + 'px',
          transformOrigin: 'center',
        };
        if (!this.internalExpand) {
          style.transition = this.maskTransition;
        } else {
          style.transition = 'none';
        }
        this.maskPosition = style;
      }
      this.$nextTick(() => {
        this.ripple();
      });
    },
    ripple() {
      if (this.internalExpand) {
        let x = 0;
        let y = 0;
        let minRadius = 0;
        let innerWidth = window.innerWidth;
        let innerHeight = window.innerHeight;
        const rect = this.fabPosition;
        if (rect) {
          x = rect.x + (rect.width / 2);
          y = rect.y + (rect.height / 2);
          minRadius = Math.min(rect.width, rect.height);
        }
        const radius = computeMaxRadius(x, y, innerWidth, innerHeight);
        const size = radius * 2;
        const scale = (size + 100) / minRadius;
        this.maskPosition = {
          transform: `scale3d(${scale}, ${scale}, 1)`,
          width: minRadius + 'px',
          height: minRadius + 'px',
          borderRadius: minRadius + 'px',
          transformOrigin: 'center',
          transition: this.maskTransition,
          visibility: 'visible',
        };
      }
    },
    triggerChange(expand: boolean) {
      this.internalExpand = expand;
      this.$emit('change', expand);
      this.mask && this.maskAnimate();
    },
    close() {
      this.triggerChange(false);
    },
    open() {
      this.triggerChange(true);
    },
  },
  mounted() {
    this.ripple();
  },
  render() {
    const root = this.root();
    const {
      expand,
      position,
      direction,
      mask,
      label,
      icon,
      text,
      maskClosable,
      maskTransition,
      zIndex,
      shadow,
      ...props
    } = this.$props as FabProps;
    if (position) {
      root.is(position);
    }
    if (this.internalExpand) {
      root.is('expand');
    }
    const iconClass = root.element('icon');
    const actionClass = root.element('actions');
    root.is(this.actionsDirection);
    root.is(`label-${this.labelDirection}`);
    shadow && root.is('shadow');
    const maskNodeData: VNodeData = {
      class: root.element('mask'),
      style: this.maskPosition,
    };
    if (maskClosable) {
      maskNodeData.on = {
        click: () => {
          this.triggerChange(false);
        },
      };
    }
    const rootStyle: Partial<CSSStyleDeclaration> = {};
    if (zIndex) {
      rootStyle.zIndex = (this.internalExpand ? zIndex + 1 : zIndex).toString();
    }
    return (
      <div class={root} style={rootStyle}>
        {
          mask
          &&
          <div {...maskNodeData} />
        }
        {
          icon
          &&
          <Button {...{
            class: !this.text ? 'is-icon-only' : undefined,
            props,
            ref: 'button',
            on: {
              click: (e: MouseEvent) => {
                e.stopPropagation();
                this.triggerChange(!this.internalExpand);
              },
            },
          }}>
            <i class={iconClass}>
              <transition name={`${$prefix}spin`}>
                <Icon type={icon} v-show={!this.internalExpand} />
              </transition>
              <transition name={`${$prefix}spin-reverse`}>
                <Icon type={CloseOutlined} v-show={this.internalExpand} />
              </transition>
            </i>
            { text && <span>{text}</span> }
          </Button>
        }
        <div class={actionClass}>
          {this.$slots.default}
        </div>
      </div>
    );
  },
});
