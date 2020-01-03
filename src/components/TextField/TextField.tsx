import { componentFactoryOf } from 'vue-tsx-support';
import { prefix } from '../_utils/shared';
import './styles/index.scss';


const baseTextFieldName = `${prefix}text-field`;

const TextField = componentFactoryOf().create({
  name: baseTextFieldName,
  render() {
    return (
      <div></div>
    );
  },
});

export default TextField;
