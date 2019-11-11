import { componentFactoryOf } from 'vue-tsx-support';
import props from 'vue-strict-prop';
import Popup, { PopupOutSideProps, PopupEnterEvent } from '../Popup';
import './styles/index.scss';
import { cloneElement } from '../_utils/vnode';
import { VNodeData } from 'vue';
import { prefix } from '../_utils/shared';
import { popupProps } from '../Popup/Popup';
import omit from '../_utils/omit';
import { getAnchorPosition, getTransformOrigin } from '../Popup/utils';

export interface PopoverEvents {}

const basePopoverName = `${prefix}popover`;
const popoverContentCls = `${basePopoverName}__content`;
const popoverContentArrowCls = `${basePopoverName}__arrow`;

const popoverProps = omit(popupProps, ['scrollBody', 'anchor', 'fullscreen']);
popoverProps.animate.default = 'zoom';
popoverProps.position.default = () => ({ vertical: 'bottom', horizontal: 'center' });
popoverProps.marginThreshold.default = 6;
popoverProps.mask.default = false;

export default componentFactoryOf<PopoverEvents>().create({
  name: basePopoverName,
  props: {
    ...popoverProps,
    minArrowMargin: props.ofType<number>().default(8),
  },
  data() {
    return {
      popupVisible: false,
      arrowStyle: {},
      popoverCls: {},
    } as {
      popupVisible: boolean,
      arrowStyle: Partial<CSSStyleDeclaration>,
      popoverCls: { [key: string]: boolean },
    };
  },
  computed: {
    anchorPos() {
      return getAnchorPosition(this.position);
    },
  },
  render() {
    const { $slots, $props, arrowStyle, anchorPos } = this;
    const anchorProps: VNodeData = {
      ref: 'anchor',
      on: {
        click: () => {
          this.popupVisible = true;
        },
      },
    };
    const anchor = $slots.default && cloneElement($slots.default[0], anchorProps);
    const popupData: VNodeData = {
      props: {
        ...$props,
        visible: this.popupVisible,
        anchor: () => {
          return anchor.elm;
        },
      } as PopupOutSideProps,
      on: {
        close: () => {
          this.popupVisible = false;
          this.$emit('close');
        },
        enter: ({ anchor, doc }: PopupEnterEvent) => {
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
          this.popoverCls = popCls;
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
              style[this.anchorPos.horizontal === 'left' ? 'right' : 'left'] = '0px';
            } else {
              let arrowX = anchorCentralXAxis - doc.left;
              if (arrowX < this.minArrowMargin) {
                arrowX += this.minArrowMargin;
              }
              style.left = arrowX + 'px';
              style[this.anchorPos.vertical === 'top' ? 'bottom' : 'top'] = '0px';
            }
            this.arrowStyle = style;
          }
          this.$emit('enter', { anchor, doc })
        },
      },
    };
    const cls = {
      [basePopoverName]: true,
      ...this.popoverCls,
    };
    return (
      <div>
        { anchor }
        <Popup {...popupData}>
          <div class={cls}>
            <div class={popoverContentArrowCls} style={arrowStyle}></div>
            <div class={popoverContentCls}>
              {$slots.content}
            </div>
          </div>
        </Popup>
      </div>
    );
  },
});
