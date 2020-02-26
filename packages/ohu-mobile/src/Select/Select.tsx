import { defineComponent, props } from '../_utils/defineComponent';
import { SelectProps, SelectEvents, SelectOption, SelectScopedSlots } from './types';
import Popup, { PopupProps, PopupHeaderProps } from '../Popup';
import RadioList from '../RadioList';
import { CheckOutlined, ArrowDownSFilled } from '@ohu-mobile/icons';
import CheckList from '../CheckList';
import Icon from '../Icon';
import { IconDef } from '../types';
import { SyntheticEvent, SelectHTMLAttributes } from 'vue-tsx-support/types/dom';
import { BlockContext } from '../_utils/classHelper';
import { VNodeData } from 'vue/types/umd';

interface SelectMethods {
  unconfirmStateValue: any | any[] | undefined;
  stateValue: any | any[] | undefined;
  getCurrentSelectedOption(value?: any): SelectOption | SelectOption[] | undefined;
  getCurrentStateValue(value?: any): any | any[] | undefined;
}

const defaultPopupProps: PopupProps = {
  position: 'bottom',
  round: true,
};

const defaultPopupHeaderProps: PopupHeaderProps = {
  center: true,
}

export default defineComponent<SelectProps, SelectEvents, SelectScopedSlots, SelectMethods>(
  'select'
).create({
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    name: String,
    value: props.ofType<any | any[]>().optional,
    options: props.ofType<SelectOption[]>().default(() => []),
    title: props(String).optional,
    multiple: props(Boolean).default(false),
    placeholder: props(String).optional,
    icon: props.ofType<IconDef>().default(() => ArrowDownSFilled),
    confirm: props(Boolean).default(false),
    minHeight: props(String).default('auto'),
    maxHeight: props(String).default('auto'),
    native: props(Boolean).default(false),
    outline: props(Boolean).default(false),
    noBorder: props(Boolean).default(false),
    popupProps: props.ofType<PopupProps>().default(() => defaultPopupProps),
    headerProps: props.ofType<PopupHeaderProps>().default(() => defaultPopupHeaderProps),
  },
  watch: {
    value(cur) {
      const currentValue = this.getCurrentStateValue(cur);
      const currentOption = this.getCurrentSelectedOption(currentValue);
      this.stateValue = currentValue;
      this.selectedOption = currentOption;
    },
  },
  computed: {
    shouldConfirm() {
      return this.confirm || this.multiple;
    },
    checkedValue() {
      if (this.shouldConfirm) {
        return this.unconfirmStateValue;
      }
      return this.stateValue;
    },
  },
  data() {
    const currentValue = this.getCurrentStateValue(this.value);
    const currentOption = this.getCurrentSelectedOption(currentValue);
    return {
      popupVisible: false,
      stateValue: currentValue,
      selectedOption: currentOption,
      unconfirmStateValue: undefined,
      unconfirmSelectedOption: undefined as SelectOption | undefined | SelectOption[],
    };
  },
  methods: {
    getCurrentStateValue(value: any | any[]) {
      if (!value) return;
      if (this.multiple && !(value instanceof Array)) {
        return [value];
      }
      if (this.multiple && this.value instanceof Array) {
        return [...this.value];
      }
      return value;
    },
    getCurrentSelectedOption(value: any) {
      if (!value) return;
      if (this.multiple && value instanceof Array) {
        return this.options.filter((option) => {
          return value.indexOf(option.value) >= 0;
        });
      }
      return this.options.find(option => option.value === value);
    },
    handleNativeChange(e: SyntheticEvent<SelectHTMLAttributes, Event>) {
      const value = e.target.value;
      const currentOption = this.options.find(option => option.value === value);
      if (currentOption) {
        this.handleChange(value, currentOption);
      }
    },
    handleChange(value: any, option: SelectOption | SelectOption[]) {
      if (this.shouldConfirm) {
        this.unconfirmSelectedOption = option;
        this.unconfirmStateValue = value;
        this.$emit('select', this.unconfirmStateValue, this.unconfirmSelectedOption);
        return;
      }
      this.stateValue = value;
      this.selectedOption = option;
      this.emitChange();
    },
    handleConfirm() {
      this.stateValue = this.unconfirmStateValue;
      this.selectedOption = this.unconfirmSelectedOption;
      this.emitChange();
      this.$emit('confirm', this.stateValue, this.selectedOption);
    },
    emitChange() {
      this.$emit('change', this.stateValue, this.selectedOption);
      this.close();
    },
    getControlNode() {
      if (this.$scopedSlots.control) {
        return this.$scopedSlots.control(this.selectedOption);
      }
      if (this.selectedOption instanceof Array) {
        return (
          this.selectedOption.map((option) => {
            return option?.label || option?.value;
          }).join('/')
        );
      }
      return this.selectedOption?.value
        ? (this.selectedOption?.label || this.selectedOption?.value)
        : '';
    },
    renderCheckList() {
      return (
        this.multiple
          ?
          <CheckList
            value={this.checkedValue}
            options={this.options}
            onChange={this.handleChange}>
          </CheckList>
          :
          <RadioList
            value={this.checkedValue}
            checkedIcon={CheckOutlined}
            unCheckedIcon={null}
            options={this.options}
            onChange={this.handleChange}>
          </RadioList>
      );
    },
    renderNative() {
      return (
        <select name={this.name} onChange={this.handleNativeChange}>
          {
            this.options.map(({ label, value, disabled }) => {
              return (
                <option
                  disabled={!!disabled}
                  value={label}
                  selected={value === this.stateValue}>{value}</option>
              );
            })
          }
        </select>
      );
    },
    renderPopup(popupClass: BlockContext, contentStyle: Partial<CSSStyleDeclaration>) {
      const nodeData: VNodeData = {
        props: {
          ...this.popupProps,
          visible: this.popupVisible,
          targetClass: popupClass,
        } as PopupProps,
        on: {
          open: this.open,
          close: this.close,
        },
      };
      const headerNodeData = {
        props: {
          ...this.headerProps,
          confirm: this.shouldConfirm,
        } as PopupHeaderProps,
        on: {
          confirm: this.handleConfirm
        },
      }
      return (
        <Popup {...nodeData}>
          {
            this.title
            &&
            <Popup.Header {...headerNodeData}>
              {this.title}
            </Popup.Header>
          }
          <div class={popupClass.element('content')} style={contentStyle}>
            {this.renderCheckList()}
          </div>
        </Popup>
      );
    },
    open() {
      if (this.native) return;
      if (this.shouldConfirm) {
        this.unconfirmStateValue = this.stateValue;
        this.unconfirmSelectedOption = this.selectedOption;
      }
      this.popupVisible = true;
      this.$emit('show');
    },
    close() {
      this.popupVisible = false;
      this.unconfirmSelectedOption = undefined;
      this.unconfirmStateValue = undefined;
      this.$emit('hide');
    },
  },
  render() {
    const root = this.root();
    const {
      placeholder, icon, outline, noBorder,
      maxHeight, minHeight, native,
      stateValue,
    } = this;
    const inputNode = root.element('input');
    const inputControl = inputNode.element('control');
    const placeholderNode = inputNode.element('placeholder');
    const iconNode = inputNode.element('icon');
    const popupNode = root.element('popup');
    let controlContent = this.getControlNode();
    const contentStyle: Partial<CSSStyleDeclaration> = {
      minHeight,
      maxHeight,
    };
    return (
      <div class={root}>
        {!native && this.renderPopup(popupNode, contentStyle)}
        <div class={inputNode.is([outline ? 'outline' : 'normal']).has([!noBorder && 'border'])}
          onClick={this.open}
          role="button">
          {
            controlContent
            &&
            <div class={inputControl}>{controlContent}</div>
          }
          {
            placeholder
            && !controlContent
            &&
            <div class={placeholderNode}>{placeholder}</div>
          }
          <div class={iconNode}>
            <Icon type={icon} />
          </div>
          {
            !native
              ? <input type="hidden" value={stateValue} />
              : this.renderNative()
          }
        </div>
      </div>
    );
  },
});
