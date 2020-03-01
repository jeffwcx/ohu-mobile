import { CarouselChangeEvent, CarouselEvents, CarouselProps } from './types';
import { defineComponent, props } from '../_utils/defineComponent';
import Stage, { stageProps } from './Stage';
import debounce from '../_utils/debounce';

const Carousel = defineComponent<CarouselProps, CarouselEvents>('carousel').create({
  props: {
    autoplay: props(Boolean).default(false),
    interval: props(Number).default(3000),
    indicator: props(Boolean).default(true),
    indicatorDarkMode: props(Boolean).default(false),
    width: String,
    height: String,
    ...stageProps,
  },
  computed: {
    stage() {
      return this.$refs.stage as InstanceType<typeof Stage>;
    },
  },
  data() {
    return {
      timer: null as NodeJS.Timeout | null,
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
      this.timer = setInterval(() => {
        this.next();
      }, this.interval);
      this.$once('hook:beforeDestroy', () => {
        this.timer && clearTimeout(this.timer);
      });
    },
    stopPlay() {
      if (!this.autoplay) return;
      this.timer && clearTimeout(this.timer);
    },
    handleResize() {
      const handler = debounce(() => {
        this?.stage?.init();
      }, 500);
      window.addEventListener('resize', handler);
      this.$once('hook:beforeDestroy', () => {
        window.removeEventListener('resize', handler);
      });
    },
  },
  mounted() {
    this.startPlay();
    this.handleResize();
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
                    new Array(steps)
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
