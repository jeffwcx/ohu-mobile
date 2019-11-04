import { componentFactoryOf } from 'vue-tsx-support';
import props from 'vue-strict-prop';
import PortalRender from '../_utils/PortalRender';
import Popup, { PopupProps, POPUP_EVENT, PopupEvents } from './Popup';
import { VNodeData } from 'vue';
import { prefix } from '../_utils/shared';
export type GetContainerFunc = (() => HTMLElement) | HTMLElement;


const basePopupWrapperName = `${prefix}popup`;
const PopupWrapper = componentFactoryOf<Omit<PopupEvents, 'onAfterLeave'>>().create({
  name: basePopupWrapperName,
  model: {
    prop: 'visible',
    event: POPUP_EVENT,
  },
  props: {
    getContainer: props.ofType<GetContainerFunc>().default(() => document.body),
    lazyRender: props(Boolean).default(false),
    ...PopupProps,
  },
  render() {
    const {
      getContainer,
      $props,
      $listeners,
      $attrs,
      visible,
    } = this;
    const popupNodeData: VNodeData = {
      props: $props,
      on: {
        ...$listeners,
        afterLeave: () => {
          if (this.lazyRender) {
            (this.$refs.portal as any).remove();
          }
        },
      },
      attrs: $attrs,
    };
    const container = getContainer instanceof Function
      ? getContainer()
      : getContainer;
    return (
      <PortalRender
        ref="portal"
        visible={visible}
        container={container}
        children={() => <Popup {...popupNodeData}>{ this.$slots.default }</Popup>}>
      </PortalRender>
    )
  },
});

export default PopupWrapper;
