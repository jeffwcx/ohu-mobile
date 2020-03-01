import EntryItem from '../EntryItem';
import { entryItemProps } from '../EntryItem/EntryItem';
import { VNodeData } from 'vue';
import { transformSlotsContext } from '../_utils/vnode';
import { TabbarItemEvents, TabbarItemProps } from './types';
import { $colorPrimary } from '../_config/variables';
import { defineComponent, props } from '../_utils/defineComponent';
import Tabbar from './Tabbar';


const TabbarItemWrapper = function(Item: typeof EntryItem) {
  return defineComponent<TabbarItemProps ,TabbarItemEvents, {}, { index: number }>('tabbar-item').create({
    props: {
      ...entryItemProps,
      name: props<string, number>(String, Number).optional,
    },
    computed: {
      index() {
        return this.$parent.$children.indexOf(this);
      },
      selfKey() {
        return this.name || this.index;
      },
    },
    methods: {
      handleClick() {
        const parent = this.$parent as any;
        if (this.$parent.constructor === Tabbar) {
          parent.onChange(this.selfKey, this.index, this.name);
          this.$nextTick(() => {
            parent.scrollIntoCenter();
          });
        }
      },
    },
    render(h) {
      const {
        $props, $slots, $scopedSlots, $attrs, $listeners,
        icon, text,
      } = this;
      const style: Partial<CSSStyleDeclaration> = {};
      let { activeColor, inActiveColor, stateValue } = this.$parent as any;
      if (activeColor && inActiveColor) {
        if (activeColor === 'primary') {
          activeColor = $colorPrimary;
        }
        style.color = (this.selfKey) === stateValue ? activeColor : inActiveColor;
      }

      const nodeData: VNodeData = {
        class: (!!(icon && (text || $slots.default))) && 'has-padding',
        on: {
          ...$listeners,
          click: this.handleClick,
        },
        attrs: $attrs,
        props: {
          ...$props,
          textSize: icon ? 'xsm' : 'sm',
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
