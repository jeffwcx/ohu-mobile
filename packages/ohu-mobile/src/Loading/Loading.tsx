import { componentFactory } from 'vue-tsx-support';
import { prefix } from '../_utils/shared';
import Icon from '../Icon';
import props from 'vue-strict-prop';
import { LoaderFilled } from '@ohu-mobile/icons';
import './styles/index.scss';
import localeMixin from '../_utils/localeMixin';


const loadingBaseName = `${prefix}loading`;
const loadingTextCls = `${loadingBaseName}__text`;
const Loading = componentFactory.mixin(localeMixin('OhuLoading')).create({
  name: loadingBaseName,
  props: {
    color: String,
    vertical: props(Boolean).default(false),
    size: String,
    text: String,
    textSize: String,
    textColor: String,
  },
  render() {
    const { color, vertical, size, text, textColor, textSize, $slots } = this;
    const loadingText = ($slots.default || text) || this.$l.defaultText;
    const loadingStyle: Partial<CSSStyleDeclaration> = {};
    if (color) loadingStyle.color = color;
    if (size) loadingStyle.fontSize = size;
    const textStyle: Partial<CSSStyleDeclaration> = {};
    if (textColor) textStyle.color = textColor;
    if (textSize) textStyle.fontSize = textSize;
    const loadingCls = {
      [loadingBaseName]: true,
      'is-vertical': vertical,
    };
    return (
      <div class={loadingCls}>
        <Icon type={LoaderFilled} spin style={loadingStyle}></Icon>
        <span class={loadingTextCls} style={textStyle}>{loadingText}</span>
      </div>
    );
  },
});

export default Loading;
