import { defineComponent, props } from '../_utils/defineComponent';
import { NoticeBarProps, NoticeBarEvents, NoticeBarType, NoticeBarAction } from './types';
import { IconDef } from '../types';
import Icon from '../Icon';
import { CloseOutlined, ArrowRightSOutlined } from '@ohu-mobile/icons';
import { VNodeData } from 'vue/types/umd';

interface NoticeBarData {
  isShow: boolean;
  marqueeMoveDistance: number;
  marqueeWidth: number;
  marqueeContainerWidth: number;
  translateX: number | string;
  marqueeStyle: Partial<CSSStyleDeclaration>;
  getInitMarqueeStyle: () => Partial<CSSStyleDeclaration>;
}


export default defineComponent<NoticeBarProps, NoticeBarEvents, {}, NoticeBarData>('notice-bar').create({
  props: {
    text: String,
    icon: props<IconDef>(Object).optional,
    action: props.ofType<NoticeBarAction>().optional,
    type: props.ofType<NoticeBarType>().default('default'),
    multiline: props(Boolean).default(false),
    scrollable: props.ofType<Boolean | undefined>().optional,
    offset: props(String).default('100%'),
    delay: props(Number).default(1000),
    speed: props(Number).default(50),
  },
  data() {
    return {
      timeoutId: null as ReturnType<typeof setTimeout> | null,
      isShow: true,
      translateX: 0,
      marqueeMoveDistance: 0,
      marqueeWidth: 0,
      marqueeContainerWidth: 0,
      marqueeStyle: this.getInitMarqueeStyle(),
    };
  },
  computed: {
    isScroll() {
      if (this.scrollable !== undefined) return this.scrollable;
      return this.marqueeContainerWidth < this.marqueeWidth;
    },
    offsetLeft() {
      const match = this.offset.match(/(0|[^0]\d{0,1}|100)%?/);
      if (match && match[1]) {
        const value = +match[1];
        return value >= 0 && value <= 100 ? value : 0;
      }
      return 0;
    },
  },
  methods: {
    getInitMarqueeStyle() {
      return this.offset !== '100%' && !this.multiline
        ? { marginLeft: this.offset }
        : {};
    },
    handleAction(e: Event) {
      if (this.action === 'closable') {
        e.stopPropagation();
        this.isShow = false;
        this.$emit('close', e);
      }
    },
    setMarqueStyle(translateX?: number, duration?: number) {
      let translate = translateX !== undefined ? translateX : -this.marqueeWidth;
      const style: Partial<CSSStyleDeclaration> = {
        transitionTimingFunction: 'linear',
        transform: `translate3d(${translate}px, 0, 0)`,
        transitionDuration: duration === undefined
          ? `${this.marqueeMoveDistance / this.speed}s`
          : `${duration}s`,
      };
      this.marqueeStyle = style;
    },
    setMarqueeWidth() {
      const marquee = this.$refs.marquee as HTMLDivElement;
      const marqueeInner = this.$refs.marqueeInner as HTMLDivElement;
      if (!marqueeInner || !marquee) return;
      return {
        marqueeContainerWidth: marquee.clientWidth,
        marqueeWidth: marqueeInner.clientWidth,
      };
    },
    computeInitMoveDistance() {
      return this.marqueeContainerWidth * (this.offsetLeft / 100) + this.marqueeWidth;
    },
    initMarquee() {
      if (this.timeoutId) clearTimeout(this.timeoutId);
      Object.assign(this, this.setMarqueeWidth());
      if (!this.isScroll) return;
      this.marqueeMoveDistance = this.computeInitMoveDistance();
      this.timeoutId = setTimeout(() => {
        this.setMarqueStyle();
        this.timeoutId = null;
      }, this.delay);
      this.$on('hook:beforeDestroy', () => {
        this.timeoutId && clearTimeout(this.timeoutId);
      });
      this.$on('hook:activated', () => {
        this.resetMarquee();
      });
      this.$on('hook:deactivated', () => {
        this.timeoutId && clearTimeout(this.timeoutId);
      });
    },
    resetMarquee() {
      Object.assign(this, this.setMarqueeWidth());
      if (!this.isScroll) {
        return this.marqueeStyle = this.getInitMarqueeStyle();
      }
      this.marqueeMoveDistance = this.marqueeContainerWidth + this.marqueeWidth;
      this.setMarqueStyle(this.marqueeContainerWidth, 0);
      setTimeout(() => {
        this.setMarqueStyle();
      }, 300);
    },
  },
  mounted() {
    this.initMarquee();
  },
  render() {
    const {
      $slots, isShow,
      icon, action, multiline, type,
      isScroll, text,
    } = this;
    const root = this.root()
      .has([
        icon && 'icon',
        action && 'action',
      ])
      .is(type);
    const textNode: VNodeData = {
      ref: 'marquee',
      class: root.element('text')
        .is([
          multiline ? 'wrap' : 'inline',
          isScroll && 'scrollable',
        ]),
    };
    if (isScroll) {
      textNode.on = {
        transitionend: this.resetMarquee,
      };
    }
    return (
      <div v-show={isShow}
        class={root}
        onClick={(e) => this.$emit('click', e)}>
        {
          $slots.icon
            ? (
              <div class={root.element('icon')}>
                {$slots.icon}
              </div>
            )
            : (
              icon
              &&
              <div class={root.element('icon')}>
                <Icon type={icon} />
              </div>
            )
        }
        <div {...textNode}>
          <div ref="marqueeInner" style={this.marqueeStyle}>{text || $slots.default}</div>
        </div>
        {
          action
          &&
          <div role="button" class={root.element('action')} onClick={this.handleAction}>
            <Icon type={action === 'closable' ? CloseOutlined : ArrowRightSOutlined} />
          </div>
        }
      </div>
    );
  },
});
