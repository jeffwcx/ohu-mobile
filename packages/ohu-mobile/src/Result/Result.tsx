import { componentFactory } from 'vue-tsx-support';
import props from 'vue-strict-prop';
import Icon from '../Icon';
import { NoDataIllustration, NoNetworkIllustration, NoNewsIllustration, NoQueryDataIllustration } from './assets';
import { CheckboxCircleFilled, CloseCircleFilled } from '@ohu-mobile/icons';
import { $prefix, $colorPrimary, $colorTextError } from '../_config/variables';

const resultBaseName = `${$prefix}result`;
const resultIconCls = `${resultBaseName}__icon`;
const resultTitleCls = `${resultBaseName}__title`;
const resultSubTitleCls = `${resultBaseName}__subtitle`;
const resultExtraCls = `${resultBaseName}__extra`;

const statusMap = {
  'network-broken': NoNetworkIllustration,
  'empty': NoDataIllustration,
  'no-message': NoNewsIllustration,
  'not-queried': NoQueryDataIllustration,
  'success': CheckboxCircleFilled,
  'error': CloseCircleFilled,
};

const Result = componentFactory.create({
  name: resultBaseName,
  props: {
    title: String,
    subTitle: String,
    status: props.ofStringLiterals(
      'network-broken',
      'empty',
      'no-message',
      'not-queried',
      'success',
      'error',
    ).default('empty'),
  },
  render() {
    const { title, subTitle, status, $slots } = this;
    let iconArea;
    if ($slots.icon) {
      iconArea = $slots.icon;
    } else {
      const style: Partial<CSSStyleDeclaration> = {};
      if (status === 'success') {
        style.color = $colorPrimary;
      } else if (status === 'error') {
        style.color = $colorTextError;
      } else {
        style.fontSize = '140px';
      }
      iconArea = <Icon type={statusMap[status]} style={style}></Icon>
    }
    return (
      <div class={resultBaseName}>
        <div class={resultIconCls}>
          { iconArea }
        </div>
        {
          title &&
          <h2 class={resultTitleCls}>{title}</h2>
        }
        {
          subTitle &&
          <h3 class={resultSubTitleCls}>{subTitle}</h3>
        }
        {
          $slots.extra &&
          <div class={resultExtraCls}>{ $slots.extra }</div>
        }
      </div>
    );
  },
});

export default Result;
