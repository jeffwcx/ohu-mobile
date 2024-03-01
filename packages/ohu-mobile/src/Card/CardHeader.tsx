import { $prefix } from '../_config/variables';
import { defineComponent, props } from '../_utils/defineComponent';

export const cardHeaderBaseName = `${$prefix}card-header`;

const CardHeader = defineComponent('card-header').create({
  props: {
    status: props
      .ofStringLiterals('error', 'success', 'normal')
      .default('normal'),
    bold: props(Boolean).default(false),
    extra: String,
  },
  render() {
    const { $slots, extra, status, bold } = this;
    const extraContent = $slots.extra || extra;
    const root = this.$rootCls()
      .is(status)
      .is(bold && 'bold');
    return (
      <div class={root}>
        {$slots.default}
        {extraContent && (
          <div class={root.element('extra')}>{extraContent}</div>
        )}
      </div>
    );
  },
});

export default CardHeader;
