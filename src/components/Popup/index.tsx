import PopupWrapper from './PopupWrapper';
import Vue, { VNodeData } from 'vue';
import { CombinedVueInstance } from 'vue/types/vue';
import { PopupOpenOptions } from './types';

let instance: CombinedVueInstance<{ visible: boolean } & Vue, object, object, object, Record<keyof object, any>>;

const Popup = Object.assign(PopupWrapper, {
  open: (props: PopupOpenOptions) => {
    const {
      parent,
      render,
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
        const popupData: VNodeData = {
          props: {
            ...popupProps,
            visible: this.visible,
            dynamic: true,
          },
          on: {
            afterClose: () => {
              this.$destroy();
            },
          },
        };
        return <Popup {...popupData}>{render && render(h)}</Popup>
      },
    });
  },
  close: () => {
    if (instance) {
      instance.visible = false;
    }
  }
});


export default Popup;

export * from './types';
