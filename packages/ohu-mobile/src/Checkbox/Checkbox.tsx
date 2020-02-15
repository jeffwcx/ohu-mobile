import props from 'vue-strict-prop';
import { CheckboxIndeterminateFilled, CheckboxFilled, CheckboxBlankOutlined } from '@ohu-mobile/icons';
import { getIcon } from '../_utils/icon-utils';
import CheckBase from '../_checkbase/CheckBase';
import { CreateElement } from 'vue';
import { CheckboxProps } from './types';
import { IconProperty } from '../types';
import { $prefix } from '../_config/variables';


const baseCheckboxName = `${$prefix}checkbox`;
const checkBoxLabelCls = `${baseCheckboxName}__label`;
const checkBoxWrapperCls = `${baseCheckboxName}-wrapper`;

export default CheckBase<CheckboxProps>({
  baseName: baseCheckboxName,
  role: 'checkbox',
  addProps: {
    indeterminate: props(Boolean).default(false),
    indeterminateIcon: props.ofType<IconProperty>().default(() => CheckboxIndeterminateFilled),
  },
  wrapperCls: checkBoxWrapperCls,
  labelCls: checkBoxLabelCls,
  defaultCheckedIcon: CheckboxFilled,
  defaultUnCheckedIcon: CheckboxBlankOutlined,
  icon: (h: CreateElement, checked: boolean, {
    indeterminate,
    indeterminateIcon,
    checkedIcon,
    unCheckedIcon,
    color,
    unCheckedColor,
  }) => {
    const iconType = indeterminate ? indeterminateIcon : (
      checked ? checkedIcon : unCheckedIcon
    );
    if (!iconType) return h('i');
    return getIcon(
      h,
      iconType,
      { color:  (indeterminate || checked) ? color : unCheckedColor }
    );
  },
});
