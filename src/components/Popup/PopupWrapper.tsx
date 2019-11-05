import { componentFactoryOf } from 'vue-tsx-support';
import props from 'vue-strict-prop';
import PortalRender from '../_utils/PortalRender';
import Popup, { popupProps, POPUP_EVENT } from './Popup';
import { VNodeData } from 'vue';
import { prefix } from '../_utils/shared';
import { PopupWrapperEvents, PopupGetContainerFunc } from './types';


const basePopupWrapperName = `${prefix}popup`;

const PopupWrapper = componentFactoryOf<PopupWrapperEvents>().create({
  name: basePopupWrapperName,
  model: {
    prop: 'visible',
    event: POPUP_EVENT,
  },
  props: {
    getContainer: props.ofType<PopupGetContainerFunc>().default(() => document.body),
    dynamic: props(Boolean).default(false),
    ...popupProps,
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
          if (this.dynamic) {
            (this.$refs.portal as any).remove();
            this.$emit('afterClose');
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
