import { componentFactoryOf } from 'vue-tsx-support';
import props from 'vue-strict-prop';
import { DropMenuEvents, DropMenuItemOptions, DropMenuChangeEvent } from './types';
import { prefix } from '../_utils/shared';
import Divider from '../Divider';
import { getVNodesByName, isTargetComponent } from '../_utils/vnode';
import { VNode } from 'vue';
import { manager } from '../Popup';
import './styles/index.scss';
import { DropMenuItemType } from './DropMenuItem';
import isPlainObject from '../_utils/isPlainObject';


export const baseDropMenuName = `${prefix}dropmenu`;
export const baseDropMenuItemName = `${baseDropMenuName}-item`;
const dropMenuInnerCls = `${baseDropMenuName}__inner`;
const DropMenu = componentFactoryOf<DropMenuEvents>().create({
  name: baseDropMenuName,
  props: {
    defaultValue: props<Record<string, any>, Array<any>>(Object, Array).optional,
    direction: props.ofStringLiterals('up', 'down').default('down'),
    divider: props(Boolean).default(true),
  },
  data() {
    return {
      zIndex: manager.zIndex + 10000,
      currentValue: this.defaultValue,
    };
  },
  methods: {
    closeAllPopup() {
      this.$children.map((item) => {
        if (isTargetComponent(item.$vnode, baseDropMenuItemName)) {
          const menuItem = item as DropMenuItemType;
          menuItem.close();
        }
      });
    },
    triggerChange(event: DropMenuChangeEvent) {
      const { value, key, index } = event;
      if (this.currentValue instanceof Array) {
        this.$set(this.currentValue, index, value);
      } else if(isPlainObject(this.currentValue) && key) {
        this.currentValue[key] = value;
      }
      this.closeAllPopup();
      this.$emit('change', event);
    }
  },
  render() {
    const { $slots, divider } = this;
    let inner: VNode[] = [];
    if ($slots.default) {
      const nodes = getVNodesByName($slots.default, baseDropMenuItemName);
      nodes.map((item, index) => {
        inner.push(item);
        if (index < nodes.length - 1 && divider) {
          inner.push(<Divider vertical></Divider>);
        }
      });
    }
    const style: Partial<CSSStyleDeclaration> = {
      position: 'relative',
      zIndex: this.zIndex.toString(),
    };
    return (
      <div class={baseDropMenuName} ref="dropMenu">
        <Divider />
        <div class={dropMenuInnerCls} style={style}>{inner}</div>
        <Divider />
      </div>
    );
  },
});

export default DropMenu;
