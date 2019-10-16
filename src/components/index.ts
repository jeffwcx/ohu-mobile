import Icon from './Icon';
import { VueConstructor } from 'vue';

const components = [
  Icon,
];

// global use ui library
const install = (Vue: VueConstructor) => {
  components.map(component => {
    Vue.component(component.name, component);
  });
};

export {
  Icon,
};

export default {
  install,
};

