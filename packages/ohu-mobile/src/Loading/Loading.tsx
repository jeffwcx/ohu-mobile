import Icon from '../Icon';
import props from 'vue-strict-prop';
import { LoaderSpinOutlined } from '@ohu-mobile/icons';
import localeMixin from '../_utils/localeMixin';
import type { CSSProperties } from 'vue';
import { defineComponent } from '../_utils/defineComponent';
import { LoadingProps } from './types';

const Loading = defineComponent<LoadingProps>('loading')
  .mixin(localeMixin('OhuLoading'))
  .create({
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
      const loadingText = $slots.default || text || this.$l.defaultText;
      const loadingStyle: CSSProperties = {};
      if (color) loadingStyle.color = color;
      if (size) loadingStyle.fontSize = size;
      const textStyle: CSSProperties = {};
      if (textColor) textStyle.color = textColor;
      if (textSize) textStyle.fontSize = textSize;
      const cls = this.$rootCls();
      return (
        <div class={cls.is(vertical && 'vertical')}>
          <Icon type={LoaderSpinOutlined} spin style={loadingStyle}></Icon>
          <span class={cls.element('text')} style={textStyle}>
            {loadingText}
          </span>
        </div>
      );
    },
  });

export default Loading;
