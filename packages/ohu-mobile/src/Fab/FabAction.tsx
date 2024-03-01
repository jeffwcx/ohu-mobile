import { defineComponent, props } from '../_utils/defineComponent';
import { FabActionProps, FabActionEvents } from './types';
import Button, { ButtonTypes } from '../Button';
import { buttonProps } from '../Button/Button';

const createFabAction = defineComponent<FabActionProps, FabActionEvents>(
  'fab-action',
);

export default createFabAction.create({
  props: {
    ...buttonProps,
    type: props.ofType<ButtonTypes>().default('primary'),
    round: props(Boolean).default(true),
    inline: props(Boolean).default(true),
    label: props(String).optional,
  },
  render() {
    const root = this.$rootCls();
    const { label, ...props } = this.$props as FabActionProps;
    return (
      <div class={root}>
        {this.label && <span class={root.element('label')}>{this.label}</span>}
        {this.$slots.button || (
          <Button {...{ props, on: this.$listeners }}>
            {this.$slots.default}
          </Button>
        )}
      </div>
    );
  },
});
