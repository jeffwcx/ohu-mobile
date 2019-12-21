import { componentFactoryOf } from 'vue-tsx-support';
import { prefix } from '../_utils/shared';
import props from 'vue-strict-prop';
import './styles/index.scss';
import Button from '../Button';
import { ArrowLeftOutlined } from '@/icons';
import { VNodeData } from 'vue';
import Divider from '../Divider';
import vars from '../_styles/variables';


export interface NavBarEvents {
  onClickLeft: Event;
}

const baseNavBarName = `${prefix}nav-bar`;
const navBarInner = `${prefix}nav-bar-inner`;
const navBarLeftCls = `${baseNavBarName}__left`;
const navBarCenterCls = `${baseNavBarName}__center`;
const navBarTitleCls = `${baseNavBarName}__title`;
const navBarRightCls = `${baseNavBarName}__right`;
const NavBar = componentFactoryOf<NavBarEvents>().create({
  name: baseNavBarName,
  props: {
    type: props.ofStringLiterals('light', 'primary').default('light'),
    title: String,
    leftArrow: props(Boolean).default(false),
    leftText: String,
    divider: props(Boolean).default(false),
  },
  render() {
    const { $slots, title, leftArrow, leftText, divider, type } = this;
    let leftArea;
    if ($slots.left) {
      leftArea = $slots.left;
    } else {
      const btnProps: VNodeData = {
        props: {
          type: 'link',
          inline: true,
          round: leftText === undefined,
        },
        on: {
          click: (e: Event) => {
            this.$emit('clickLeft', e);
          },
        },
      };
      if (leftArrow && btnProps.props) {
        btnProps.props.icon = ArrowLeftOutlined;
      }
      leftArea = <Button {...btnProps}>{ leftText }</Button>
    }
    let centerArea;
    if (title) {
      centerArea = <div class={navBarTitleCls}>{ title }</div>;
    } else if ($slots.default) {
      centerArea = $slots.default;
    }
    const navBarCls = {
      [baseNavBarName]: true,
      [`is-${type}`]: true
    };
    return (
      <div class={navBarCls}>
        <div class={navBarInner}>
          <div class={navBarLeftCls}>{ leftArea }</div>
          <div class={navBarCenterCls}>{ centerArea }</div>
          <div class={navBarRightCls}>{ $slots.right }</div>
        </div>
        { divider && <Divider color={vars.colorBorderBase}></Divider> }
      </div>
    );
  },
});

export default NavBar;
