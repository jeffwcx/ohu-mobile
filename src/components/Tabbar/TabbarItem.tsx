import { tabbarBaseName } from './Tabbar';
import { componentFactoryOf } from 'vue-tsx-support';
import Tabbar from './Tabbar';
import EntryItem from '../EntryItem';
import { entryItemProps, EntryItemEvents } from '../EntryItem/EntryItem';
import { VNodeData } from 'vue';
import { transformSlotsContext, isTargetComponent } from '../_utils/vnode';


export interface TabbarItemEvents extends EntryItemEvents {}

const tabbarItemBaseName = `${tabbarBaseName}-item`;


const TabbarItemWrapper = function(Item: typeof EntryItem) {
  return componentFactoryOf<TabbarItemEvents>().create({
    name: tabbarItemBaseName,
    props: {
      ...entryItemProps,
      name: String,
    },
    computed: {
      index() {
        return this.$parent.$children.indexOf(this);
      },
    },
    methods: {
      handleClick(e: Event) {
        const parent = this.$parent as any;
        if (isTargetComponent(parent.$vnode, tabbarBaseName)) {
          parent.onChange(this.name || this.index);
        }
      },
    },
    render(h) {
      const { $props, $slots, $scopedSlots, $attrs, $listeners, name } = this;
      const style: Partial<CSSStyleDeclaration> = {};
      let { activeColor, inActiveColor, stateValue } = this.$parent as any;
      if (activeColor && inActiveColor) {
        if (activeColor === 'primary') {
          activeColor = '#2d7eff';
        }
        style.color = (name || this.index) === stateValue ? activeColor : inActiveColor;
      }
      const nodeData: VNodeData = {
        on: {
          ...$listeners,
          click: this.handleClick,
        },
        attrs: $attrs,
        props: {
          ...$props,
          textSize: 'xsm',
        },
        scopedSlots: $scopedSlots,
        style,
      };
      return h(
        Item,
        nodeData,
        transformSlotsContext($slots, this.$vnode.componentInstance),
      );
    },
  });
}


export default TabbarItemWrapper(EntryItem);
