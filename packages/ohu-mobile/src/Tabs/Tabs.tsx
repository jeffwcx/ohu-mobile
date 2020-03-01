import { defineComponent, props } from '../_utils/defineComponent';
import { TabsProps, TabsEvents, TabProps } from './types';
import Tabbar, { TabbarChangeEvent } from '../Tabbar';
import { getVNodesByName } from '../_utils/vnode';
import { $prefix, $colorTextBase } from '../_config/variables';
import Carousel from '../Carousel';
import { VNodeData } from 'vue/types/umd';
import Sticky from '../Sticky';


export default defineComponent<TabsProps, TabsEvents>('tabs').create({
  props: {
    value: props(Number).default(0),
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
    handleChange(index: number) {
      this.stateValue = index;
      this.$emit('input', this.stateValue);
    },
  },
  render() {
    const root = this.root();
    const { $slots } = this;
    const {
      value,
      sticky,
      ...tabbarProps
    } = this.$props;
    let tabbar;
    let children;
    if ($slots.default) {
      children = getVNodesByName($slots.default, `${$prefix}tab`);
      const tabbarNodeData: VNodeData = {
        props: {
          value: this.stateValue,
          ...tabbarProps,
        },
        on: {
          change: (e: TabbarChangeEvent) => {
            this.handleChange(e.index);
          },
        },
      };
      tabbar = (
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
    }
    if (sticky) {
      tabbar = (
        <Sticky>{tabbar}</Sticky>
      );
    }
    return (
      <div class={root}>
        {tabbar}
        <div class={root.element('panels')}>
          <Carousel
            value={this.stateValue}
            onInput={this.handleChange}
            indicator={false} supportGesture={this.canSwipe}>
            {children}
          </Carousel>
        </div>
      </div>
    );
  },
});
