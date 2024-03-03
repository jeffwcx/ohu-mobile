import PopupWrapper from './PopupWrapper';
import Vue from 'vue';
import { VueConstructor } from 'vue/types/vue';
import { PopupOpenOptions } from './types';
import PopupHeader from './PopupHeader';
import manager from './manager';
import noop from '../_utils/noop';

let instance: InstanceType<VueConstructor> & { visible: boolean };
const Popup = Object.assign(PopupWrapper, {
  Header: PopupHeader,
  open: (props: PopupOpenOptions) => {
    const {
      parent,
      render,
      onEnter,
      onOpen,
      onAfterClose,
      onVisibleChange,
      onClose,
      ...popupProps
    } = props;
    instance = new Vue({
      parent: parent || undefined,
      el: document.createElement('div'),
      data() {
        return {
          visible: true,
        };
      },
      render(h) {
        const popupData = {
          props: {
            ...popupProps,
            visible: this.visible,
            dynamic: true,
            usePortal: true,
          },
          on: {
            enter: onEnter || noop,
            open: onOpen || noop,
            visibleChange: onVisibleChange || noop,
            close: onClose || noop,
            afterClose: (e: any) => {
              if (onAfterClose) onAfterClose(e);
              this.$destroy();
            },
          },
        };
        return <Popup {...popupData}>{render && render(h)}</Popup>;
      },
    });
  },
  close: () => {
    if (instance) {
      instance.visible = false;
    }
  },
});

export default Popup;

export * from './types';

export { PopupHeader, manager };
