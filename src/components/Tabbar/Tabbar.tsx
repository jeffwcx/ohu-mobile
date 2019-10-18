import { componentFactoryOf } from 'vue-tsx-support';
import props from 'vue-strict-prop';
import { prefix } from '../_utils/shared';
import './styles/index.scss';
import { VNodeData } from 'vue';

export interface TabbarEvents {
  onChange: string | number;
  onInput: string | number;
}

export const tabbarBaseName = `${prefix}tabbar`;
export const Tabbar = componentFactoryOf<TabbarEvents>().create({
  name: tabbarBaseName,
  props: {
    value: props(String, Number).optional,
    border: props(Boolean).default(true),
    activeColor: props(String).default('primary'),
    inActiveColor: props(String).default('#333'),
    barColor: props(String).default('rgba(255,255,255,0.9)'),
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
    const { inActiveColor, barColor, $slots, $attrs } = this;
    const cls = {
      [tabbarBaseName]: true,
      'has-border': this.border,
    };
    const tabbarProps: VNodeData = {
      attrs: $attrs,
      class: cls,
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
