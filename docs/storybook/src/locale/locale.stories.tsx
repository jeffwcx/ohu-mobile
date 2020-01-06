import Locale from '..';
import Vue from 'vue';
import docs from '../README.md';
import Dialog from '../../Dialog';
import Button from '../../Button';
import en_US from '../en_US';

export default {
  title: 'Locale',
  parameters: {
    notes: { markdown: docs }
  },
};


export const use = () => Vue.extend({
  beforeCreate() {
    Vue.use(Locale);
  },
  render() {
    return (
      <p style="padding: 12px;">
        <p>
          current lang(click to change): <Button inline size="sm" onClick={() => {
            if (this.$ohuLang === 'zh_CN') {
              Locale.use('en_US', en_US);
            } else {
              Locale.use('zh_CN');
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
