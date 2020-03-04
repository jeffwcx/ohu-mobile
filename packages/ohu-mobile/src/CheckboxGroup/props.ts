import props from 'vue-strict-prop';
import { CheckboxOption } from './types';
import { $checkboxActiveColor, $checkboxColor } from '../_config/variables';
import { IconProperty } from '../types';

export default {
  name: props(String).optional,
  value: props.ofArray().default(() => []),
  disabled: props(Boolean).optional,
  options: props.ofArray<CheckboxOption | string>().optional,
  max: props(Number).default(Infinity),
  color: props(String).default($checkboxActiveColor),
  unCheckedColor: props(String).default($checkboxColor),
  checkedIcon: props.ofType<IconProperty | null>().optional,
  unCheckedIcon: props.ofType<IconProperty | null>().optional,
};
