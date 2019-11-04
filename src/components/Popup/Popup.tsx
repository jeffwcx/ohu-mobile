import { componentFactoryOf } from 'vue-tsx-support';
import props from 'vue-strict-prop';
import { prefix } from '../_utils/shared';
import { getScrollEventTarget } from '../_utils/dom';
import './styles/index.scss';
import manager from './manager';

export interface PopupEvents {
  onVisibleChange: boolean;
  onAfterLeave: boolean;
}

type VerticalPosition = 'top' | 'bottom' | 'center';
type HorizontalPosition = 'left' | 'right' | 'center';
export type Position = AnyPosition | AnchorPosition | VerticalPosition | HorizontalPosition;
interface AnyPosition {
  top?: number;
  left?: number;
};

interface AnchorPosition {
  vertical?: VerticalPosition;
  horizontal?: HorizontalPosition;
}

export interface TransformOrigin {
  vertical?: VerticalPosition;
  horizontal?: HorizontalPosition;
}

function isAnyPosition(position: Position): position is AnyPosition {
  return (position as AnyPosition).left !== undefined
    || (position as AnyPosition).top !== undefined;
}

function isAnchorPosition(position: Position): position is AnchorPosition {
  return (position as AnchorPosition).horizontal !== undefined
    || (position as AnchorPosition).vertical !== undefined;
}


export const PopupProps = {
  visible: Boolean,
  anchor: props.ofType<HTMLElement>().optional,
  transformOrigin: props.ofType<TransformOrigin>().optional,
  marginThreshold: props(Number).default(12),
  edgeDetect: props(Boolean).default(true),
  lockScroll: props(Boolean).default(true),
  position: props.ofType<Position>().default('center'),
  mask: props(Boolean).default(true),
  maskFrosted: props(Boolean).default(false),
  maskClosable: props(Boolean).default(true),
  fullscreen: props(Boolean).default(false),
  animate: props.ofStringLiterals(
    'none',
    'fade',
    'zoom',
    'zoom-big',
    'slide-up',
    'slide-down',
    'slide-left',
    'slide-right'
  ).default('none'),
  targetStyle: props.ofType<Partial<CSSStyleDeclaration>>().optional,
}

const positionTransitionMap = {
  top: 'slide-up',
  bottom: 'slide-down',
  left: 'slide-left',
  right: 'slide-right',
};

const positionReverseMap = {
  top: 'bottom',
  bottom: 'top',
  left: 'right',
  right: 'left',
  center: 'center',
};

const basePopupName = `${prefix}popup`;
const baseMaskName = `${prefix}mask`;
const popupWrapperCls = `${basePopupName}-wrapper`;
export const POPUP_EVENT = 'visibleChange';
const Popup = componentFactoryOf<PopupEvents>().create({
  name: basePopupName + '-main',
  model: {
    prop: 'visible',
    event: POPUP_EVENT,
  },
  props: PopupProps,
  data() {
    return {
      wrapperVisible: this.visible,
      documentVisible: false,
      docRect: null,
      maskZIndex: 0,
      documentZIndex: 0,
      touchData: {
        scrollY: 0,
        pageY: 0,
        scrollEl: null,
        maxHeight: 0,
      },
    } as {
      wrapperVisible: boolean,
      documentVisible: boolean,
      docRect: ClientRect | DOMRect | null,
      maskZIndex: number,
      documentZIndex: number,
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
  },
  beforeDestroy() {
    if (this.documentVisible) {
      this.close();
    }
  },
  methods: {
    // ⬇️ open api
    close() {
      if (this.documentVisible) {
        this.documentVisible = false;
        this.$emit(POPUP_EVENT, this.documentVisible);
        this.startScroll();
      }
    },
    open() {
      const { maskZIndex, documentZIndex } = manager.getPopupZIndex();
      this.maskZIndex = maskZIndex;
      this.documentZIndex = documentZIndex;
      this.documentVisible = true;
      this.stopScroll();
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
    onWrapperTouchstart(e: TouchEvent) {
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
    onDocumentEnter(doc: Element) {
      this.$nextTick(() => {
        const rect =  doc.getBoundingClientRect();
        this.docRect = {
          width: rect.width / 0.75,
          height: rect.height / 0.5623,
          top: rect.top,
          left: rect.left,
          bottom: rect.bottom,
          right: rect.right,
        };
      });
    },
    renderMask() {
      const maskCls = {
        [baseMaskName]: true,
        'is-frosted': this.maskFrosted
      };
      const maskStyle = {
        zIndex: this.maskZIndex,
      };
      if (this.mask) {
        return (
          <transition name={prefix + 'mask-fade'}>
            <div v-show={this.documentVisible} class={maskCls} style={maskStyle}></div>
          </transition>
        );
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
      const { position } = this;
      let top = 0;
      let left = 0;
      let transformOriginStr = '';
      if (this.isAnchorMode) {
        const { anchor, docRect } = this;
        if (anchor) {
          const anchorRect = anchor.getBoundingClientRect();
          // transform anchor position
          let anchorPos: AnchorPosition = {};
          if (typeof position === 'string') {
            if (position === 'top' || position === 'bottom') {
              anchorPos.vertical = position;
              anchorPos.horizontal = 'center';
            } else {
              anchorPos.horizontal = position;
              anchorPos.vertical = 'center';
            }
          } else if (isAnchorPosition(position)) {
            anchorPos = position;
          }

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

          let transformOrigin: TransformOrigin = this.transformOrigin || {};
          // preset transform origin
          if (anchorPos.horizontal !== undefined) {
            transformOrigin.horizontal = positionReverseMap[anchorPos.horizontal] as HorizontalPosition;
          }
          if (anchorPos.vertical !== undefined) {
            transformOrigin.vertical = positionReverseMap[anchorPos.vertical] as VerticalPosition;
          }
          transformOriginStr = transformOrigin.vertical || 'top' + ' ' + transformOrigin.horizontal || 'left';
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
          top = (anchorTop - docOffsetY);
          left = (anchorLeft - docOffsetX);
        }
      } else if(isAnyPosition(position)) {
        position.left !== undefined && (left = position.left);
        position.top !== undefined && (top = position.top);
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
            top = heightThreshold;
          }
          if (left < this.marginThreshold) {
            left = this.marginThreshold;
          } else if (right > widthThreshold) {
            left = widthThreshold - this.docRect.width;
          }
        }
      }
      return {
        top: `${top}px`,
        left: `${left}px`,
        transformOrigin: transformOriginStr,
      };
    },
    getDocumentStyle() {
      let docStyle: Partial<CSSStyleDeclaration> = {};
      if (this.isAnchorMode) {
        docStyle = {
          position: 'absolute',
          ...this.computeDocumentPosition(),
        };
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
      if (typeof this.position === 'string' && !this.isAnchorMode) {
        cls['is-' + this.position] = true;
        cls['is-fullscreen'] = this.fullscreen;
      }
      return cls;
    },
    renderDocument() {
      const wrapperCls = {
        [popupWrapperCls]: true,
        'is-center': this.position === 'center',
      };
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
            appear
            name={this.getDocumentTransition()}
            onBeforeEnter={this.onBeforeDocumentEnter}
            onEnter={this.onDocumentEnter}
            onAfterLeave={this.onAfterDocumentLeave}>
            <div v-show={this.documentVisible}
              role="document"
              ref="document"
              class={this.getDocumentClass()}
              style={this.getDocumentStyle()}
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
