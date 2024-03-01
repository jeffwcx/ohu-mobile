import {
  DropMenuItemOptions,
  DropMenuChangeEvent,
  DropMenuDataModel,
  DropMenuChangeOption,
  DropMenuItemScopedSlots,
  DropMenuItemEvents,
  DropMenuItemProps,
} from './types';
import Popup, { PopupOpenEvent } from '../Popup';
import Divider from '../Divider';
import { VNode, PropOptions, CSSProperties } from 'vue';
import { getIcon } from '../_utils/icon-utils';
import isPlainObject from '../_utils/isPlainObject';
import { IconProperty } from '../types';
import { ScopedSlotReturnValue } from 'vue/types/vnode';
import { defineComponent, props } from '../_utils/defineComponent';

const defaultCheckedFunc = function (
  checkedOption?: DropMenuItemOptions,
  option?: DropMenuItemOptions,
) {
  if (checkedOption && !option) return true;
  if (checkedOption && option) {
    return checkedOption.value === option.value;
  }
  return false;
};

const DropMenuItem = defineComponent<
  DropMenuItemProps,
  DropMenuItemEvents,
  DropMenuItemScopedSlots
>('dropmenu-item').create({
  props: {
    title: String,
    disabled: props(Boolean).default(false),
    options: props.ofType<DropMenuItemOptions[]>().default(() => []),
    checkIcon: props.ofType<IconProperty>().optional,
    dropDownIcon: props.ofType<IconProperty>().optional,
    checkedFunc: {
      type: Function,
      default: defaultCheckedFunc,
    } as PropOptions<typeof defaultCheckedFunc>,
    popupClass: props<string, Record<string, boolean>, Array<string>>(
      String,
      Object,
      Array,
    ).optional,
    popupStyle: props.ofType<CSSProperties>().optional,
  },
  data() {
    return {
      popupVisible: false,
      checkedOption: undefined as DropMenuItemOptions | undefined,
      opened: false,
    };
  },
  created() {
    this.checkedOption = this.getCheckedOption();
  },
  methods: {
    getCheckedOption(): DropMenuItemOptions | undefined {
      let checkedOption: DropMenuItemOptions | undefined = undefined;
      const key = this.getKey();
      const index = this.getIndex();
      const checkedValue = this.getCheckedValue();
      if (this.options.length > 0 && checkedValue !== undefined) {
        this.options.some((option) => {
          if (option.value === checkedValue) {
            checkedOption = Object.assign(
              {
                key,
                index,
              },
              option,
            );
            return true;
          }
          return false;
        });
      }
      return checkedOption;
    },
    getParent() {
      return this.$parent as any;
    },
    getDropMenuElement() {
      // todo: turn to use optional chain
      return this.getParent().$refs.dropMenu as HTMLElement;
    },
    getIndex() {
      return this.getParent().getMenuItemIndex(this);
    },
    getKey() {
      return this.$vnode.key as string | number;
    },
    getCheckedValue() {
      const { currentValue } = this.getParent();
      const key = this.getKey();
      if (currentValue instanceof Array) {
        return currentValue[this.getIndex()];
      } else if (isPlainObject<DropMenuDataModel>(currentValue) && key) {
        return currentValue[key];
      }
    },
    close() {
      if (this.popupVisible) {
        this.popupVisible = false;
      }
    },
    handleVisibleChange(visible: boolean) {
      this.popupVisible = visible;
      if (visible === false) {
        this.opened = false;
      }
      this.$emit('visibleChange', visible);
    },
    handleClick() {
      if (this.disabled) return;
      const currentVisible = this.popupVisible;
      this.getParent().closeAllPopup();
      this.popupVisible = !currentVisible;
    },
    triggerChange(option: DropMenuChangeOption) {
      if (option.disabled) return;
      if (option.index === undefined) {
        option.index = this.getIndex();
      }
      if (option.key === undefined) {
        option.key = this.getKey();
      }
      this.checkedOption = option;
      this.getParent().triggerChange(option as DropMenuChangeEvent);
    },
    handlePopupOpen(e: PopupOpenEvent) {
      const { documentZIndex } = e;
      this.getParent().zIndex = documentZIndex + 1;
      this.$emit('open', e);
    },
    handleAfterOpen() {
      this.opened = true;
    },
  },
  render() {
    const { $scopedSlots, title, options, disabled } = this;
    const {
      direction,
      itemActive,
      mask,
      popupClass,
      popupStyle,
      checkIcon,
      dropDownIcon,
    } = this.getParent();
    const cls = this.$rootCls();
    let popupContent;
    let checkedText: string | ScopedSlotReturnValue = title;
    let hasCheckedOption = false;
    let key = this.getKey();
    let componentIndex = this.getIndex();
    let checkedOption = this.checkedOption;
    if ($scopedSlots.default) {
      popupContent = $scopedSlots.default({
        opened: this.opened,
        checked: checkedOption,
        options: this.options,
        instance: this as InstanceType<typeof DropMenuItem>,
      });
      if (checkedOption) {
        hasCheckedOption = this.checkedFunc(checkedOption);
        if (checkedOption.label) {
          checkedText = checkedOption.label;
        }
      }
    } else {
      let icon = getIcon(this.$createElement, this.checkIcon || checkIcon);
      popupContent = options.reduce((result, option, index) => {
        const isCheck = this.checkedFunc(checkedOption, option);
        if (isCheck) {
          hasCheckedOption = true;
        }
        if (isCheck && option.label) {
          checkedText = option.label;
        }
        const optionCls = cls
          .block('option')
          .is(isCheck && 'active')
          .is(!!option.disabled && 'disabled');
        result.push(
          <div
            class={optionCls}
            onClick={() =>
              this.triggerChange({
                index: componentIndex,
                key,
                ...option,
              })
            }
          >
            {option.label}
            {isCheck && icon}
          </div>,
        );
        if (index < options.length - 1) {
          result.push(<Divider></Divider>);
        }
        return result;
      }, [] as VNode[]);
    }

    const dropMenuCls = cls
      .is((this.popupVisible || (itemActive && hasCheckedOption)) && 'active')
      .is(disabled && 'disabled');
    const iconCls = cls
      .element('icon')
      .is(
        (direction === 'up' ? !this.popupVisible : this.popupVisible) && 'up',
      );
    const popupCls = cls
      .block('options')
      .addClasses(this.popupClass || popupClass);
    const popupProps = {
      props: {
        visible: this.popupVisible,
        targetClass: popupCls,
        targetStyle: this.popupStyle || popupStyle,
        getContainer: () => this.getDropMenuElement(),
        position: direction === 'up' ? 'top' : 'bottom',
        marginThreshold: 0,
        mask,
        anchor: () => this.getDropMenuElement(),
        animate: direction === 'up' ? 'scale-down' : 'scale-up',
        partialMask: direction === 'up' ? 'top' : 'bottom',
      },
      on: {
        ...this.$listeners,
        open: this.handlePopupOpen,
        afterOpen: this.handleAfterOpen,
        visibleChange: this.handleVisibleChange,
      },
    };
    let icon2 = getIcon(this.$createElement, this.dropDownIcon || dropDownIcon);
    if ($scopedSlots.title) {
      checkedText = $scopedSlots.title({
        defaultTitle: title,
        checked: checkedOption,
      });
    }
    return (
      <div class={dropMenuCls} onClick={this.handleClick}>
        <span class={cls.element('text')}>{checkedText}</span>
        <i class={iconCls}>{icon2}</i>
        <Popup {...popupProps}>{popupContent}</Popup>
      </div>
    );
  },
});

export type DropMenuItemType = InstanceType<typeof DropMenuItem>;

export default DropMenuItem;
