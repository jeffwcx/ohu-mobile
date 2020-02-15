import props from 'vue-strict-prop';
import { CheckboxOption } from './types';

export default {
  name: props(String).optional,
  value: props.ofArray().default(() => []),
  disabled: props.ofType<Boolean | undefined>().default(undefined),
  options: props.ofArray<CheckboxOption | string>().optional,
  max: props(Number).default(Infinity),
};
