import { componentFactoryOf } from 'vue-tsx-support';
import props from 'vue-strict-prop';
import { prefix } from '../_utils/shared';
import Icon from '../Icon';
import vars from '../_styles/variables';
import { CheckboxBlankCircleOutlined, CheckboxCircleFilled, IndeterminateCircleFilled } from '@/icons';
import { InputHTMLAttributes, SyntheticEvent } from 'vue-tsx-support/types/dom';
import './styles/index.scss';
import { IconProperty } from '../../global';
import { getIcon } from '../_utils/icon-utils';


const baseCheckboxName = `${prefix}checkbox`;
const checkBoxLabelCls = `${baseCheckboxName}__label`;
const checkBoxWrapperCls = `${baseCheckboxName}-wrapper`;
export default componentFactoryOf().create({
  name: baseCheckboxName,
  model: {
    prop: 'checked',
    event: 'change',
  },
  props: {
    defaultChecked: props(Boolean).default(false),
    checked: props(Boolean).optional,
    disabled: props(Boolean).default(false),
    indeterminate: props(Boolean).default(false),
    color: props(String).default(vars.colorPrimary),
    unCheckedColor: props(String).default(vars.colorTextDisabled),
    checkedIcon: props.ofType<IconProperty>().default(() => CheckboxCircleFilled),
    unCheckedIcon: props.ofType<IconProperty>().default(() => CheckboxBlankCircleOutlined),
    indeterminateIcon: props.ofType<IconProperty>().default(() => IndeterminateCircleFilled),
  },
  data() {
    return {
      checkedState: this.checked === undefined ? this.defaultChecked : this.checked,
    } as {
      checkedState: boolean,
    };
  },
  methods: {
    handleCheckboxChange(e: SyntheticEvent<InputHTMLAttributes, Event>) {
      if (e.target.checked !== undefined) {
        this.checkedState = e.target.checked;
        this.$emit('change', this.checkedState);
      }
    },
  },
  render() {
    const {
      $slots,
      color, unCheckedColor,
      disabled, indeterminate,
      checkedIcon, unCheckedIcon,
      indeterminateIcon,
    } = this;
    const checked = this.checkedState;
    const cls = {
      [checkBoxWrapperCls]: true,
      'is-disabled': disabled,
    };
    const iconType = indeterminate ? indeterminateIcon : (
      checked ? checkedIcon : unCheckedIcon
    );
    const icon = getIcon(
      this.$createElement,
      iconType,
      { color:  checked ? color : unCheckedColor }
    );
    return (
      <label class={cls}>
        <span class={baseCheckboxName}>
          <input type="checkbox"
            checked={checked}
            data-indeterminate={this.indeterminate}
            onChange={this.handleCheckboxChange}
            disabled={disabled} />
          {icon}
        </span>
        <span class={checkBoxLabelCls}>{$slots.default}</span>
      </label>
    );
  },
});
