import { props, defineDsc } from '../_utils/defineComponent';
import { IndexListGroupProps as Props, IndexListGroupEvents as Events } from './types';
import List from '../List';
import IndexList from './IndexList';
import { $prefix } from '../_config/variables';

type IndexListType = InstanceType<typeof IndexList>;

const createIndexListGroup = defineDsc<IndexListType, Props, Events>(
  'index-list',
  'index-list-group',
);

export default createIndexListGroup.create({
  props: {
    index:  props<string, number>(String, Number).default(''),
    title: props(String).optional,
    sticky: props(Boolean).default(true),
    attach: props.ofAny().optional,
    subheader: props(Boolean).default(true),
  },
  mounted() {
    if (this.ancestor) {
      this.ancestor.addGroup(this);
      this.$once('hook:beforeDestroy', () => {
        this.ancestor.removeGroup(this);
      });
    }
  },
  render() {
    const root = this.root();
    const {
      index,
      sticky,
      title,
    } = this.$props as Props;
    return (
      <div class={root}>
        <transition name={`${$prefix}scale-top`}>
          {
            this.subheader && this.ancestor.enableIndex
            &&
            <List.Subheader sticky={sticky}>
              { title || index }
            </List.Subheader>
          }
        </transition>
        {this.$slots.default}
      </div>
    );
  }
});
