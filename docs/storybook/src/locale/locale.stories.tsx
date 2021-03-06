import Vue from 'vue';
import docs from '@/locale/README.md';
import Button from '@/Button';
import '@/Button/style';
import Dialog from '@/Dialog';
import '@/Dialog/style';
import locale from '@/locale';
import en_US from '@/locale/en_US';

export default {
  title: 'Locale',
  parameters: {
    options: {
      showPanel: true,
    },
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
