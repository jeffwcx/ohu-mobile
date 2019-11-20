import DropMenu, { baseDropMenuItemName } from './DropMenu';
import { componentFactoryOf } from 'vue-tsx-support';
import props from 'vue-strict-prop';
import { DropMenuEvents, DropMenuItemOptions, DropMenuChangeEvent } from './types';
import Icon from '../Icon';
import { ArrowDownSOutlined, CheckOutlined } from '@/icons';
import Popup, { PopupOpenEvent } from '../Popup';
import Divider from '../Divider';
import { VNode } from 'vue';
import { IconProperty } from '@/global';
import { getIcon } from '../_utils/icon-utils';
import isPlainObject from '../_utils/isPlainObject';

const dropMenuItemOptionsCls = `${baseDropMenuItemName}-options`;
const dropMenuItemOptionCls = `${baseDropMenuItemName}-option`;
const dropMenuItemTextCls = `${baseDropMenuItemName}__text`;
const dropMenuItemIconCls = `${baseDropMenuItemName}__icon`;

type DropMenuType = InstanceType<typeof DropMenu>;

const DropMenuItem = componentFactoryOf<DropMenuEvents>().create({
  name: baseDropMenuItemName,
  props: {
    title: String,
    disabled: props(Boolean).default(false),
    options: props.ofType<DropMenuItemOptions[]>().default(() => []),
    checkIcon: props.ofType<IconProperty>().default(() => CheckOutlined),
  },
  computed: {
    icon() {
      return getIcon(this.$createElement, this.checkIcon);
    },
  },
  data() {
    return {
      popupVisible: false,
      zIndex: 1,
    };
  },
  methods: {
    getParent() {
      return this.$parent as DropMenuType;
    },
    close() {
      if (this.popupVisible) {
        this.popupVisible = false;
      }
    },
    handleVisibleChange(visible: boolean) {
      this.popupVisible = visible;
    },
    handleClick() {
      if (this.disabled) return;
      const currentVisible = this.popupVisible;
      this.getParent().closeAllPopup();
      this.popupVisible = !currentVisible;
    },
    handleOptionClick(event: DropMenuChangeEvent) {
      if (event.disabled) return;
      this.getParent().triggerChange(event);
    },
    handlePopupOpen({ documentZIndex }: PopupOpenEvent) {
      (this.$parent as DropMenuType).zIndex = documentZIndex + 2;
    },
  },
  render() {
    const { $slots, title, options, disabled, icon } = this;
    const { direction, currentValue } = this.$parent as DropMenuType;
    let popupContent;
    let checkedText = title;
    let hasCheckedOption = false;
    if ($slots.default) {
      popupContent = $slots.default;
    } else {
      popupContent = options.reduce((result, option, index) => {
        const key = this.$vnode.key;
        let checkValue;
        if (currentValue instanceof Array) {
          checkValue = currentValue[index];
        } else if (isPlainObject(currentValue) && key) {
          checkValue = currentValue[key];
        }
        const isCheck = checkValue && checkValue === option.value;
        if (isCheck) {
          hasCheckedOption = true;
        }
        if (isCheck && option.label) {
          checkedText = option.label;
        }
        const optionCls = {
          [dropMenuItemOptionCls]: true,
          'is-active': isCheck,
          'is-disabled': !!option.disabled,
        };
        result.push(
          <div class={optionCls} onClick={() => this.handleOptionClick({
            index,
            key,
            ...option,
          })}>
            {option.label}
            { isCheck && icon }
          </div>
        );
        if (index < options.length - 1) {
          result.push(<Divider></Divider>)
        }
        return result;
      }, [] as VNode[]);
    }
    const dropMenuCls = {
      [baseDropMenuItemName]: true,
      'is-active': hasCheckedOption,
      'is-disabled': disabled,
    };
    const iconCls = {
      [dropMenuItemIconCls]: true,
      'is-up': direction === 'up' ? !this.popupVisible : this.popupVisible,
    };
    return (
      <div class={dropMenuCls}
        onClick={this.handleClick}
        ref="dropItem">
        <span class={dropMenuItemTextCls}>{checkedText}</span>
        <i class={iconCls}>
          <Icon type={ArrowDownSOutlined} />
        </i>
        <Popup visible={this.popupVisible}
          targetClass={dropMenuItemOptionsCls}
          getContainer={() => {
            return this.$parent.$refs.dropMenu as HTMLElement;
          }}
          position={ direction === 'up' ? 'top' : 'bottom' }
          marginThreshold={0}
          lockScroll={false}
          anchor={() => this.$refs.dropItem as HTMLElement}
          onVisibleChange={this.handleVisibleChange}
          animate={direction === 'up' ? 'scale-down' : 'scale-up'}>
          {popupContent}
        </Popup>
      </div>
    );
  },
});

export type DropMenuItemType = InstanceType<typeof DropMenuItem>;

export default DropMenuItem;
