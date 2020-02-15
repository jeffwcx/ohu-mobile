import { componentFactory } from 'vue-tsx-support';
import props from 'vue-strict-prop';
import { $prefix } from '../_config/variables';

export const cardHeaderBaseName = `${$prefix}card-header`;
const cardHeaderExtraCls = `${$prefix}card-header__extra`;
const CardHeader = componentFactory.create({
  name: cardHeaderBaseName,
  props: {
    status: props.ofStringLiterals('error', 'success', 'normal').default('normal'),
    bold: props(Boolean).default(false),
    extra: String,
  },
  computed: {
    cls() {
      return {
        [cardHeaderBaseName]: true,
        [`is-${this.status}`]: true,
        'is-bold': this.bold,
      };
    },
  },
  render() {
    const { $slots, extra } = this;
    const extraContent = $slots.extra || extra;
    return (
      <div class={this.cls}>
        { $slots.default }
        { extraContent && <div class={cardHeaderExtraCls}>{extraContent}</div> }
      </div>
    );
  },
});

export default CardHeader;
