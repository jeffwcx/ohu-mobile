import { componentFactoryOf } from 'vue-tsx-support';
import props from 'vue-strict-prop';
import Popup, { PopupOutSideProps, PopupEnterEvent } from '../Popup';
import './styles/index.scss';
import { cloneElement, getVNodesByName } from '../_utils/vnode';
import { VNodeData, VNode } from 'vue';
import { prefix } from '../_utils/shared';
import omit from '../_utils/omit';
import { getAnchorPosition, getTransformOrigin } from '../Popup/utils';
import { popupOutSideProps } from '../Popup/PopupWrapper';
import { basePopoverItemName } from './PopoverItem';
import { PopoverEvents, PopoverSelectEvent } from './types';

const basePopoverName = `${prefix}popover`;
const popoverContentCls = `${basePopoverName}__content`;
const popoverContentArrowCls = `${basePopoverName}__arrow`;

const popoverProps = omit(popupOutSideProps, ['scrollBody', 'anchor', 'fullscreen']);
popoverProps.animate.default = 'zoom';
popoverProps.position.default = () => ({ vertical: 'bottom', horizontal: 'center' });
popoverProps.marginThreshold.default = 6;
popoverProps.mask.default = false;
popoverProps.closeOnMaskTouched.default = true;

export default componentFactoryOf<PopoverEvents>().create({
  name: basePopoverName,
  model: {
    prop: 'visible',
    event: 'visibleChange',
  },
  props: {
    ...popoverProps,
    noArrow: props(Boolean).default(false),
    minArrowMargin: props.ofType<number>().default(8),
    contentStyle: props.ofType<Partial<CSSStyleDeclaration>>().optional,
    contentClass: String,
  },
  data() {
    return {
      popupVisible: this.visible,
      arrowStyle: {},
    } as {
      popupVisible: boolean,
      arrowStyle: Partial<CSSStyleDeclaration>,
    };
  },
  computed: {
    anchorPos() {
      return getAnchorPosition(this.position);
    },
  },
  methods: {
    close() {
      this.popupVisible = false;
      this.$emit('close', this.popupVisible);
    },
  },
  render() {
    const {
      $slots, $props, $listeners,
      arrowStyle, anchorPos, contentStyle, contentClass,
    } = this;
    const transformOrigin = getTransformOrigin(anchorPos, this.transformOrigin);
    const isTop = anchorPos.vertical === 'top' && transformOrigin.vertical === 'bottom';
    const isBottom = anchorPos.vertical === 'bottom' && transformOrigin.vertical === 'top';
    const isLeft = anchorPos.horizontal === 'left' && transformOrigin.horizontal === 'right';
    const isRight = anchorPos.horizontal === 'right' && transformOrigin.horizontal === 'left';
    const popCls = {
      'is-top': isTop,
      'is-bottom': isBottom,
      'is-center-left': isLeft,
      'is-center-right': isRight,
    };
    const anchorProps: VNodeData = {
      ref: 'anchor',
      on: {
        click: () => {
          this.popupVisible = true;
        },
      },
    };
    const anchor = $slots.anchor && cloneElement($slots.anchor[0], anchorProps);
    const popupData: VNodeData = {
      props: {
        ...$props,
        visible: this.popupVisible,
        anchor: () => {
          return anchor.elm;
        },
      } as PopupOutSideProps,
      on: {
        ...$listeners,
        close: () => {
          this.close();
        },
        enter: ({ anchor, doc }: PopupEnterEvent) => {
          let anchorCentralXAxis = 0;
          let anchorCentralYAxis = 0;
          const style: Partial<CSSStyleDeclaration> = {};
          if (anchor) {
            anchorCentralXAxis = (anchor.width / 2) + anchor.left;
            anchorCentralYAxis = (anchor.height / 2) + anchor.top;
          }
          if (doc) {
            if (isLeft || isRight) {
              let arrowY = anchorCentralYAxis - doc.top;
              if (arrowY < this.minArrowMargin) {
                arrowY += this.minArrowMargin;
              }
              style.top = arrowY + 'px';
              style[this.anchorPos.horizontal === 'left' ? 'right' : 'left'] = '1px';
            } else {
              let arrowX = anchorCentralXAxis - doc.left;
              if (arrowX < this.minArrowMargin) {
                arrowX += this.minArrowMargin;
              }
              style.left = arrowX + 'px';
              style[this.anchorPos.vertical === 'top' ? 'bottom' : 'top'] = '1px';
            }
            this.arrowStyle = style;
          }
          this.$emit('enter', { anchor, doc })
        },
      },
    };
    const cls = {
      [basePopoverName]: true,
      ...popCls,
    };
    let content: VNode[] | undefined;
    if ($slots.default) {
      const items = getVNodesByName($slots.default, basePopoverItemName);
      if (items.length > 0) {
        content = items.map((item, index) => {
          return cloneElement(item, {
            on: {
              click:() => {
                const event: PopoverSelectEvent = { key: item.key, index };
                this.$emit('select', event);
                this.close();
              },
            },
          });
        });
      } else {
        content = $slots.default;
      }
    }
    const contentCls = [popoverContentCls];
    if (contentClass) {
      contentCls.push(contentClass);
    }
    return (
      <div>
        { anchor }
        <Popup {...popupData}>
          <div class={cls}>
            {
              !this.noArrow
              &&
              <div class={popoverContentArrowCls}
                style={arrowStyle}>
              </div>
            }
            {
              content
              &&
              <div class={contentCls}
                style={contentStyle}>
                {content}
              </div>
            }
          </div>
        </Popup>
      </div>
    );
  },
});
