import { componentFactoryOf } from 'vue-tsx-support';
import { FormEvents } from './types';
import { prefix } from '../_utils/shared';
import './styles/index.scss';

const baseFormName = `${prefix}form`;
export default componentFactoryOf<FormEvents>().create({
  name: baseFormName,
  render() {
    return (
      <form></form>
    );
  },
});
