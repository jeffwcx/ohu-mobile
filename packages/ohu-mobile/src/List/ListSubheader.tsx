import { component } from 'vue-tsx-support';
import props from 'vue-strict-prop';
import Sticky from '../Sticky';
import { $prefix } from '../_config/variables';


const baseListSubheaderName = `${$prefix}list-subheader`;

export default component({
  name: baseListSubheaderName,
  props: {
    sticky: props(Boolean).default(false),
  },
  data() {
    return {
      state: 'default',
    };
  },
  methods: {
    setState(state: string) {
      this.state = state;
    },
  },
  render() {
    const { $slots, sticky } = this;
    if (sticky) {
      const rootClass = {
        [baseListSubheaderName]: true,
        [`is-${this.state}`]: true,
      };
      return (
        <Sticky
          class={rootClass}
          onFixed={this.setState}
          onStuck={this.setState}
          onNormal={this.setState}>
          {$slots.default}
        </Sticky>
      );
    }
    return (
      <div class={baseListSubheaderName}>
        {$slots.default}
      </div>
    );
  },
});
