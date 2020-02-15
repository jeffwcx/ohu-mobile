import { VNodeData } from 'vue';
import { TabbarEvents, TabbarProps } from './types';
import { $prefix, $colorTextBase, $tabbarBackground } from '../_config/variables';
import { defineComponent, props } from '../_utils/defineComponent';

export const tabbarBaseName = `${$prefix}tabbar`;

const Tabbar = defineComponent<TabbarProps, TabbarEvents>('tabbar').create({
  props: {
    value: props(String, Number).optional,
    border: props(Boolean).default(true),
    activeColor: props(String).default('primary'),
    inActiveColor: props(String).default($colorTextBase),
    barColor: props(String).default($tabbarBackground),
  },
  data() {
    return {
      stateValue: this.value,
    };
  },
  watch: {
    value(changedValue) {
      if (this.stateValue !== changedValue) {
        this.stateValue = changedValue;
      }
    },
  },
  methods: {
    onChange(key: string) {
      if (this.stateValue !== key) {
        this.stateValue = key;
        this.$emit('change', this.stateValue);
        this.$emit('input', this.stateValue);
      }
    },
  },
  render() {
    const {
      $slots, $attrs,
      inActiveColor, barColor, border,
    } = this;
    const tabbarProps: VNodeData = {
      attrs: $attrs,
      class: this.root().has([border && 'border']),
      style: {
        color: inActiveColor,
        background: barColor,
      },
    };
    return (
      <div {...tabbarProps}>
        { $slots.default }
      </div>
    );
  },
});

export default Tabbar;
