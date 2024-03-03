import Vue, { VueConstructor, CreateElement, VNode, VNodeData } from 'vue';
import { PopupOutSideEvents } from '../Popup';
import { VueEventWrapper } from '../types';

export interface MethodBaseOptions extends VueEventWrapper<PopupOutSideEvents> {
  parent?: Vue;
  render?: (h?: CreateElement) => VNode | VNode[];
}

export type PopupDepositComponent = InstanceType<VueConstructor> & {
  visible: boolean;
  close: () => void;
  show: () => void;
};
type EventRecord = Record<string, (event: any) => any>;

function getProps(props: Record<string, any>) {
  return Object.keys(props).reduce(
    (result, p) => {
      const isProps = p.match(/(on|render)[A-Z].*/) === null;
      if (isProps) {
        result[p] = props[p];
      }
      return result;
    },
    {} as Record<string, any>,
  );
}

function getEvents(events: Record<string, any>) {
  return Object.keys(events).reduce((result, event) => {
    const matchEvent = event.match(/on([A-Z].*)/);
    if (matchEvent && events[event] instanceof Function) {
      let [_, eventStr] = matchEvent;
      eventStr = eventStr[0].toLowerCase() + eventStr.substr(1);
      result[eventStr] = events[event];
    }
    return result;
  }, {} as EventRecord);
}

function getSlots(props: Record<string, any>) {
  return Object.keys(props).reduce(
    (result, p) => {
      const matchSlot = p.match(/render([A-Z].*)/);
      if (matchSlot && props[p] instanceof Function) {
        let [_, slotStr] = matchSlot;
        slotStr = slotStr[0].toLowerCase() + slotStr.substr(1);
        result[slotStr] = props[p];
      }
      return result;
    },
    {} as Record<string, (h?: CreateElement) => VNode | VNode[]>,
  );
}

// All the component that build on the top of popup can use it.
// transform slot to render, for example default => render, title => renderTitle
export default function createPopupMethodApi<T extends VueConstructor>(
  component: T,
  singleton: boolean = false,
) {
  let instanceManager: PopupDepositComponent[] | PopupDepositComponent | null =
    singleton ? null : [];
  let close;
  if (singleton) {
    close = () => {
      if (instanceManager) {
        (instanceManager as PopupDepositComponent).visible = false;
      }
    };
  } else {
    close = () => {
      if (instanceManager instanceof Array) {
        instanceManager.forEach((instance) => {
          instance.visible = false;
        });
      }
    };
  }

  const createOpenApi = <
    O extends MethodBaseOptions,
    T extends MethodBaseOptions = O,
  >(
    defaultOptions?: T,
  ) => {
    return (options: O) => {
      const { parent, render, onAfterClose, ...restOptions } = options;
      const events = getEvents(restOptions);
      const currentProps = getProps(restOptions);
      const slots = getSlots(restOptions);
      if (instanceManager && !(instanceManager instanceof Array) && singleton) {
        instanceManager.close();
        instanceManager = null;
      }
      const instance: PopupDepositComponent = new Vue({
        parent,
        el: document.createElement('div'),
        data() {
          return {
            visible: true,
          };
        },
        methods: {
          close() {
            instance.visible = false;
          },
          show() {
            instance.visible = true;
          },
        },
        render(h) {
          const vnodeData: VNodeData = {
            props: {
              ...defaultOptions,
              ...currentProps,
              visible: this.visible,
              dynamic: true,
            },
            on: {
              ...events,
              afterClose: (e: any) => {
                if (onAfterClose) onAfterClose(e);
                this.$destroy();
                if (instanceManager instanceof Array) {
                  const index = instanceManager.indexOf(instance);
                  if (index >= 0) {
                    instanceManager.splice(index, 1);
                  }
                } else if (instanceManager && instanceManager === instance) {
                  instanceManager = null;
                }
              },
            },
          };
          return (
            <component {...vnodeData}>
              {Object.keys(slots).map((slotName) => {
                return (
                  <template slot={slotName}>{slots[slotName](h)}</template>
                );
              })}
              {render && render(h)}
            </component>
          );
        },
      });
      if (singleton) {
        instanceManager = instance;
      } else {
        if (instanceManager instanceof Array) {
          instanceManager.push(instance);
        }
      }
      return instance;
    };
  };
  return {
    createCustomApi: <
      A extends Array<any>,
      O extends MethodBaseOptions,
      T extends MethodBaseOptions = O,
    >(
      func: (...args: A) => O,
      defaultOptions?: T,
    ) => {
      const api = createOpenApi<O, T>(defaultOptions);
      return (...args: A) => {
        return api(func(...args));
      };
    },
    createOpenApi,
    close,
  };
}
