import { defineComponent } from '../_utils/defineComponent';
import { TabProps } from './types';
import { entryItemProps } from '../EntryItem/EntryItem';

export default defineComponent<TabProps>('tab').create({
  props: {
    title: String,
    name: String,
    ...entryItemProps,
  },
  render() {
    const root = this.$rootCls();
    const { $slots } = this;
    return <div class={root}>{$slots.default}</div>;
  },
});
