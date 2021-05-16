import PortalRender from '../_utils/PortalRender';
import Popup, { popupProps, POPUP_EVENT } from './Popup';
import { VNodeData } from 'vue';
import { PopupOutSideEvents, PopupOutSideProps, PopupGetContainerFunc } from './types';
import { defineComponent, props } from '../_utils/defineComponent';

export const popupOutSideProps = {
  getContainer: props.ofType<PopupGetContainerFunc>().default(() => document.body),
  dynamic: props(Boolean).default(false),
  usePortal: props(Boolean).default(true),
  ...popupProps,
};

const createPopupWrapper = defineComponent<PopupOutSideProps, PopupOutSideEvents>('popup');

const PopupWrapper = createPopupWrapper.create({
  model: {
    prop: 'visible',
    event: POPUP_EVENT,
  },
  props: popupOutSideProps,
  methods: {
    close() {
      (this.$refs.popup as any).close();
    },
    open() {
      (this.$refs.popup as any).open();
    },
  },
  render() {
    const {
      $props,
      $listeners,
      $attrs,
      $slots,
      visible,
      getContainer,
      dynamic,
    } = this;
    const popupNodeData: VNodeData = {
      props: $props,
      on: {
        ...$listeners,
        afterLeave: () => {
          if (dynamic && this.$refs.portal) {
            (this.$refs.portal as any).remove();
          }
          this.$emit('afterClose');
        },
      },
      attrs: $attrs,
      ref: 'popup',
    };
    if (!this.usePortal) return (
      <Popup {...popupNodeData}>{$slots.default}</Popup>
    );
    const container = getContainer instanceof Function
      ? getContainer()
      : getContainer;
    return (
      <PortalRender
        ref="portal"
        visible={visible}
        container={container}
        children={() => (
          <Popup {...popupNodeData}>{$slots.default}</Popup>
        )}>
      </PortalRender>
    )
  },
});

export default PopupWrapper;
