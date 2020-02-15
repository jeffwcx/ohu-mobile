import { defineComponent, props } from '../_utils/defineComponent';
import Button from '../Button';
import { ActionBarProps, ActionBarEvents, ActionOption } from './types';
import Bottom from '../Bottom';
import Divider from '../Divider';
import { $prefix } from '../_config/variables';


export default defineComponent<ActionBarProps, ActionBarEvents>('action-bar').create({
  props: {
    visible: props(Boolean).default(true),
    actions: props<ActionOption[]>(Array).default(() => []),
    toolbar: props(Boolean).default(false),
    divider: props(Boolean).default(true),
  },
  watch: {
    visible(val) {
      this.state = val;
    }
  },
  data() {
    return {
      state: this.visible,
    };
  },
  methods: {
    getActions() {
      return this.actions.map((actionOption) => {
        const {
          text,
          onClick,
          ...props
        } = actionOption;
        if (this.toolbar) {
          props.size = 'md';
        }
        return (
          <Button {...{
            props,
            on: {
              click: (e: Event) => {
                this.$emit('click', actionOption);
                if (onClick) onClick(e);
              },
            },
          }}>{text}</Button>
        );
      });
    },
  },
  render() {
    const { $slots, divider, toolbar, visible } = this;
    const root = this.root();
    return (
      <transition name={`${$prefix}slide-down`}>
        <Bottom v-show={visible} class={root.block('wrapper')}>
          { divider && <Divider /> }
          <div class={root.is([toolbar ? 'toolbar' : 'normal'])}>
            {
              $slots.default
              &&
              <div class={root.element('text')}>{$slots.default}</div>
            }
            {this.getActions()}
          </div>
        </Bottom>
      </transition>
    );
  },
});
