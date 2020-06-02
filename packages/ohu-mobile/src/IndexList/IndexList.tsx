import { defineAnc, props } from '../_utils/defineComponent';
import { IndexListProps, IndexListEvents, IndexListScopedSlots } from './types';
import List, { ListProps } from '../List';
import { isElementSticky } from '../_utils/bom';
import { VueInstance } from '../types';
import { $prefix } from '../_config/variables';
import { ClassOptions } from '../_utils/classHelper';


const createIndexList = defineAnc<IndexListProps, IndexListEvents, IndexListScopedSlots>('index-list');


export default createIndexList.create({
  props: {
    label: props(Boolean).default(true),
    enableIndex: props(Boolean).default(true),
    innerScroll: props(Boolean).default(false),
    indexes: props<(string | number)[]>(Array).optional,
    listProps: props.ofObject<ListProps>().optional,
    barClass: props.ofType<ClassOptions>().optional,
  },
  watch: {
    enableIndex(cur) {
      if (cur === true) {
        this.detectScollPosition();
      } else {
        this.cleanScroll();
      }
    }
  },
  computed: {
    currentGroup() {
      const map = this.indexMap as Record<string | number, VueInstance>;
      const index = this.enterIndex as string | number | null;
      if (index !== null) {
        return map[index];
      }
    },
    scroller() {
      if (this.innerScroll) {
        const list = this.$refs.list as any;
        if (list) {
          return list.$el as Element;
        }
      }
      return window;
    },
  },
  data() {
    return {
      children: [] as VueInstance[],
      indexMap: {} as Record<string | number, VueInstance>,
      enterIndex: null as string | number | null,
      observer: null as IntersectionObserver | null,
      pressed: false,
      currentSwipeY: -1,
      handler: null as null | (() => void),
    };
  },
  methods: {
    removeGroup(group: VueInstance) {
      const index = this.children.indexOf(group);
      if (index >= 0) {
        this.children.splice(index, 1);
        delete this.indexMap[group.$props.index];
      }
    },
    addGroup(group: VueInstance) {
      this.children.push(group);
      this.indexMap[group.$props.index] = group;
    },
    handleIndexBarMouseDown(e: MouseEvent) {
      e.preventDefault();
      this.pressed = true;
      this.scrollByPostion(e.clientY);
    },
    handleIndexBarMouseMove(e: MouseEvent) {
      e.preventDefault();
      if (!this.pressed) return;
      this.scrollByPostion(e.clientY);
    },
    handleIndexBarTouchStart(e: TouchEvent) {
      e.preventDefault();
      this.pressed = true;
      const touch = e.touches[0];
      this.scrollByPostion(touch.clientY);
    },
    handleIndexBarTouchMove(e: TouchEvent) {
      e.preventDefault();
      if (!this.pressed) return;
      const touch = e.touches[0];
      this.scrollByPostion(touch.clientY);
    },
    handleIndexBarEventEnd(e: Event) {
      e.preventDefault();
      this.pressed = false;
      this.currentSwipeY = -1;
    },
    scrollByPostion(y: number) {
      const result = this.meetIndex(y);
      if (result !== undefined) {
        const { index, offsetY } = result;
        if (index === undefined) return;
        this.currentSwipeY = offsetY;
        this.scrollToIndex(index);
      } else {
        this.currentSwipeY = -1;
      }
    },
    // ↓ open api
    scrollToIndex(index: number | string) {
      const group = this.getGroup(index);
      if (!group) return;
      this.enterIndex = index;
      if (this.currentGroup) {
        this.$emit('select', { index, group: this.currentGroup.$props });
        this.currentGroup.$el.scrollIntoView();
      }
    },
    // ↑ open api
    meetIndex(touchTop: number) {
      const indexBar = this.$refs.indexBar as Element;
      if (!indexBar) return;
      const indexBarItems = indexBar.querySelectorAll('li');
      const items = [...indexBarItems];
      let currentOffsetY = -1;
      const indexBarRect = indexBar.getBoundingClientRect();
      const meetEl = items.find((node, index) => {
        const { top, bottom, height } = node.getBoundingClientRect();
        currentOffsetY = (top - indexBarRect.top) + height / 2;
        if (index === 0 && touchTop < top) {
          return true;
        }
        if (index === items.length - 1 && touchTop > bottom) {
          return true;
        }
        return (touchTop >= top && touchTop < bottom);
      });
      if (meetEl && meetEl.dataset.index) {
        const dataIndex = meetEl.dataset.index;
        const group = this.getGroup(dataIndex);
        return {
          index: group.$props.index,
          offsetY: currentOffsetY,
        };
      }
    },
    meetGroup() {
      const group = this.children.find((item) => {
        return isElementSticky(this.scroller, item.$el)
      });
      if (group) {
        return group.$props.index;
      }
    },
    cleanScroll() {
      if (this.handler) {
        this.scroller.removeEventListener('scroll', this.handler);
        this.handler = null;
      }
    },
    detectScollPosition() {
      this.cleanScroll();
      const handler = () => {
        const groupIndex = this.meetGroup();
        if (groupIndex && !this.pressed) {
          this.enterIndex = groupIndex;
        }
      };
      this.handler = handler;
      handler();
      this.scroller.addEventListener('scroll', handler);
      this.$once('hook:beforeDestroyed', () => {
        this.cleanScroll();
      });
    },
    getGroup(index: string | number) {
      return this.indexMap[index];
    },
    renderAnchor(index: string | number) {
      let isEnter = index === this.enterIndex;
      const group = this.getGroup(index) || {};
      return (
        <li key={index} data-index={index} class={{
          'is-active': isEnter,
          'is-pressed': this.pressed && isEnter,
        }}>
          <span>
            {
              this.$scopedSlots.anchor
                ? this.$scopedSlots.anchor({
                  pressed: this.pressed,
                  active: isEnter,
                  ...group.$props,
                })
                : index
            }
          </span>
        </li>
      );
    },
  },
  mounted() {
    if (this.enableIndex) {
      this.detectScollPosition();
    }
  },
  render() {
    const root= this.root();
    const {
      $slots,
      currentSwipeY,
    } = this;
    const {
      label,
      listProps,
    } = this.$props as IndexListProps;
    const indexBar = root.element('bar');
    if (!this.innerScroll) {
      indexBar.is('fixed');
    }
    if (this.barClass) {
      indexBar.addClasses(this.barClass);
    }
    const labelStyle = {
      transform: `translate(-100%, ${currentSwipeY}px)`,
    };
    return (
      <div class={root}>
        <List { ...{
          props: listProps,
          class: { 'is-scroll': this.innerScroll },
          ref: 'list',
        } }>
          {$slots.default}
        </List>
        <transition name={`${$prefix}slide-right`}>
          {
            this.enableIndex
            &&
            <div class={indexBar}
              ref="indexBar"
              onTouchstart={this.handleIndexBarTouchStart}
              onTouchmove={this.handleIndexBarTouchMove}
              onTouchend={this.handleIndexBarEventEnd}
              onMousedown={this.handleIndexBarMouseDown}
              onMousemove={this.handleIndexBarMouseMove}
              onMouseup={this.handleIndexBarEventEnd}>
              <ul>
                {
                  this.indexes instanceof Array
                    ? this.indexes.map((index) => {
                      return this.renderAnchor(index);
                    })
                    : this.children.map((item) => {
                      let { index } = item.$props;
                      return this.renderAnchor(index);
                    })
                }
              </ul>
              {
                label && this.pressed && this.currentSwipeY >= 0 && this.currentGroup
                &&
                <div style={labelStyle} class={indexBar.element('label')}>
                  {
                    this.$scopedSlots.label
                      ? this.$scopedSlots.label(this.currentGroup.$props)
                      : <span>{this.currentGroup.$props.title || this.enterIndex}</span>
                  }
                </div>
              }
            </div>
          }
        </transition>
      </div>
    );
  }
});
