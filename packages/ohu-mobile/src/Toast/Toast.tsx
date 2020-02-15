import Popup, { PopupProps } from '../Popup';
import deepmerge from 'deepmerge';
import { popupOutSideProps } from '../Popup/PopupWrapper';
import { IconProps } from '../Icon';
import { VNodeData } from 'vue';
import { getIcon } from '../_utils/icon-utils';
import { IconDef } from '../types';
import { defineComponent, props } from '../_utils/defineComponent';

const toastProps = deepmerge({
  icon: props<string, IconDef, IconProps>(String, Object).optional,
  duration: props(Number).default(3000),
  content: String,
  loading: props(Boolean).default(false),
  vertical: props(Boolean).default(false),
}, popupOutSideProps);

toastProps.mask.default = false;
toastProps.maskClosable.default = false;
toastProps.animate.default = 'fade';
toastProps.tapThrough.default = true;
toastProps.lockScroll.default = false;


export default defineComponent('toast').create({
  props: toastProps,
  mounted() {
    if (!this.loading || (this.loading && this.duration > 0)) {
      this.fire();
    }
  },
  methods: {
    fire() {
      let timer: NodeJS.Timeout | null = null;
      if (this.visible) {
        timer = setTimeout(() => {
          this.close();
        }, this.duration);
      }
      this.$once('hook:beforeDestroy', () => {
        if (timer) clearTimeout(timer);
      });
    },
    close() {
      if (this.visible) {
        (this.$refs.popup as any).close();
      }
    },
  },
  render() {
    const root = this.root();
    const {
      icon,
      duration,
      content,
      vertical,
      ...popupProps
    } = this.$props;

    if (popupProps.targetClass) {
      root.addClasses(popupProps.targetClass);
    }
    if (vertical) {
      root.is('vertical');
    }
    const popupNodeData: VNodeData = {
      props: {
        ...popupProps,
        targetClass: root,
      } as PopupProps,
      on: this.$listeners,
      ref: 'popup',
    };
    let iconNode;
    if (this.icon) {
      iconNode = getIcon(this.$createElement, this.icon);
    }
    return (
      <Popup {...popupNodeData}>
        {
          iconNode &&
          <div class={root.element('icon')}>{iconNode}</div>
        }
        {
          content &&
          <div class={root.element('text')}>{content}</div>
        }
      </Popup>
    );
  },
});
