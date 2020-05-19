import props from 'vue-strict-prop';
import Icon from '../Icon';
import { NoDataIllustration, NoNetworkIllustration, NoNewsIllustration, NoQueryDataIllustration } from './assets';
import { CheckboxCircleFilled, CloseCircleFilled } from '@ohu-mobile/icons';
import { $colorPrimary, $colorTextError } from '../_config/variables';
import { defineComponent } from '../_utils/defineComponent';
import { ResultProps } from './types';

const statusMap = {
  'network-broken': NoNetworkIllustration,
  'empty': NoDataIllustration,
  'no-message': NoNewsIllustration,
  'not-queried': NoQueryDataIllustration,
  'success': CheckboxCircleFilled,
  'error': CloseCircleFilled,
};

const Result = defineComponent<ResultProps>('result').create({
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
    const root = this.root();
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
      <div class={root}>
        <div class={root.element('icon')}>
          { iconArea }
        </div>
        {
          title &&
          <h2 class={root.element('title')}>{title}</h2>
        }
        {
          subTitle &&
          <h3 class={root.element('subtitle')}>{subTitle}</h3>
        }
        {
          $slots.extra &&
          <div class={root.element('extra')}>{ $slots.extra }</div>
        }
      </div>
    );
  },
});

export default Object.assign(Result, { statusMap });
