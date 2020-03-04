import { defineDescendantComponent, props } from '../_utils/defineComponent';
import { CollapseItemProps, CollapseItemEvents } from './types';
import Collapse from './Collapse';
import Icon from '../Icon';
import Divider from '../Divider';
import animate from '../_utils/animate';
import { easeOutQuint } from '../_utils/easing';

interface CollapseItemMethods {
  getExpandState: () => boolean;
}

export default defineDescendantComponent<InstanceType<typeof Collapse>, CollapseItemProps, CollapseItemEvents, {}, CollapseItemMethods>(
  'collapse',
  'collapse-item'
).create({
  props: {
    title: props(String).default(''),
    hasList: props(Boolean).default(false),
    disabled: props(Boolean).default(false),
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
      return value instanceof Array ? value.indexOf(key) >= 0 : value === key;
    },
    handleHeaderClick(expandState: boolean) {
      if (this.disabled) return;
      const key = this.$vnode.key;
      if (key) {
        this.ancestor.itemChange(key, !expandState);
      }
      if (this.expandState) {
        this.$emit('expand');
      } else {
        this.$emit('shrink');
      }
    },
    beforeContentEnter(el: HTMLElement) {
      el.style.height = 'auto';
      this.$nextTick(() => {
        animate(el, {
          timingFunction: easeOutQuint,
          duration: 300,
          done() {
            el.style.height = '';
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
    const root = this.root();
    const header = root.element('header');
    const content = root.element('content');
    const contentStyle: Partial<CSSStyleDeclaration> = {};
    if (!expandState) {
      contentStyle.display = 'none';
      contentStyle.height = '0';
    }
    return (
      <div class={root.is([expandState && 'expand', disabled && 'disabled' ])}>
        <div
          class={header.is([ancestor.expandIcon ? ancestor.expandIconPosition : ''])}
          role="button"
          tabindex={-1}
          aria-expanded={expandState}
          onClick={() => this.handleHeaderClick(expandState)}>
          <div class={header.element('text')}>
            {$slots.title || title}
          </div>
          {
            ancestor.expandIcon
            &&
            <div class={header.element('icon')}>
              <Icon type={ancestor.expandIcon}></Icon>
            </div>
          }
        </div>
        <transition
          css={false}
          onBeforeEnter={(el) => this.beforeContentEnter(el as HTMLElement)}
          onLeave={(el, done) => this.contentLeave(el as HTMLElement, done)}>
          <div class={content} v-show={expandState}>
            <Divider />
            <div class={content.element('inner').has([ hasList && 'list' ])}>{$slots.default}</div>
          </div>
        </transition>
      </div>
    );
  },
});
