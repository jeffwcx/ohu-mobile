import { componentFactoryOf } from 'vue-tsx-support';
import props from 'vue-strict-prop';
import { getScrollEventTarget } from '../_utils/dom';
import manager from './manager';
import debounce from '../_utils/debounce';
import { PopupTransformOrigin, PopupPosition,
  PopupAnimateType, PopupEvents,
  PopupAnchorPosition, PopupEnterEvent,
} from './types';
import { isAnyPosition, computeRect, getAnchorPosition, getTransformOrigin } from './utils';
import { addTargetClass } from '../_utils/targetClass';
import { $prefix } from '../_config/variables';


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
  targetStyle: props.ofType<Partial<CSSStyleDeclaration>>().optional,
  targetClass: props<string, Record<string, boolean>, Array<string>>(String, Object, Array).optional,
  scrollBody: props(Boolean).default(false),
  tapThrough: props(Boolean).default(false),
  zIndex: Number,
  round: props(Boolean).default(false),
}

const positionTransitionMap = {
  top: 'slide-up',
  bottom: 'slide-down',
  left: 'slide-left',
  right: 'slide-right',
};

const basePopupName = `${$prefix}popup`;
const baseMaskName = `${$prefix}mask`;
const popupWrapperCls = `${basePopupName}-wrapper`;
export const POPUP_EVENT = 'visibleChange';
const Popup = componentFactoryOf<PopupEvents>().create({
  name: basePopupName + '-main',
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
      resizeHandler: null,
    } as {
      wrapperVisible: boolean,
      documentVisible: boolean,
      docEl: HTMLElement | null,
      docRect: { width: number, height: number } | null,
      anchorEl: HTMLElement | null,
      docPos: {
        top: number,
        bottom: number,
        left: number,
        right: number,
        transformOrigin: string,
      } | null,
      anchorRect: DOMRect | ClientRect | null,
      maskZIndex: number,
      documentZIndex: number,
      resizeHandler: ((this: Window, ev: any) => any) | null,
      touchData: {
        scrollY: number,
        pageY: number,
        scrollEl: HTMLElement | null,
        maxHeight: number,
      },
    };
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
  },
  mounted() {
    this.visible ? this.open() : this.close();
    const resizeHandler = debounce(() => {
      if (this.documentVisible) {
        this.computeDocAndAnchorRect();
      }
    });
    if (resizeHandler) {
      this.resizeHandler = resizeHandler;
      window.addEventListener('resize', resizeHandler);
      window.addEventListener('scroll', resizeHandler);
    }
  },
  beforeDestroy() {
    if (this.documentVisible) {
      this.close();
    }
    if (this.resizeHandler) {
      window.removeEventListener('resize', this.resizeHandler);
      window.removeEventListener('scroll', this.resizeHandler);
      this.resizeHandler = null;
    }
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
      const maskCls = {
        [baseMaskName]: true,
        'is-frosted': this.maskFrosted
      };
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
    getDocumentTransition() {
      if (this.animate === 'none'
        && typeof this.position === 'string'
        && this.position !== 'center') {
        return positionTransitionMap[this.position];
      }
      return this.animate;
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
    getDocumentClass() {
      const cls = { [basePopupName]: true };
      cls['is-fullscreen'] = this.fullscreen;
      cls['is-round'] = this.round;
      if (this.targetClass) {
        addTargetClass(cls, this.targetClass);
      }
      return cls;
    },
    renderDocument() {
      const wrapperCls: { [key: string]: boolean } = {
        [popupWrapperCls]: true,
        'is-tap-through': this.tapThrough,
      };
      if (this.scrollBody) {
        wrapperCls['is-scrollable'] = true;
      }
      if (!this.isAnchorMode) {
        const { horizontal, vertical } = getAnchorPosition(this.position);
        if (horizontal || vertical) {
          wrapperCls['has-position'] = true;
        }
        if (horizontal) {
          wrapperCls[`is-x-${horizontal}`] = true;
        }
        if (vertical && !this.scrollBody) {
          wrapperCls[`is-y-${vertical}`] = true;
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
            name={this.getDocumentTransition()}
            onBeforeEnter={this.onBeforeDocumentEnter}
            onEnter={this.onDocumentEnter}
            onAfterLeave={this.onAfterDocumentLeave}>
            <div v-show={this.documentVisible}
              role="document"
              ref="document"
              class={this.getDocumentClass()}
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
      <div role="presentation">
        { this.renderMask() }
        { this.renderDocument() }
      </div>
    );
  }
});

export default Popup;
