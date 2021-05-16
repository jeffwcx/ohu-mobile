import { getScrollEventTarget } from '../_utils/dom';
import manager from './manager';
import debounce from '../_utils/debounce';
import { PopupTransformOrigin, PopupPosition,
  PopupAnimateType, PopupEvents,
  PopupAnchorPosition, PopupEnterEvent, PopupProps,
} from './types';
import { isAnyPosition, computeRect, getAnchorPosition, getTransformOrigin } from './utils';
import { $prefix } from '../_config/variables';
import { defineComponent, props } from '../_utils/defineComponent';
import { ClassOptions } from '../_utils/classHelper';
import { CSSProps } from '../types';
import bindEvent from '../_utils/bindEvent';


interface PopupData {
  wrapperVisible: boolean;
  documentVisible: boolean;
  docEl: HTMLElement | null;
  docRect: { width: number, height: number } | null;
  anchorEl: HTMLElement | null;
  docPos: {
    top: number,
    bottom: number,
    left: number,
    right: number,
    transformOrigin: string,
  } | null;
  anchorRect: DOMRect | ClientRect | null;
  maskZIndex: number;
  documentZIndex: number;
  touchData: {
    scrollY: number,
    pageY: number,
    scrollEl: HTMLElement | null,
    maxHeight: number,
  };
  rootStyle: CSSProps;
}

export const popupProps = {
  visible: Boolean,
  anchor: props.ofType<HTMLElement | (() => HTMLElement)>().optional,
  transformOrigin: props.ofType<PopupTransformOrigin>().optional,
  marginThreshold: props(Number).default(12),
  edgeDetect: props(Boolean).default(true),
  lockScroll: props(Boolean).default(true),
  position: props.ofType<PopupPosition>().default('center'),
  mask: props(Boolean).default(true),
  maskFrosted: props(Boolean).default(false),
  maskClosable: props(Boolean).default(true),
  maskAnimate: props.ofStringLiterals('mask-fade', 'none').default('mask-fade'),
  partialMask: props.ofStringLiterals('top', 'bottom').optional,
  closeOnMaskTouched: props(Boolean).default(false),
  fullscreen: props(Boolean).default(false),
  animate: props.ofType<PopupAnimateType>().default('none'),
  targetStyle: props.ofType<CSSProps>().optional,
  targetClass: props.ofType<ClassOptions>().optional,
  scrollBody: props(Boolean).default(false),
  tapThrough: props(Boolean).default(false),
  zIndex: Number,
  round: props(Boolean).default(false),
  hideOnDeactivated: props(Boolean).default(true),
}

const positionTransitionMap = {
  top: `${$prefix}slide-up`,
  bottom: `${$prefix}slide-down`,
  left: `${$prefix}slide-left`,
  right: `${$prefix}slide-right`,
};

const createPopup = defineComponent<PopupProps, PopupEvents>('popup-main');

