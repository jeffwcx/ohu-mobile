import { componentFactoryOf } from 'vue-tsx-support';
import { prefix } from '../_utils/shared';

export interface DialogEvents {}

const baseDialogName = `${prefix}dialog`;
export default componentFactoryOf<DialogEvents>().create({
  name: baseDialogName,
  render() {
    return (
      <div></div>
    );
  },
});
