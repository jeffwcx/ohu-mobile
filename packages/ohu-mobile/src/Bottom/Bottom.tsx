import { defineComponent } from '../_utils/defineComponent';
import { BottomProps } from './types';


const Bottom = defineComponent<BottomProps>('bottom').create({
  render() {
    const { $slots } = this;
    return (
      <div class={this.root()}>{$slots.default}</div>
    );
  }
});

export default Bottom;
