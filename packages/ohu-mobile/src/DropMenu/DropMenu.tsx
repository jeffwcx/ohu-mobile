import { componentFactoryOf } from 'vue-tsx-support';
import props from 'vue-strict-prop';
import { DropMenuEvents, DropMenuChangeEvent, DropMenuDataModel } from './types';
import Divider from '../Divider';
import { getVNodesByName, isTargetComponent } from '../_utils/vnode';
import { VNode } from 'vue';
import { manager } from '../Popup';
import { DropMenuItemType } from './DropMenuItem';
import isPlainObject from '../_utils/isPlainObject';
import { CheckOutlined, ArrowDownSOutlined } from '@ohu-mobile/icons';
import { IconProperty } from '../types';
import { $prefix } from '../_config/variables';


export const baseDropMenuName = `${$prefix}dropmenu`;
export const baseDropMenuItemName = `${baseDropMenuName}-item`;
const dropMenuInnerCls = `${baseDropMenuName}__inner`;

const DropMenu = componentFactoryOf<DropMenuEvents>().create({
  name: baseDropMenuName,
  props: {
    defaultValue: props<DropMenuDataModel, Array<any>>(Object, Array).default(() => ({})),
    direction: props.ofStringLiterals('up', 'down').default('down'),
    divider: props(Boolean).default(true),
    border: props(Boolean).default(true),
    itemActive: props(Boolean).default(true),
    mask: props(Boolean).default(true),
    popupClass: props<string, Record<string, boolean>, Array<string>>(String, Object, Array).optional,
    popupStyle: props.ofType<Partial<CSSStyleDeclaration>>().optional,
    checkIcon: props.ofType<IconProperty>().default(() => CheckOutlined),
    dropDownIcon: props.ofType<IconProperty>().default(() => ArrowDownSOutlined),
  },
  computed: {
    isObjectValue() {
      return isPlainObject<DropMenuDataModel>(this.defaultValue);
    },
  },
  data() {
    return {
      zIndex: manager.zIndex + 10000,
      currentValue: this.defaultValue,
      selectedOptions: {},
      menuItems: [],
    } as {
      zIndex: number,
      currentValue: DropMenuDataModel | Array<any>,
      selectedOptions: DropMenuDataModel,
      menuItems: DropMenuItemType[],
    };
  },
  watch: {
    $children() {
      this.menuItems = this.getMenuItems();
    },
  },
  mounted() {
    this.menuItems = this.getMenuItems();
    this.initSelectedOptions();
  },
  methods: {
    getSelectedOptions() {
      return this.selectedOptions;
    },
    getSelectedValues() {
      return this.currentValue;
    },
    initSelectedOptions() {
      this.menuItems.map((item) => {
        const option = item.checkedOption;
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
      } else if(isPlainObject<DropMenuDataModel>(this.currentValue) && key) {
        this.currentValue[key] = value;
        this.selectedOptions[key] = event;
      }
      this.closeAllPopup();
      this.$emit('itemChange', event);
      this.$emit('change', this.currentValue);
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
        <div class={dropMenuInnerCls} style={style}>{inner}</div>
        {this.border &&  <Divider />}
      </div>
    );
  },
});

export default DropMenu;
