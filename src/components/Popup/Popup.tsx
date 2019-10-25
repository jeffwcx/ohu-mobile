import { componentFactoryOf } from 'vue-tsx-support';
import { prefix } from '../_utils/shared';

export interface PopupEvents {}

const basePopupName = `${prefix}popup`;
const Popup = componentFactoryOf<PopupEvents>().create({
  name: basePopupName,
  render() {
    return (
      <div></div>
    );
  }
});

export default Popup;
