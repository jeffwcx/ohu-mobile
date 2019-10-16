import { componentFactoryOf } from 'vue-tsx-support';
import { prefix } from '../_utils/shared';
import './styles/index.scss';

export interface TabbarEvents {
  change: Event;
}

const tabbarBaseName = `${prefix}tabbar`;
export const Tabbar = componentFactoryOf<TabbarEvents>().create({
  name: tabbarBaseName,
  render() {
    return (
      <div></div>
    );
  },
});

export default Tabbar;
