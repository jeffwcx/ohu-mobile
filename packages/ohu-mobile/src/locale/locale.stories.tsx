import Vue from 'vue';
import docs from './README.md?raw';
import Button from '../Button';
import '../Button/style';
import Dialog from '../Dialog';
import '../Dialog/style';
import locale from './index';
import en_US from './en_US';

export default {
  title: 'Config/Locale',
  parameters: {
    options: {
      showPanel: true,
    },
    notes: { markdown: docs },
  },
};

export const Use = () =>
  Vue.extend({
    beforeCreate() {
      Vue.use(locale);
    },
    render() {
      return (
        <p style="padding: 12px;">
          <p>
            current lang(click to change):{' '}
            <Button
              inline
              size="sm"
              onClick={() => {
                if (this.$ohuLang === 'zh_CN') {
                  locale.use('en_US', en_US);
                } else {
                  locale.use('zh_CN');
                }
              }}
            >
              {this.$ohuLang}
            </Button>
          </p>
          <p>
            <Button
              inline
              size="sm"
              onClick={() => Dialog.confirm({ content: 'hello', parent: this })}
            >
              Test Dialog
            </Button>
          </p>
        </p>
      );
    },
  });
