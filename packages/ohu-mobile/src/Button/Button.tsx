import { componentFactoryOf } from 'vue-tsx-support';
import { prefix } from '../_utils/shared';
import props from 'vue-strict-prop';
import { VNodeData } from 'vue';
import Icon from '../Icon';
import { IconDef } from '../types';
import { ButtonEvents } from './types';
import './styles/index.scss';

const baseBtnCls = `${prefix}btn`;

const Button = componentFactoryOf<ButtonEvents>().create({
  name: `${prefix}button`,
  props: {
    type: props.ofStringLiterals('default', 'primary', 'link', 'translucent').default('default'),
    plain: props(Boolean).default(false),
    size: props.ofStringLiterals('sm', 'md', 'lg').default('lg'),
    loading: props(Boolean).default(false),
    disabled: props(Boolean).default(false),
    inline: props(Boolean).default(false),
    icon: props<string, IconDef>(String, Object).optional,
    round: props(Boolean).default(false),
  },
  computed: {
    cls() {
      const clsMap: { [key: string]: boolean } = {
        [baseBtnCls]: true,
        'is-round': this.round,
        'is-primary': this.type === 'primary',
        'is-translucent': this.type === 'translucent',
        'is-link': this.type === 'link',
        'is-sm': this.size === 'sm',
        'is-md': this.size === 'md',
        'is-inline': this.inline,
        'is-block': !this.inline && this.size === 'lg',
        'is-plain': this.plain,
        'is-loading': this.loading,
        'is-icon-only': (!this.$slots.default && !!this.icon),
      };
      return clsMap;
    },
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
      cls,
      icon,
      loading,
      $attrs,
      $slots,
    } = this;
    if (loading) {
      icon = 'loader-tail';
    }
    const buttonProps: VNodeData = {
      attrs: {
        ...$attrs,
        role: 'button',
        disabled,
      },
      on: {
        click: this.onClick,
        touchstart: this.onTouchstart,
      },
      class: cls,
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
