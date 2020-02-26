import Button from '../Button';
import { CloseOutlined } from '@ohu-mobile/icons';
import { defineComponent, props } from '../_utils/defineComponent';
import { PopupHeaderProps, PopupHeaderEvents } from './types';
import localeMixin from '../_utils/localeMixin';
import { IconDef } from '../types';

export default defineComponent<PopupHeaderProps, PopupHeaderEvents>('popup-header')
  .mixin(localeMixin('OhuPopupHeader'))
  .create({
    props: {
      title: String,
      minorText: String,
      center: props(Boolean).default(false),
      confirm: props(Boolean).default(false),
      closeIcon: props.ofType<IconDef>().default(() => CloseOutlined),
      closeIconPosition: props.ofStringLiterals('left', 'right').default('right'),
    },
    methods: {
      close() {
        const parent = this.$parent as any;
        if (parent.close) {
          parent.close();
        }
        this.$emit('cancel');
      },
      handleConfirm() {
        this.$emit('confirm');
      },
    },
    render() {
      const root = this.root();
      const textNode = root.element('text');
      const {
        $slots,
        title, minorText, center, confirm, closeIcon, closeIconPosition
      } = this;
      const content = (
        <div class={textNode}>
          <div class={textNode.element('title').has([!!minorText && 'minor'])}>
            {$slots.default || title}
          </div>
          {
            minorText
            &&
            <div class={textNode.element('minor-title')}>{minorText}</div>
          }
        </div>
      );
      if (confirm) {
        return (
          <div class={root.is(['confirm', center && 'text-center'])}>
            <Button
              class={root.element('cancel')}
              link
              inline
              size="sm"
              onClick={this.close}>
              {this.$l.cancelText}
            </Button>
            {content}
            <Button
              class={root.element('ok')}
              type="primary"
              link
              inline
              size="sm"
              onClick={this.handleConfirm}>
              {this.$l.confirmText}
            </Button>
          </div>
        );
      }
      return (
        <div class={root.is([center && 'text-center', `close-icon-${closeIconPosition}`])}>
          {content}
          <Button type="link"
            class={root.element('close')}
            size="md"
            inline
            icon={closeIcon}
            onClick={this.close}>
          </Button>
        </div>
      );
    },
  });
