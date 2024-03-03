import type { CSSProperties, VNodeData } from 'vue';
import { TabbarEvents, TabbarProps } from './types';
import { $colorTextBase } from '../_config/variables';
import { defineComponent, props } from '../_utils/defineComponent';
import scrollIntoCenter, {
  ScrollToTargetPosition,
} from '../_utils/scrollIntoCenter';
import debounce from '../_utils/debounce';
import bindEvent from '../_utils/bindEvent';

export interface SimpleRect {
  key: string | number;
  width: number;
  height: number;
}

const Tabbar = defineComponent<TabbarProps, TabbarEvents>('tabbar').create({
  props: {
    value: props(String, Number).optional,
    border: props(Boolean).default(true),
    activeColor: props(String).default('primary'),
    inActiveColor: props(String).default($colorTextBase),
    hasIndicator: props(Boolean).default(false),
    indicatorWidth: props(Number, String).default(100),
    indicatorHeight: props(String).default('2px'),
    indicatorInverse: props(Boolean).default(false),
    vertical: props(Boolean).default(false),
    scroll: props(Boolean).default(false),
  },
  data() {
    return {
      stateValue: this.value,
      childrenRects: [] as SimpleRect[],
      indicatorPositions: {} as Record<string | number, ScrollToTargetPosition>,
    };
  },
  watch: {
    value(changedValue) {
      this.stateValue = changedValue;
    },
    indicatorWidth() {
      this.relayout();
    },
  },
  methods: {
    scrollIntoCenter() {
      if (this.scroll && this.stateValue) {
        let indicatorPos = this.indicatorPositions[this.stateValue];
        if (indicatorPos) {
          scrollIntoCenter(this.$el, indicatorPos, this.vertical);
        }
      }
    },
    onChange(key: string | number, index: number, name?: string | number) {
      this.stateValue = key;
      this.$emit('change', { key, index, name });
      this.$emit('input', this.stateValue);
    },
    computeChildrenRect() {
      this.childrenRects = this.$children.map((child) => {
        const el = child.$el;
        const { width, height } = el.getBoundingClientRect();
        return {
          key: (child as any).selfKey,
          width,
          height,
        };
      });
    },
    computeIndicator() {
      let currentPosition = 0;
      this.indicatorPositions = this.childrenRects.reduce(
        (prev, rect) => {
          let size = this.vertical ? rect.height : rect.width;
          let indicatorWidth: number = 0;
          if (typeof this.indicatorWidth === 'number') {
            indicatorWidth = (size * this.indicatorWidth) / 100;
          } else {
            indicatorWidth = parseInt(this.indicatorWidth);
          }
          const indicatorLeft = (size - indicatorWidth) / 2;
          const offset = indicatorLeft + currentPosition;
          currentPosition += size;
          if (rect.key === undefined) return prev;
          if (prev[rect.key.toString()]) return prev;
          prev[rect.key.toString()] = {
            size: indicatorWidth,
            offset,
          };
          return prev;
        },
        {} as Record<string | number, ScrollToTargetPosition>,
      );
    },
    relayout() {
      this.computeChildrenRect();
      this.computeIndicator();
      this.scrollIntoCenter();
    },
    handleResize() {
      const handler = debounce(() => {
        this.relayout();
      }, 500);
      bindEvent(this, 'resize', handler);
    },
  },
  mounted() {
    if (this.hasIndicator || this.scroll) {
      this.relayout();
      this.handleResize();
    }
  },
  render() {
    const root = this.$rootCls();
    const {
      $slots,
      $attrs,
      inActiveColor,
      border,
      hasIndicator,
      indicatorHeight,
      activeColor,
      vertical,
      indicatorInverse,
      scroll,
    } = this;
    const tabbarProps: VNodeData = {
      attrs: $attrs,
      class: root
        .has([border && 'border', hasIndicator && 'indicator'])
        .addClasses([!hasIndicator && 'no-indicator'])
        .is([
          vertical ? 'vertical' : 'horizontal',
          scroll && 'scroll',
          !indicatorInverse ? 'indicator-normal' : 'indicator-inverse',
        ]),
      style: {
        color: inActiveColor,
      },
    };
    const indicatorStyle: CSSProperties = {};
    if (activeColor) {
      indicatorStyle.background = activeColor;
    }
    if (hasIndicator && this.stateValue !== undefined) {
      let indicatorPos = this.indicatorPositions[this.stateValue];
      if (indicatorPos) {
        if (this.vertical) {
          indicatorStyle.width = indicatorHeight;
          indicatorStyle.height = `${indicatorPos.size}px`;
          indicatorStyle.transform = `translateY(${indicatorPos.offset}px)`;
        } else {
          indicatorStyle.width = `${indicatorPos.size}px`;
          indicatorStyle.height = indicatorHeight;
          indicatorStyle.transform = `translateX(${indicatorPos.offset}px)`;
        }
      }
    }
    return (
      <div {...tabbarProps}>
        {$slots.default}
        {hasIndicator && (
          <span class={root.element('indicator')} style={indicatorStyle} />
        )}
      </div>
    );
  },
});

export default Tabbar;
