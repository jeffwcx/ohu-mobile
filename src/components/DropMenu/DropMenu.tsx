import { componentFactoryOf } from 'vue-tsx-support';
import props from 'vue-strict-prop';
import { DropMenuEvents, DropMenuChangeEvent } from './types';
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
    defaultValue: props<Record<string | number, any>, Array<any>>(Object, Array).default(() => ({})),
    direction: props.ofStringLiterals('up', 'down').default('down'),
    divider: props(Boolean).default(true),
  },
  computed: {
    isObjectValue() {
      return isPlainObject<Record<string | number, any>>(this.defaultValue);
    },
  },
  data() {
    return {
      zIndex: manager.zIndex + 10000,
      currentValue: this.defaultValue,
      selectedOptions: {},
    } as {
      zIndex: number,
      currentValue: Record<string | number, any> | Array<any>,
      selectedOptions: Record<string | number, any>,
    };
  },
  mounted() {
    this.initSelectedOptions();
  },
  methods: {
    initSelectedOptions() {
      this.getMenuItems().map((item) => {
        const option = item.getCheckedOption();
        if (option) {
          if (this.isObjectValue && item.$vnode.key) {
            this.selectedOptions[item.$vnode.key] = option;
          } else if (!this.isObjectValue) {
            this.selectedOptions[item.getIndex()] = option;
          }
        }
      });
    },
    getMenuItems() {
      return this.$children.filter(item =>
        isTargetComponent(item.$vnode, baseDropMenuItemName)) as DropMenuItemType[];
    },
    getMenuItemIndex(menuItem: DropMenuItemType) {
      return this.getMenuItems().indexOf(menuItem);
    },
    closeAllPopup() {
      this.getMenuItems().map((item) => {
        item.close();
      });
    },
    triggerChange(event: DropMenuChangeEvent) {
      const { value, key, index } = event;
      if (this.currentValue instanceof Array) {
        this.$set(this.currentValue, index, value);
        this.selectedOptions[index] = event;
      } else if(isPlainObject<Record<string | number, any>>(this.currentValue) && key) {
        this.currentValue[key] = value;
        this.selectedOptions[key] = event;
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
        if (item.componentOptions && item.componentOptions.propsData) {
          item.componentOptions.propsData
        }
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
