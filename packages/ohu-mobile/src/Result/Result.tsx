import props from 'vue-strict-prop';
import Icon from '../Icon';
import { NoDataIllustration, NoNetworkIllustration, NoNewsIllustration, NoQueryDataIllustration } from './assets';
import { CheckboxCircleFilled, CloseCircleFilled } from '@ohu-mobile/icons';
import { $colorPrimary, $colorTextError } from '../_config/variables';
import { defineComponent } from '../_utils/defineComponent';
import { ResultProps, ResultStatusMap } from './types';
import { IconDef } from '../types';


const statusMap: ResultStatusMap = {
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
    statusMap: props.ofType<Partial<ResultStatusMap>>().default(() => ({})),
    svgSize: props(String).default('140px'),
    status: props.ofStringLiterals(
      'network-broken',
      'empty',
      'no-message',
      'not-queried',
      'success',
      'error',
    ).default('empty'),
  },
  computed: {
    svgMap() {
      return Object.assign({}, statusMap, this.statusMap);
    },
  },
  methods: {
    renderIconArea() {
      const { $slots, status } = this;
      if ($slots.icon) return $slots.icon;
      const style: Partial<CSSStyleDeclaration> = {};
      if (status === 'success') {
        style.color = $colorPrimary;
      } else if (status === 'error') {
        style.color = $colorTextError;
      } else {
        style.fontSize = this.svgSize;
      }
      // support dymanic generate svg
      const statusSvg = this.svgMap[status];
      let svg: IconDef = statusSvg instanceof Function ? statusSvg() : statusSvg;
      if (svg) {
        return <Icon type={svg} style={style}></Icon>
      }
      return '';
    }
  },
  render() {
    const { title, subTitle, $slots } = this;
    const root = this.root();
    return (
      <div class={root}>
        <div class={root.element('icon')}>
          {this.renderIconArea()}
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
