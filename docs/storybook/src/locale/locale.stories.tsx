import Vue from 'vue';
import docs from '@/locale/README.md';
import { locale, Button, Dialog } from '@ohu-mobile/core';
import en_US from '@ohu-mobile/core/lib/locale/en_US';

export default {
  title: 'Locale',
  parameters: {
    notes: { markdown: docs }
  },
};


export const use = () => Vue.extend({
  beforeCreate() {
    Vue.use(locale);
  },
  render() {
    return (
      <p style="padding: 12px;">
        <p>
          current lang(click to change): <Button inline size="sm" onClick={() => {
            if (this.$ohuLang === 'zh_CN') {
              locale.use('en_US', en_US);
            } else {
              locale.use('zh_CN');
            }
          }}>{this.$ohuLang}</Button>
        </p>
        <p>
          <Button inline size="sm" onClick={() => Dialog.confirm({ content: 'hello', parent: this })}>Test Dialog</Button>
        </p>
      </p>
    );
  },
});
