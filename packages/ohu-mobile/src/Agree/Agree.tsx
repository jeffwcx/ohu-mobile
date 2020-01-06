import CheckBase from '../_checkbase/CheckBase';
import { prefix } from '../_utils/shared';
import { CheckboxCircleFilled, CheckboxBlankCircleOutlined } from '../../../ohu-mobile-icons/es';
import { CreateElement } from 'vue';
import { getIcon } from '../_utils/icon-utils';
import './styles/index.scss';


const baseAgreeName = `${prefix}agree`;
const agreeWrapperCls = `${baseAgreeName}-wrapper`;
const agreeLabelCls = `${baseAgreeName}__label`;
export default CheckBase({
  baseName: baseAgreeName,
  role: 'checkbox',
  labelCls: agreeLabelCls,
  wrapperCls: agreeWrapperCls,
  defaultCheckedIcon: CheckboxCircleFilled,
  defaultUnCheckedIcon: CheckboxBlankCircleOutlined,
  labelClickable: false,
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
      { color: checked ? color : unCheckedColor }
    );
  },
});
