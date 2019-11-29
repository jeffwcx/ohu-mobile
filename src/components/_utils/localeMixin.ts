import Vue, { VueConstructor } from 'vue';
import locale from '../locale';

export default function(componentName: string) {
  return Vue.extend({
    beforeCreate() {
      locale.install(this.$root.constructor as VueConstructor);
    },
    computed: {
      $l() {
        const messages = this.$ohuMessages && this.$ohuMessages[this.$ohuLang];
        return messages ? messages[componentName] || {} : {};
      },
    },
    data() {
      const messages = this.$ohuMessages && this.$ohuMessages[this.$ohuLang];
      return {
        locale: messages ? messages[componentName] || {} : {},
      };
    },
  });
}
