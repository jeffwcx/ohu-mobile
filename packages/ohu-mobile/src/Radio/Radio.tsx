import { CheckboxCircleFilled, CheckboxBlankCircleOutlined } from '@ohu-mobile/icons';
import { getIcon } from '../_utils/icon-utils';
import CheckBase from '../_checkbase/CheckBase';
import { CreateElement } from 'vue';
import { RadioProps } from './types';
import { $prefix } from '../_config/variables';


const baseRadioName = `${$prefix}radio`;
const radioLabelCls = `${baseRadioName}__label`;
const radioWrapperCls = `${baseRadioName}-wrapper`;

export default CheckBase<RadioProps>({
  baseName: baseRadioName,
  role: 'radio',
  wrapperCls: radioWrapperCls,
  labelCls: radioLabelCls,
  defaultCheckedIcon: CheckboxCircleFilled,
  defaultUnCheckedIcon: CheckboxBlankCircleOutlined,
  icon: (h: CreateElement, checked: boolean, {
    checkedIcon,
    unCheckedIcon,
    color,
    unCheckedColor,
  }) => {
    const iconType = checked ? checkedIcon : unCheckedIcon;
    if (!iconType) return h('i');
    return getIcon(
      h,
      iconType,
      { color:  checked ? color : unCheckedColor }
    );
  },
});
