import { tabbarBaseName } from './Tabbar';
import EntryItem from '../EntryItem';
import { entryItemProps } from '../EntryItem/EntryItem';
import { VNodeData } from 'vue';
import { transformSlotsContext, isTargetComponent } from '../_utils/vnode';
import { TabbarItemEvents, TabbarItemProps } from './types';
import { $colorPrimary } from '../_config/variables';
import { defineComponent, props } from '../_utils/defineComponent';

const TabbarItemWrapper = function(Item: typeof EntryItem) {
  return defineComponent<TabbarItemProps ,TabbarItemEvents>('tabbar-item').create({
    props: {
      ...entryItemProps,
      name: props<string, number>(String, Number).optional,
    },
    computed: {
      index() {
        return this.$parent.$children.indexOf(this);
      },
    },
    methods: {
      handleClick() {
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
          activeColor = $colorPrimary;
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
