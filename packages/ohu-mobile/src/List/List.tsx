import { componentFactory } from 'vue-tsx-support';
import props from 'vue-strict-prop';
import { prefix } from '../_utils/shared';
import './styles/index.scss';
import Loading, { LoadingProps } from '../Loading';
import localeMixin from '../_utils/localeMixin';


export const listProps = {
  loading: props(Boolean).default(false),
  loadingProps: props<LoadingProps>(Object).default(() => ({})),
  finished: props(Boolean).default(false),
  finishedText: String,
};

const baseListName = `${prefix}list`;
const listBottomCls = `${baseListName}__bottom`;
export default componentFactory.mixin(localeMixin('OhuList')).create({
  name: baseListName,
  props: listProps,
  render() {
    const {
      $slots,
      loading,
      loadingProps,
      finished,
      finishedText,
    } = this;
    const loadingNode = $slots.loading || <Loading {...{props: loadingProps}} />;
    return (
      <ul class={baseListName}>
        {$slots.default}
        <div class={listBottomCls}>
          {loading && loadingNode}
          {
            finished
            &&
            <span>{finishedText || this.$l.defaultFinishedText}</span>
          }
        </div>
      </ul>
    );
  },
});
