import { VNodeData } from 'vue';
import Icon from '../Icon';
import { IconDef } from '../types';
import { ButtonEvents, ButtonProps, ButtonTypes, ButtonSizes } from './types';
import { LoaderTailOutlined } from '@ohu-mobile/icons';
import { defineComponent, props } from '../_utils/defineComponent';


const Button = defineComponent<ButtonProps, ButtonEvents>('btn').create({
  props: {
    type: props.ofType<ButtonTypes>().default('default'),
    plain: props(Boolean).default(false),
    size: props.ofType<ButtonSizes>().default('lg'),
    loading: props(Boolean).default(false),
    disabled: props(Boolean).default(false),
    inline: props(Boolean).default(false),
    icon: props<string, IconDef>(String, Object).optional,
    round: props(Boolean).default(false),
    link: props(Boolean).default(false),
    tabindex: props(Number).default(0),
  },
  methods: {
    onClick(e: Event) {
      if (!this.disabled) {
        this.$emit('click', e);
      }
    },
    onTouchstart(e: TouchEvent) {
      this.$emit('touchstart', e);
    }
  },
  render() {
    let {
      disabled,
      icon,
      loading,
      tabindex,
      $attrs,
      $slots,
    } = this;
    if (loading) {
      icon = LoaderTailOutlined;
    }
    const root = this.root();
    root.is([
      this.round && 'round',
      this.type,
      this.link && 'link',
      this.size,
      this.inline && 'inline',
      (!this.inline && this.size === 'lg') && 'block',
      this.plain && 'plain',
      this.loading && 'loading',
      (!this.$slots.default && !!this.icon) && 'icon-only',
    ]);
    const buttonProps: VNodeData = {
      attrs: {
        ...$attrs,
        role: 'button',
        disabled,
        tabindex,
        // fix 'Form submission canceled because the form is not connected'
        type: 'button',
      },
      on: {
        click: this.onClick,
        touchstart: this.onTouchstart,
      },
      class: root,
    };
    return (
      <button {...buttonProps}>
        { icon && <i><Icon type={icon} spin={loading}></Icon></i> }
        {
          icon ? ($slots.default ? <span>{$slots.default}</span> : '') : $slots.default
        }
      </button>
    );
  },
});

export default Button;
