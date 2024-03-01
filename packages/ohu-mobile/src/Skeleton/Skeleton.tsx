import props from 'vue-strict-prop';
import type { CSSProperties } from 'vue';
import { defineComponent } from '../_utils/defineComponent';

const Skeleton = defineComponent('skeleton').create({
  props: {
    loading: props(Boolean).default(false),
    shape: props.ofStringLiterals('rect', 'circle').default('rect'),
    title: props(Boolean).default(false),
    titleWidth: props(String).default('40%'),
    rows: props(Number)
      .validator((v) => v >= 0)
      .default(0),
    row: props(Boolean).default(false),
    rowWidth: props(Array, String).default(() => ['100%', '100%', '60%']),
    avatar: props(Boolean).default(false),
    avatarSize: props(String).default(''),
    animateDisable: props(Boolean).default(false),
    animate: props.ofStringLiterals('blink', 'scan').default('scan'),
    duration: props(Number).default(1800),
  },
  render() {
    const {
      animate,
      animateDisable,
      loading,
      shape,
      row,
      rows,
      rowWidth,
      avatar,
      avatarSize,
      title,
      titleWidth,
      duration,
      $slots,
    } = this;
    const animationDuration = `${duration}ms`;
    const style = {
      webkitAnimationDuration: animationDuration,
      animationDuration,
    };
    const currentShape = avatar ? 'circle' : shape;
    const cls = this.$rootCls()
      .is(!animateDisable && animate)
      .is(currentShape)
      .is(avatar && 'avatar')
      .is(title && 'title')
      .is(row && 'row');
    let content;
    // compound: title, rows, avatar
    let hasRows = rows > 0;
    const isCompound = hasRows || (title && avatar);
    if (!isCompound) {
      const singleElStyle: CSSProperties = style;
      if (title) {
        singleElStyle.width = titleWidth;
      }
      if (avatar && avatarSize) {
        singleElStyle.width = avatarSize;
        singleElStyle.height = avatarSize;
      }
      if (row) {
        if (typeof rowWidth === 'string') {
          singleElStyle.width = rowWidth;
        } else if (typeof rowWidth[0] === 'string') {
          singleElStyle.width = rowWidth[0];
        }
      }
      content = <div class={cls} style={singleElStyle}></div>;
    } else {
      const avatarProps = {
        props: { animate, animateDisable, avatar: true, avatarSize, duration },
      };
      const titleProps = {
        props: { animate, animateDisable, title: true, titleWidth, duration },
      };
      const leftContent = $slots.left
        ? $slots.left
        : avatar && <Skeleton {...avatarProps}></Skeleton>;
      const skeletonContentCls = cls.element('content');
      const rightContent = $slots.content ? (
        <div class={skeletonContentCls}>{$slots.content}</div>
      ) : (
        <div class={skeletonContentCls}>
          {title && <Skeleton {...titleProps}></Skeleton>}
          {hasRows &&
            new Array(rows).fill(0).map((_, index) => {
              let currentRowWidth;
              if (typeof rowWidth === 'string') {
                currentRowWidth = rowWidth;
              } else {
                currentRowWidth = rowWidth[index % rowWidth.length];
              }
              const rowProps = {
                props: {
                  animate,
                  animateDisable,
                  row: true,
                  rowWidth: currentRowWidth,
                  duration,
                },
              };
              return <Skeleton {...rowProps}></Skeleton>;
            })}
        </div>
      );
      content = (
        <div class={this.$bem.block('skeletons')}>
          {leftContent}
          {rightContent}
        </div>
      );
    }
    if ($slots.default) {
      return loading ? content : $slots.default[0];
    }
    return content;
  },
});

export default Skeleton;
