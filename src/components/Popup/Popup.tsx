import { componentFactoryOf } from 'vue-tsx-support';
import props from 'vue-strict-prop';
import { prefix } from '../_utils/shared';
import './styles/index.scss';

export interface PopupEvents {
  onVisibleChange: boolean;
}

export const PopupProps = {
  visible: Boolean,
  lockScroll: props(Boolean).default(true),
  position: props.ofStringLiterals(
    'top',
    'bottom',
    'right',
    'left',
    'center',
  ).default('center'),
  mask: props(Boolean).default(true),
  maskFrosted: props(Boolean).default(false),
  maskClosable: props(Boolean).default(true),
  fullscreen: props(Boolean).default(false),
  animate: props.ofStringLiterals(
    'none',
    'fade',
    'zoom',
    'slide-up',
    'slide-down',
    'slide-left',
    'slide-right'
  ).default('none'),
  targetStyle: Object,
}

const positionTransitionMap = {
  top: 'slide-up',
  bottom: 'slide-down',
  left: 'slide-left',
  right: 'slide-right',
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
    };
  },
  watch: {
    visible(newValue) {
      this.documentVisible = newValue;
    },
  },
  mounted() {
    this.documentVisible = this.visible;
  },
  methods: {
    // open api
    close() {
      if (this.documentVisible) {
        this.documentVisible = false;
        this.$emit(POPUP_EVENT, this.documentVisible);
      }
    },
    // open api
    onMaskClick(e: Event) {
      e.stopPropagation();
      if (this.maskClosable) {
        this.close();
      }
    },
    onDocumentLeave() {
      this.wrapperVisible = false;
    },
    onDocumentEnter() {
      this.wrapperVisible = true;
    },
    onDocumentClick(e: Event) {
      e.stopPropagation();
    },
    renderMask() {
      const maskCls = {
        [baseMaskName]: true,
        'is-frosted': this.maskFrosted
      };
      if (this.mask) {
        return (
          <transition name={prefix + 'mask-fade'}>
            <div v-show={this.documentVisible} class={maskCls}></div>
          </transition>
        );
      }
    },
    getDocumentTransition() {
      if (this.animate === 'none' && this.position !== 'center') {
        return positionTransitionMap[this.position];
      }
      return this.animate;
    },
    renderDocument() {
      let docStyle: Partial<CSSStyleDeclaration> = {};
      if (this.targetStyle) {
        docStyle = {
          ...this.targetStyle,
        };
      }
      const wrapperCls = {
        [popupWrapperCls]: true,
        'is-center': this.position === 'center',
      };
      const cls = {
        [basePopupName]: true,
        'is-fullscreen': this.fullscreen,
        [`is-${this.position}`]: true,
      };
      return (
        <div v-show={this.wrapperVisible}
          class={wrapperCls}
          role="dialog"
          onClick={this.onMaskClick}
          tabindex={-1}>
          <transition
            name={this.getDocumentTransition()}
            onBeforeEnter={this.onDocumentEnter}
            onAfterLeave={this.onDocumentLeave}>
            <div v-show={this.documentVisible}
              role="document"
              class={cls}
              style={docStyle}
              onClick={this.onDocumentClick}>
              { this.$slots.default }
            </div>
          </transition>
        </div>
      );
    }
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
