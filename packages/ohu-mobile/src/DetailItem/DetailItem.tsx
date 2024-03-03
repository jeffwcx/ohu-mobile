import { defineComponent, props } from '../_utils/defineComponent';

const DetailItem = defineComponent('detail-item').create({
  props: {
    title: String,
    content: String,
    extra: String,
    unactive: props(Boolean).default(false),
  },
  render() {
    const { title, content, extra, $slots, unactive } = this;
    const contentNode = $slots.default || content;
    const extraNode = $slots.extra || extra;
    const root = this.$rootCls().is(unactive && 'unactive');
    const contentCls = root.element('content');
    return (
      <div class={root}>
        <div class={root.element('title')}>{title}</div>
        <div class={contentCls}>
          <div class={contentCls.element('inner')}>{contentNode}</div>
          {extraNode && <div class={root.element('extra')}>{extraNode}</div>}
        </div>
      </div>
    );
  },
});

export default DetailItem;
