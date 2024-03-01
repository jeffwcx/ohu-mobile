import Button, { ButtonProps } from '../Button';
import { CSSProperties } from 'vue';
import { BackOutlined } from '@ohu-mobile/icons';
import Divider from '../Divider';
import { NavBarEvents, NavBarProps } from './types';
import { $navBarBorderColor } from '../_config/variables';
import { defineComponent, props } from '../_utils/defineComponent';

const NavBar = defineComponent<NavBarProps, NavBarEvents>('nav-bar').create({
  props: {
    type: props.ofStringLiterals('light', 'primary').default('light'),
    title: String,
    leftArrow: props(Boolean).default(false),
    leftText: String,
    divider: props(Boolean).default(false),
    segmentation: props<Array<number>>(Array).default(() => []),
  },
  render() {
    const root = this.$rootCls();
    const { $slots, title, leftArrow, leftText, divider, type, segmentation } =
      this;
    let leftArea;
    if ($slots.left) {
      leftArea = $slots.left;
    } else {
      const btnProps = {
        props: {
          type: 'link',
          inline: true,
          round: leftText === undefined,
        } as ButtonProps,
        on: {
          click: (e: Event) => {
            this.$emit('clickLeft', e);
          },
        },
      };
      if (leftArrow && btnProps.props) {
        btnProps.props.icon = BackOutlined;
      }
      leftArea = <Button {...btnProps}>{leftText}</Button>;
    }
    let centerArea;
    if (title) {
      centerArea = <div class={root.element('title')}>{title}</div>;
    } else if ($slots.default) {
      centerArea = $slots.default;
    }
    root.is(type);
    const leftStyle: CSSProperties = {};
    const centerStyle: CSSProperties = {};
    const rightStyle: CSSProperties = {};
    const [left = 1, center = 4, right = 1] = segmentation;
    const sum = left + center + right;
    leftStyle.width = `${(left * 100) / sum}%`;
    centerStyle.width = `${(center * 100) / sum}%`;
    rightStyle.width = `${(right * 100) / sum}%`;
    return (
      <div class={root}>
        <div class={root.block('inner')}>
          <div class={root.element('left')} style={leftStyle}>
            {leftArea}
          </div>
          <div class={root.element('center')} style={centerStyle}>
            {centerArea}
          </div>
          <div class={root.element('right')} style={rightStyle}>
            {$slots.right}
          </div>
        </div>
        {divider && <Divider color={$navBarBorderColor}></Divider>}
      </div>
    );
  },
});

export default NavBar;
