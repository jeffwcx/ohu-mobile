import { defineComponent, props } from '../_utils/defineComponent';
import { TabsProps, TabsEvents, TabProps } from './types';
import Tabbar, { TabbarChangeEvent } from '../Tabbar';
import { getVNodesByName } from '../_utils/vnode';
import { $prefix, $colorTextBase } from '../_config/variables';
import Carousel from '../Carousel';
import { VNode, VNodeData } from 'vue/types/umd';
import Sticky from '../Sticky';

type K = { index: number, name?: string };

type NameMap = Record<string, number | K>;

export default defineComponent<TabsProps, TabsEvents>('tabs').create({
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    value: props(Number, String).default(0),
    border: props(Boolean).default(true),
    activeColor: props(String).default('primary'),
    inActiveColor: props(String).default($colorTextBase),
    hasIndicator: props(Boolean).default(true),
    indicatorWidth: props(Number, String).default(100),
    indicatorHeight: props(String).default('2px'),
    indicatorInverse: props(Boolean).default(false),
    vertical: props(Boolean).default(false),
    scroll: props(Boolean).default(false),
    canSwipe: props(Boolean).default(false),
    sticky: props(Boolean).default(false),
  },
  watch: {
    value(cur) {
      this.stateValue = cur;
    },
  },
  data() {
    return {
      stateValue: this.value,
    };
  },
  methods: {
    handleChange(key: number | string) {
      this.stateValue = key;
      this.$emit('change', this.stateValue);
    },
    handleTabbarChange(e: TabbarChangeEvent) {
      this.handleChange(e.name || e.index);
    },
    computeNameMap(children: VNode[]) {
      return children.reduce((acc, vnode, index) => {
        const props = vnode.componentOptions?.propsData as TabProps;
        if (props.name !== undefined) {
          acc['name' + props.name] = index;
        }
        acc[index] = {
          index,
          name: props.name
        };
        return acc;
      }, {} as NameMap);
    },
    getCarouselValue(map: NameMap, stateValue: string | number) {
      if (typeof stateValue === 'string') {
        const index = map['name' + stateValue] as number;
        return index;
      }
      const { index } = map[stateValue] as K;
      return index;
    },
    getNameByIndex(index: number, map: NameMap) {
      const k = map[index] as K;
      if (k.name !== undefined) return k.name;
      return index;
    },
    renderTabbar(children: VNode[], sticky?: boolean) {
      if (sticky) {
        return (
          <Sticky>{this.renderTabbar(children)}</Sticky>
        );
      }
      const { $slots } = this;
      const {
        value,
        ...tabbarProps
      } = this.$props as TabsProps;
      if (!$slots.default) return;
      const tabbarNodeData: VNodeData = {
        props: {
          value: this.stateValue,
          ...tabbarProps,
        },
        on: {
          change: this.handleTabbarChange,
        },
      };
      return (
        <Tabbar {...tabbarNodeData}>
          {
            children.map((vnode) => {
              const { title, ...tabbarItemProps } = vnode.componentOptions?.propsData as TabProps;
              return (
                <Tabbar.Item {...{ props: tabbarItemProps }}>{title}</Tabbar.Item>
              );
            })
          }
        </Tabbar>
      );
    },
  },
  render() {
    const root = this.root();
    const { $slots, sticky, stateValue } = this;
    let children = $slots.default
      ? getVNodesByName($slots.default, `${$prefix}tab`)
      : [];
    const map = this.computeNameMap(children);
    const carouselValue = this.getCarouselValue(map, stateValue);
    return (
      <div class={root}>
        {this.renderTabbar(children, sticky)}
        <div class={root.element('panels')}>
          <Carousel
            value={carouselValue}
            indicator={false}
            supportGesture={this.canSwipe}
            onChange={(e) => {
              const key = this.getNameByIndex(e.toIndex, map);
              this.handleChange(key);
            }}>
            {children}
          </Carousel>
        </div>
      </div>
    );
  },
});
