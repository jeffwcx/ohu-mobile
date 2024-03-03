import PortalRender from '../_utils/PortalRender';
import Popup, { popupProps, POPUP_EVENT } from './Popup';
import { VNodeData } from 'vue';
import {
  PopupOutSideEvents,
  PopupOutSideProps,
  PopupGetContainerFunc,
} from './types';
import { defineComponent, props } from '../_utils/defineComponent';

export const popupOutSideProps = {
  getContainer: props
    .ofType<PopupGetContainerFunc>()
    .default(() => document.body),
  dynamic: props(Boolean).default(false),
  usePortal: props(Boolean).default(true),
  ...popupProps,
};

const createPopupWrapper = defineComponent<
  PopupOutSideProps,
  PopupOutSideEvents
>('popup');

const PopupWrapper = createPopupWrapper.create({
  model: {
    prop: 'visible',
    event: POPUP_EVENT,
  },
  props: popupOutSideProps,
  data() {
    return {
      internalVisible: this.visible,
    };
  },
  watch: {
    visible(visible: boolean) {
      this.internalVisible = visible;
    },
  },
  methods: {
    close() {
      this.internalVisible = false;
      // (this.$refs.popup as any)?.close();
    },
    open() {
      this.internalVisible = true;
      // (this.$refs.popup as any)?.open();
    },
  },
  render() {
    const {
      $props,
      $listeners,
      $attrs,
      $slots,
      internalVisible,
      getContainer,
      dynamic,
    } = this;
    const popupNodeData = {
      props: {
        ...$props,
        visible: internalVisible,
      },
      on: {
        ...$listeners,
        visibleChange: (visible: boolean) => {
          this.internalVisible = visible;
          this.$emit(POPUP_EVENT, visible);
        },
        afterLeave: () => {
          if (dynamic && this.$refs.portal) {
            (this.$refs.portal as any).remove();
          }
          this.$emit('afterClose');
        },
      },
      attrs: $attrs,
    };
    if (!this.usePortal)
      return <Popup {...popupNodeData}>{$slots.default}</Popup>;
    const container =
      getContainer instanceof Function ? getContainer() : getContainer;
    return (
      <PortalRender
        ref="portal"
        visible={internalVisible}
        container={container}
        children={() => <Popup {...popupNodeData}>{$slots.default}</Popup>}
      ></PortalRender>
    );
  },
});

export default PopupWrapper;
