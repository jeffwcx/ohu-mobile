import Popup, {
  PopupOutSideProps,
  PopupEnterEvent,
  PopupProps,
  PopupAnchorPosition,
} from '../Popup';
import { cloneElement, getVNodesByName } from '../_utils/vnode';
import type { VNodeData, VNode, CSSProperties } from 'vue';
import omit from '../_utils/omit';
import { getAnchorPosition, getTransformOrigin } from '../Popup/utils';
import { popupOutSideProps } from '../Popup/PopupWrapper';
import { basePopoverItemName } from './PopoverItem';
import { PopoverEvents, PopoverSelectEvent } from './types';
import { defineComponent, props } from '../_utils/defineComponent';

const popoverProps = omit(popupOutSideProps, [
  'scrollBody',
  'anchor',
  'fullscreen',
]);
popoverProps.animate.default = 'zoom';
popoverProps.position.default = () => ({
  vertical: 'bottom',
  horizontal: 'center',
});
popoverProps.marginThreshold.default = 6;
popoverProps.mask.default = false;
popoverProps.closeOnMaskTouched.default = true;

export interface PopupInnerProps {
  anchorPos: PopupAnchorPosition;

  close: () => void;
}

export default defineComponent<PopupProps, PopoverEvents, {}, PopupInnerProps>(
  'popover',
).create({
  model: {
    prop: 'visible',
    event: 'visibleChange',
  },
  props: {
    ...popoverProps,
    noArrow: props(Boolean).default(false),
    minArrowMargin: props.ofType<number>().default(8),
    contentStyle: props.ofType<CSSProperties>().optional,
    contentClass: String,
  },
  data() {
    return {
      popupVisible: this.visible,
      arrowStyle: {},
    } as {
      popupVisible: boolean;
      arrowStyle: CSSProperties;
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
      $slots,
      $props,
      $listeners,
      arrowStyle,
      anchorPos,
      contentStyle,
      contentClass,
    } = this;
    const cls = this.$rootCls();
    const transformOrigin = getTransformOrigin(anchorPos, this.transformOrigin);
    const isTop =
      anchorPos.vertical === 'top' && transformOrigin.vertical === 'bottom';
    const isBottom =
      anchorPos.vertical === 'bottom' && transformOrigin.vertical === 'top';
    const isLeft =
      anchorPos.horizontal === 'left' && transformOrigin.horizontal === 'right';
    const isRight =
      anchorPos.horizontal === 'right' && transformOrigin.horizontal === 'left';
    const popCls = cls.addClasses({
      'is-top': isTop,
      'is-bottom': isBottom,
      'is-center-left': isLeft,
      'is-center-right': isRight,
    });
    const anchorProps: VNodeData = {
      ref: 'anchor',
      on: {
        click: () => {
          this.popupVisible = true;
        },
      },
    };
    const anchor = $slots.anchor && cloneElement($slots.anchor[0], anchorProps);
    const popupData = {
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
          const style: CSSProperties = {};
          if (anchor) {
            anchorCentralXAxis = anchor.width / 2 + anchor.left;
            anchorCentralYAxis = anchor.height / 2 + anchor.top;
          }
          if (doc) {
            if (isLeft || isRight) {
              let arrowY = anchorCentralYAxis - doc.top;
              if (arrowY < this.minArrowMargin) {
                arrowY += this.minArrowMargin;
              }
              style.top = arrowY + 'px';
              style[this.anchorPos.horizontal === 'left' ? 'right' : 'left'] =
                '1px';
            } else {
              let arrowX = anchorCentralXAxis - doc.left;
              if (arrowX < this.minArrowMargin) {
                arrowX += this.minArrowMargin;
              }
              style.left = arrowX + 'px';
              style[this.anchorPos.vertical === 'top' ? 'bottom' : 'top'] =
                '1px';
            }
            this.arrowStyle = style;
          }
          this.$emit('enter', { anchor, doc });
        },
      },
    };
    let content: VNode[] | undefined;
    if ($slots.default) {
      const items = getVNodesByName($slots.default, basePopoverItemName);
      if (items.length > 0) {
        content = items.map((item, index) => {
          return cloneElement(item, {
            on: {
              click: () => {
                const event: PopoverSelectEvent = {
                  key: item.key as string | number,
                  index,
                };
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
    const contentCls = cls.element('content');
    if (contentClass) {
      contentCls.push(contentClass);
    }
    return (
      <div>
        {anchor}
        <Popup {...popupData}>
          <div class={popCls}>
            {!this.noArrow && (
              <div class={cls.element('arrow')} style={arrowStyle}></div>
            )}
            {content && (
              <div class={contentCls} style={contentStyle}>
                {content}
              </div>
            )}
          </div>
        </Popup>
      </div>
    );
  },
});
