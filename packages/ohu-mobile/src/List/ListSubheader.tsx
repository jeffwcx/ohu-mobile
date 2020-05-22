import Sticky from '../Sticky';
import { defineComponent, props } from '../_utils/defineComponent';
import { ListSubheaderProps as Props, ListSubheaderEvents as Events } from './types';

const createListSubHeader = defineComponent<Props, Events>('list-subheader');

export default createListSubHeader.create({
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
      this.$emit('change', state);
    },
  },
  render() {
    const { $slots, sticky } = this;
    const root = this.root();
    if (sticky) {
      root.is(this.state);
      return (
        <Sticky
          class={root}
          onFixed={this.setState}
          onStuck={this.setState}
          onNormal={this.setState}>
          {$slots.default}
        </Sticky>
      );
    }
    return (
      <div class={root}>
        {$slots.default}
      </div>
    );
  },
});