export const POPUP_EVENT = 'visibleChange';
const Popup = createPopup.create({
  model: {
    prop: 'visible',
    event: POPUP_EVENT,
  },
  props: popupProps,
  data() {
    return {
      wrapperVisible: this.visible,
      documentVisible: false,
      docRect: null,
      docEl: null,
      docPos: null,
      anchorEl: null,
      anchorRect: null,
      maskZIndex: 0,
      documentZIndex: 0,
      touchData: {
        scrollY: 0,
        pageY: 0,
        scrollEl: null,
        maxHeight: 0,
      },
      rootStyle: {},
    } as PopupData;
  },
  watch: {
    visible(newValue) {
      newValue ? this.open() : this.close();
    },
  },
  computed: {
    isAnchorMode() {
      return !!this.anchor;
    },
    documentClass() {
      return this.bem.block('popup')
        .is([
          this.fullscreen && 'fullscreen',
          this.round && 'round',
        ])
        .addClasses(this.targetClass);
    },
    documentTransition() {
      if (this.animate === 'none'
        && typeof this.position === 'string'
        && this.position !== 'center') {
        return positionTransitionMap[this.position];
      }
      return `${$prefix}${this.animate}`;
    },
  },
  created() {
    this.$on('hook:activated', () => {
      this.rootStyle = {};
      if (this.hideOnDeactivated && manager.isLock > 0) {
        document.body.style.overflow = 'hidden';
      }
    });
    this.$on('hook:deactivated', () => {
      if (this.hideOnDeactivated) {
        this.rootStyle = { display: 'none' };
        if (manager.isLock > 0) {
          document.body.style.overflow = '';
        }
      }
    });
    const resizeHandler = debounce(() => {
      if (this.documentVisible) {
        this.computeDocAndAnchorRect();
      }
    });
    this.$on('hook:mounted', () => {
      this.visible ? this.open() : this.close();
      bindEvent(this, 'resize', resizeHandler);
      bindEvent(this, 'scroll', resizeHandler);
    });
    this.$on('hook:beforeDestroy', () => {
      if (this.documentVisible) {
        this.close();
      }
    });
  },
  methods: {
    // ⬇️ open api
    close() {
      if (this.documentVisible) {
        this.documentVisible = false;
        this.$emit(POPUP_EVENT, this.documentVisible);
        this.$emit('close', this.documentVisible);
        this.startScroll();
      }
    },
    open() {
      if (this.documentVisible) return;
      let maskZIndex;
      let documentZIndex;
      if (this.zIndex !== undefined) {
        maskZIndex = this.zIndex;
        documentZIndex = this.zIndex + 1;
      } else {
        const result = manager.getPopupZIndex();
        maskZIndex = result.maskZIndex;
        documentZIndex = result.documentZIndex;
      }
      this.maskZIndex = maskZIndex;
      this.documentZIndex = documentZIndex;
      this.documentVisible = true;
      this.stopScroll();
      this.$emit('open', {
        visible: this.documentVisible,
        documentZIndex: this.documentZIndex,
        maskZIndex: this.maskZIndex,
      });
    },
    // ⬆️ open api
    stopScroll() {
      if (this.lockScroll) {
        manager.isLock += 1;
        document.body.style.overflow = 'hidden';
      }
    },
    startScroll() {
      if (manager.isLock === 0) return;
      if (this.lockScroll) {
        manager.isLock -= 1;
        if (manager.isLock <= 0) {
          document.body.style.overflow = '';
        }
      }
    },
    onMaskClick(e: Event) {
      e.stopPropagation();
      if (this.maskClosable) {
        this.close();
      }
    },
    onWrapperTouchstart(e: TouchEvent) {
      if (this.closeOnMaskTouched) {
        this.close();
        return;
      }
      const event = e.touches[0];
      const el = e.target as HTMLElement;
      const rootEl = this.$refs.document as HTMLElement;
      if (rootEl) {
        const scrollEl = getScrollEventTarget(el, rootEl) as HTMLElement;
        this.touchData.scrollEl = scrollEl;
        this.touchData.pageY = event.pageY;
        this.touchData.scrollY = scrollEl.scrollTop;
        this.touchData.maxHeight = scrollEl.scrollHeight - scrollEl.clientHeight;
      }
    },
    onWrapperTouchmove(e: TouchEvent) {
      if (this.scrollBody) return;
      const scrollEl = this.touchData.scrollEl;
      const event = e.touches[0];
      if (scrollEl) {
        const { pageY, maxHeight } = this.touchData;
        const scrollTop = scrollEl.scrollTop;
        const distanceY = event.pageY - pageY;
        if (distanceY > 0 && scrollTop <= 0) {
          e.cancelable && e.preventDefault();
          return;
        }
        if (distanceY < 0 && scrollTop + 1 >= maxHeight) {
          e.cancelable && e.preventDefault();
          return;
        }
      }
    },
    onWrapperTouchend() {
      this.touchData.maxHeight = 0;
      this.touchData.pageY = 0;
      this.touchData.scrollEl = null;
      this.touchData.scrollY = 0;
    },
    onAfterDocumentLeave() {
      this.wrapperVisible = false;
      this.$emit('afterLeave', this.wrapperVisible);
    },
    onBeforeDocumentEnter() {
      this.wrapperVisible = true;
    },
    onDocumentClick(e: Event) {
      e.stopPropagation();
    },
    onDocumentTouch(e: TouchEvent) {
      if (this.closeOnMaskTouched) {
        e.stopPropagation();
      }
    },
    onDocumentEnter(doc: Element) {
      this.docEl = doc as HTMLElement;
      this.$nextTick(() => {
        this.computeDocAndAnchorRect();
        const enterEvent: PopupEnterEvent = {};
        if (this.docRect) {
          enterEvent.doc = Object.assign({}, this.docPos, this.docRect);
        }
        if (this.anchorRect) {
          enterEvent.anchor = this.anchorRect;
        }
        this.$emit('enter', enterEvent);
      });
    },
    onDocumentAfterEnter() {
      this.$emit('afterOpen');
    },
    computeDocAndAnchorRect() {
      if (this.docEl) {
        // use offsetWidth and offsetHeight, when getBoudingClientRect is not correct.
        this.docRect = computeRect(this.docEl);
      }
      if (this.anchor) {
        if (this.anchor instanceof Function) {
          this.anchorEl = this.anchor();
        } else {
          this.anchorEl = this.anchor;
        }
        if (this.anchorEl) {
          this.anchorRect = this.anchorEl.getBoundingClientRect();
        }
      }
      this.docPos = this.computeDocumentPosition();
    },
    renderMask() {
      const maskCls = this.bem.block('mask')
        .is(this.maskFrosted && 'frosted');
      const maskStyle: Partial<CSSStyleDeclaration> = {
        zIndex: this.maskZIndex.toString(),
        top: '0px',
        left: '0px',
      };
      if (this.docPos) {
        if (this.partialMask === 'bottom') {
          maskStyle.height = 'auto';
          maskStyle.top = `${this.docPos.top}px`;
          maskStyle.bottom = '0';
        } else if (this.partialMask === 'top') {
          maskStyle.height = 'auto';
          maskStyle.bottom = `${this.docPos.bottom}px`;
          maskStyle.top = '0';
        }
      }
      let maskNode = <div v-show={this.documentVisible} class={maskCls} style={maskStyle}></div>;
      if (this.maskAnimate !== 'none') {
        maskNode = (
          <transition name={$prefix + this.maskAnimate}>
            {maskNode}
          </transition>
        );
      }
      if (this.mask) {
        return maskNode;
      }
    },
    computeDocumentPosition() {
      const { position, isAnchorMode } = this;
      let top = 0;
      let left = 0;
      let transformOriginStr = '';
      if (isAnchorMode) {
        const { anchorRect, docRect } = this;
        if (anchorRect) {
          // transform anchor position
          let anchorPos: PopupAnchorPosition = getAnchorPosition(position);
          let anchorTop = anchorRect.top;
          let anchorLeft = anchorRect.left;
          if (anchorPos.horizontal === 'center') {
            anchorLeft = anchorLeft + anchorRect.width / 2;
          } else if (anchorPos.horizontal === 'right') {
            anchorLeft = anchorLeft + anchorRect.width;
          }
          if (anchorPos.vertical === 'center') {
            anchorTop = anchorTop + anchorRect.height / 2;
          } else if (anchorPos.vertical === 'bottom') {
            anchorTop = anchorTop + anchorRect.height;
          }
          const transformOrigin = getTransformOrigin(anchorPos, this.transformOrigin);
          transformOriginStr = (transformOrigin.vertical || 'top') + ' ' + (transformOrigin.horizontal || 'left');
          let docOffsetX = 0;
          let docOffsetY = 0
          if (docRect) {
            if (transformOrigin.horizontal === 'right') {
              docOffsetX = docRect.width;
            } else if (transformOrigin.horizontal === 'center') {
              docOffsetX = docRect.width / 2;
            }
            if (transformOrigin.vertical === 'bottom') {
              docOffsetY = docRect.height;
            } else if (transformOrigin.vertical === 'center') {
              docOffsetY = docRect.height / 2;
            }
          }
          top = anchorTop - docOffsetY;
          left = anchorLeft - docOffsetX;
        }
      } else if(isAnyPosition(position)) {
        position.left !== undefined && (left = position.left);
        position.top !== undefined && (top = position.top);
      }
      let lowerEdge = window.innerHeight - top;
      let rightEdge = window.innerWidth - left;
      if (this.docRect) {
        lowerEdge = lowerEdge - this.docRect.height;
        rightEdge = rightEdge - this.docRect.width;
      }

      // container edge detect
      if (this.edgeDetect) {
        const widthThreshold = window.innerWidth - this.marginThreshold;
        const heightThreshold = window.innerHeight - this.marginThreshold;
        if (this.docRect) {
          let bottom = top + this.docRect.height;
          let right = left + this.docRect.width;
          if (top < this.marginThreshold) {
            top = this.marginThreshold;
          } else if (bottom > heightThreshold) {
            top = heightThreshold - this.docRect.height;
          }
          if (left < this.marginThreshold) {
            left = this.marginThreshold;
          } else if (right > widthThreshold) {
            left = widthThreshold - this.docRect.width;
          }
        }
      }
      return {
        top,
        left,
        bottom: lowerEdge,
        right: rightEdge,
        transformOrigin: transformOriginStr,
      };
    },
    getDocumentStyle() {
      let docStyle: Partial<CSSStyleDeclaration> = {};
      if (this.isAnchorMode) {
        docStyle = {
          position: 'absolute',
        };
        if (this.docPos) {
          docStyle.top = `${this.docPos.top}px`;
          docStyle.left = `${this.docPos.left}px`;
          docStyle.transformOrigin = this.docPos.transformOrigin;
        }
      }
      if (this.targetStyle) {
        docStyle = {
          ...docStyle,
          ...this.targetStyle,
        };
      }
      return docStyle;
    },

    renderDocument() {
      const wrapperCls = this.bem.block('popup-wrapper');
      wrapperCls.is([
        this.tapThrough && 'tap-through',
        this.scrollBody && 'scrollable',
      ]);
      if (!this.isAnchorMode) {
        const { horizontal, vertical } = getAnchorPosition(this.position);
        if (horizontal || vertical) {
          wrapperCls.has('position');
        }
        if (horizontal) {
          wrapperCls.is(`x-${horizontal}`);
        }
        if (vertical && !this.scrollBody) {
          wrapperCls.is(`y-${vertical}`);
        }
      }
      const wrapperStyle = {
        zIndex: this.documentZIndex,
      };
      return (
        <div v-show={this.wrapperVisible}
          class={wrapperCls}
          style={wrapperStyle}
          role="dialog"
          onClick={this.onMaskClick}
          onTouchstart={this.onWrapperTouchstart}
          onTouchmove={this.onWrapperTouchmove}
          onTouchend={this.onWrapperTouchend}
          tabindex={-1}>
          <transition
            name={this.documentTransition}
            onBeforeEnter={this.onBeforeDocumentEnter}
            onEnter={this.onDocumentEnter}
            onAfterEnter={this.onDocumentAfterEnter}
            onAfterLeave={this.onAfterDocumentLeave}>
            <div v-show={this.documentVisible}
              role="document"
              ref="document"
              class={this.documentClass}
              style={this.getDocumentStyle()}
              onTouchstart={this.onDocumentTouch}
              onTouchmove={this.onDocumentTouch}
              onTouchend={this.onDocumentTouch}
              onClick={this.onDocumentClick}>
              { this.$slots.default }
            </div>
          </transition>
        </div>
      );
    },
  },
  render() {
    return (
      <div role="presentation" style={this.rootStyle}>
        { this.renderMask() }
        { this.renderDocument() }
      </div>
    );
  }
});

export default Popup;
