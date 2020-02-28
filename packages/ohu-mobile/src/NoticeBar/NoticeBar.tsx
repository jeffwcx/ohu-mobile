import { defineComponent, props } from '../_utils/defineComponent';
import { NoticeBarProps, NoticeBarEvents, NoticeBarType, NoticeBarAction } from './types';
import { IconDef } from '../types';
import Icon from '../Icon';
import { CloseOutlined, ArrowRightSOutlined } from '@ohu-mobile/icons';
import { VNodeData } from 'vue/types/umd';


export default defineComponent<NoticeBarProps, NoticeBarEvents>('notice-bar').create({
  props: {
    text: String,
    icon: props<IconDef>(Object).optional,
    action: props.ofType<NoticeBarAction>().optional,
    type: props.ofType<NoticeBarType>().default('default'),
    multiline: props(Boolean).default(false),
    timeout: props(Number).default(-1),
    scrollable: props(Boolean).default(false),
    delay: props(Number).default(1000),
    speed: props(Number).default(50),
  },
  data() {
    return {
      isShow: true,
      animationDuration: -1,
    };
  },
  methods: {
    handleAction() {
      if (this.action === 'closable') {
        this.isShow = false;
        this.$emit('close');
      }
    },
    computeAnimationDuration() {
      const marquee = this.$refs.marquee as HTMLDivElement;
      this.animationDuration = (marquee.clientWidth) / this.speed;
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.computeAnimationDuration();
    });
  },
  render() {
    const root = this.root();
    const { $slots, isShow,
      icon, action, multiline, type,
      scrollable, text, delay, animationDuration,
    } = this;
    const textNode: VNodeData = {
      class: root.element('text')
        .is([!multiline && 'inline', scrollable && 'scrollable']),
    };
    let innerStyle: Partial<CSSStyleDeclaration> = {};
    if (scrollable) {
      textNode.attrs = {
        role: 'marquee',
      };
      innerStyle.animationDelay = `${delay}ms`;
      if (this.animationDuration > 0) {
        innerStyle.animationDuration = `${animationDuration}s`;
      }
    }
    return (
      <div v-show={isShow}
        class={root.has([
          icon && 'icon',
          action && 'action',
        ]).is(type)}
        onClick={(e) => this.$emit('click', e)}>
        {
          $slots.icon
            ?
            <div class={root.element('icon')}>
              {$slots.icon}
            </div>
            : (
              icon
              &&
              <div class={root.element('icon')}><Icon type={icon} /></div>
            )
        }
        <div {...textNode}>
          <div ref="marquee" style={innerStyle}>{text || $slots.default}</div>
        </div>
        {
          action
          &&
          <div class={root.element('action')} onClick={this.handleAction}>
            <Icon type={action === 'closable' ? CloseOutlined : ArrowRightSOutlined} />
          </div>
        }
      </div>
    );
  },
});
