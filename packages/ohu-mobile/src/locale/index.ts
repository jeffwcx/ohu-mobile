import { VueConstructor } from 'vue';
import defaultMessages from './zh_CN';
import { LocaleDef } from './types';

const defaultLang = 'zh_CN';

let proto: any;

const langVar = '$ohuLang';
const messagesVar = '$ohuMessages';

const locale = {
  name: 'locale',
  installed: false,
  install(Vue: VueConstructor) {
    if (this.installed) return;
    const { prototype, util } = Vue;
    proto = prototype;
    if (util) {
      // @ts-ignore
      util.defineReactive(prototype, langVar, defaultLang);
    }
    prototype[messagesVar] = {
      [defaultLang]: defaultMessages,
    };
    this.installed = true;
  },
  use(lang: string, messages?: LocaleDef) {
    if (proto) {
      const msgs = proto[messagesVar];
      const hasLang = lang in msgs;
      if (!messages && !hasLang) return;
      if (!hasLang && messages) {
        msgs[lang] = messages;
      }
      proto[langVar] = lang;
    }
  },
};

export default locale;
