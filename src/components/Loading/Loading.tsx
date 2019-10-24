import { componentFactory } from 'vue-tsx-support';
import { prefix } from '../_utils/shared';
import Icon from '../Icon';
import props from 'vue-strict-prop';
import { LoadingFilled } from '../../icons';
import './styles/index.scss';


const loadingBaseName = `${prefix}loading`;
const loadingTextCls = `${loadingBaseName}__text`;
const Loading = componentFactory.create({
  name: loadingBaseName,
  props: {
    color: String,
    vertical: props(Boolean).default(false),
    size: String,
    textSize: String,
    textColor: String,
  },
  render() {
    const { color, vertical, size, textColor, textSize, $slots } = this;
    const loadingText = $slots.default || 'loading...';
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
        <Icon type={LoadingFilled} spin style={loadingStyle}></Icon>
        <span class={loadingTextCls} style={textStyle}>{loadingText}</span>
      </div>
    );
  },
});

export default Loading;
