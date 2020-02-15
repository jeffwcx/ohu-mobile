import { componentFactory } from 'vue-tsx-support';
import props from 'vue-strict-prop';
import { $prefix } from '../_config/variables';


const detailItemBaseName = `${$prefix}detail-item`;
const detailItemTitleCls = `${detailItemBaseName}__title`;
const detailItemContentCls = `${detailItemBaseName}__content`;
const detailItemContentInnerCls = `${detailItemContentCls}__inner`;
const detailItemExtraCls = `${detailItemBaseName}__extra`;

const DetailItem = componentFactory.create({
  name: detailItemBaseName,
  props: {
    title: String,
    content: String,
    extra: String,
    unactive: props(Boolean).default(false),
  },
  computed: {
    cls() {
      return {
        [detailItemBaseName]: true,
        'is-unactive': this.unactive,
      };
    }
  },
  render() {
    const { cls, title, content, extra, $slots } = this;
    const contentNode = $slots.default || content;
    const extraNode = $slots.extra || extra;
    return (
      <div class={cls}>
        <div class={detailItemTitleCls}>{ title }</div>
        <div class={detailItemContentCls}>
          <div class={detailItemContentInnerCls}>{ contentNode }</div>
          { extraNode && <div class={detailItemExtraCls}>{ extraNode }</div> }
        </div>
      </div>
    );
  },
});


export default DetailItem;
