import { ArrowDownSOutlined } from '@ohu-mobile/icons';
import { defineAncestorComponent, props } from '../_utils/defineComponent';
import {
  CollapseProps,
  CollapseEvents,
  CollapseExpandIconPosition,
  CollapseValue,
} from './types';
import { IconDef } from '../types';

export default defineAncestorComponent<CollapseProps, CollapseEvents>(
  'collapse',
).create({
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    expandIcon: props
      .ofType<IconDef | null>()
      .default(() => ArrowDownSOutlined),
    expandIconPosition: props
      .ofType<CollapseExpandIconPosition>()
      .default('right'),
    value: props.ofType<CollapseValue>().optional,
    accordion: props(Boolean).default(false),
  },
  watch: {
    value(current) {
      this.state = current;
    },
  },
  data() {
    return {
      state: this.value,
    };
  },
  methods: {
    itemChange(key: string | number, expand: boolean) {
      if (this.state === undefined && !this.accordion) {
        this.state = [];
      }
      if (this.accordion) {
        this.state = expand ? key : '';
      } else if (this.state instanceof Array) {
        if (expand) {
          if (this.state.indexOf(key) >= 0) return;
          this.state.push(key);
        } else {
          const index = this.state.indexOf(key);
          if (index < 0) return;
          this.state.splice(index, 1);
        }
      } else {
        return;
      }
      this.$emit('change', this.state);
    },
  },
  render() {
    const { $slots } = this;
    const root = this.$rootCls();
    return <div class={root}>{$slots.default}</div>;
  },
});
