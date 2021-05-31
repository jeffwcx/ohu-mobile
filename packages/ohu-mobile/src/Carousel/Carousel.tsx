import { CarouselChangeEvent, CarouselEvents, CarouselProps } from './types';
import { defineComponent, props } from '../_utils/defineComponent';
import Stage, { stageProps } from './Stage';
import debounce from '../_utils/debounce';
import bindEvent from '../_utils/bindEvent';

const Carousel = defineComponent<CarouselProps, CarouselEvents>('carousel').create({
  props: {
    autoplay: props(Boolean).default(false),
    interval: props(Number).default(3000),
    indicator: props(Boolean).default(true),
    indicatorDarkMode: props(Boolean).default(false),
    width: String,
    height: String,
    resize: props(Boolean).default(false),
    ...stageProps,
  },
  computed: {
    stage() {
      return this.$refs.stage as InstanceType<typeof Stage>;
    },
  },
  watch: {
    autoplay(cur) {
      cur === true && this.startPlay();
    },
    resize(cur) {
      cur === true && this.handleResize();
    }
  },
  data() {
    return {
      timer: null as NodeJS.Timeout | null,
      frozen: false,
    };
  },
  methods: {
    goTo(index: number) {
      this.stage.goTo(index);
    },
    prev() {
      this.stage.prev();
    },
    next() {
      this.stage.next(this.autoplay);
    },
    startPlay() {
      if (!this.autoplay) return;
      this.stopPlay();
      this.timer = setInterval(() => {
        this.next();
      }, this.interval);
      this.$once('hook:beforeDestroy', () => {
        this.timer && clearTimeout(this.timer);
      });
      // when use keepAlive
      this.$once('hook:activated', () => {
        if (this.timer) return;
        this.startPlay();
        this.frozen = false;
      });

      this.$once('hook:deactivated', () => {
        this.stopPlay();
        this.frozen = true;
      });

    },
    stopPlay() {
      if (!this.autoplay) return;
      this.timer && clearTimeout(this.timer);
      this.timer = null;
    },
    relayout() {
      this.stopPlay();
      this.stage?.init();
      this.startPlay();
    },
    handleResize() {
      const handler = debounce(() => {
        if (this.frozen) return;
        this.relayout();
      }, 500);
      bindEvent(this, 'resize', handler);
    },
    handleVisibleChange() {
      const handler = () => {
        if (this.frozen) return;
        if (document.hidden) {
          this.stopPlay();
        } else {
          this.startPlay();
        }
      };
      bindEvent(this, 'visibilitychange' as keyof WindowEventMap, handler);
    },
  },
  mounted() {
    this.startPlay();
    if (this.resize) {
      this.handleResize();
    }
    this.handleVisibleChange();
  },
  render() {
    const root = this.root();
    const indicatorClass = root.element('indicator');
    const { $slots, direction } = this;
    const {
      width,
      height,
      indicatorDarkMode,
      autoplay,
      indicator,
      mode,
      interval,
      ...stageProps
    } = this.$props;
    return (
      <div class={root}
        style={{ height, width }}>
        <Stage {...{
          props: stageProps,
          scopedSlots: {
            indicator: ({ steps, stepIndex }) => {
              if (!this.indicator) {
                return;
              }
              return (
                <div class={indicatorClass.is(direction)}>
                  {
                    Array(steps)
                      .fill(0)
                      .map((_, index) => {
                        const dot = indicatorClass.element('dot');
                        dot.is([
                          stepIndex === index && 'active',
                          indicatorDarkMode && 'dark',
                        ]);
                        return (
                          <span class={dot}
                            tabindex={0}
                            role="button"
                            onClick={() => {
                              this.goTo(index);
                            }}>
                          </span>
                        );
                      })
                  }
                </div>
              );
            },
          },
          on: {
            change: (e: CarouselChangeEvent) => {
              this.$emit('input', e.to);
              this.$emit('change', e);
            },
          },
          ref: 'stage'
        }}
        >
          {$slots.default}
        </Stage>
      </div>
    );
  },
});

export default Carousel;
