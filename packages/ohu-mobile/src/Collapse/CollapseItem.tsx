import { defineDescendantComponent, props } from '../_utils/defineComponent';
import { CollapseItemProps, CollapseItemEvents } from './types';
import Collapse from './Collapse';
import Icon from '../Icon';
import Divider from '../Divider';
import animate from '../_utils/animate';
import { easeOutQuint } from '../_utils/easing';
import { LoaderTailOutlined } from '@ohu-mobile/icons';
import { CSSProperties } from 'vue';

export interface CollapseItemMethods {
  expandState: boolean;
  getExpandState: () => boolean;
  handleHeaderClick: (expand: boolean) => void;
  beforeContentEnter: (el: HTMLElement) => void;
  contentLeave: (el: HTMLElement, done: () => void) => void;
}

export default defineDescendantComponent<
  InstanceType<typeof Collapse>,
  CollapseItemProps,
  CollapseItemEvents,
  {},
  CollapseItemMethods
>('collapse', 'collapse-item').create({
  props: {
    title: props(String).default(''),
    hasList: props(Boolean).default(false),
    disabled: props(Boolean).default(false),
    loading: props(Boolean).default(false),
  },
  computed: {
    expandState() {
      return this.getExpandState();
    },
  },
  data() {
    return {
      startHeight: -1,
      contentHeight: -1,
    };
  },
  methods: {
    getExpandState() {
      if (this.disabled) return false;
      const key = this.$vnode.key;
      const value = this.ancestor.state;
      if (!key || !value) return false;
      return value instanceof Array
        ? value.indexOf(key as string | number) >= 0
        : value === key;
    },
    handleHeaderClick(expandState: boolean) {
      if (this.loading) return;
      if (this.disabled) return;
      const key = this.$vnode.key;
      if (key) {
        this.ancestor.itemChange(key as string | number, !expandState);
      }
      if (this.expandState) {
        this.$emit('expand', key);
      } else {
        this.$emit('shrink', key);
      }
    },
    beforeContentEnter(el: HTMLElement) {
      el.style.height = 'auto';
      this.$nextTick(() => {
        animate(el, {
          timingFunction: easeOutQuint,
          duration: 300,
          done: () => {
            el.style.height = '';
            this.$emit('expanded');
          },
          props: {
            height: [0, el.offsetHeight],
          },
        });
      });
    },
    contentLeave(el: HTMLElement, done: () => void) {
      el.style.height = `${el.offsetHeight}px`;
      animate(el, {
        timingFunction: easeOutQuint,
        duration: 300,
        done: () => {
          el.style.height = '';
          this.$emit('shrinked');
          done();
        },
        props: {
          height: 0,
        },
      });
    },
  },
  render() {
    const { $slots, title, ancestor, expandState, hasList, disabled } = this;
    const root = this.$rootCls();
    const header = root.element('header');
    const content = root.element('content');
    const contentStyle: CSSProperties = {};
    if (!expandState) {
      contentStyle.display = 'none';
      contentStyle.height = '0';
    }
    return (
      <div class={root.is([expandState && 'expand', disabled && 'disabled'])}>
        <div
          class={header.is([
            ancestor.expandIcon ? ancestor.expandIconPosition : '',
          ])}
          role="button"
          tabindex={-1}
          aria-expanded={expandState}
          onClick={() => this.handleHeaderClick(expandState)}
        >
          <div class={header.element('text')}>{$slots.title || title}</div>
          {ancestor.expandIcon && !this.loading && (
            <div class={header.element('icon').is([expandState && 'expand'])}>
              <Icon type={ancestor.expandIcon}></Icon>
            </div>
          )}
          {this.loading && (
            <div class={header.element('icon')}>
              <Icon type={LoaderTailOutlined} spin></Icon>
            </div>
          )}
        </div>
        <transition
          css={false}
          onBeforeEnter={(el) => this.beforeContentEnter(el as HTMLElement)}
          onLeave={(el, done) => this.contentLeave(el as HTMLElement, done)}
        >
          <div class={content} v-show={expandState}>
            <Divider />
            <div class={content.element('inner').has([hasList && 'list'])}>
              {$slots.default}
            </div>
          </div>
        </transition>
      </div>
    );
  },
});
