import Vue, { CreateElement, VNode } from 'vue';
import { VueEventWrapper, IconDef, CSSProps } from '../types';
import { ClassOptions } from '../_utils/classHelper';

interface PopupSimpleRect {
  width: number;
  height: number;
  top: number;
  left: number;
}

export interface PopupEnterEvent {
  doc?: PopupSimpleRect;
  anchor?: PopupSimpleRect;
}

export interface PopupOpenEvent {
  visible: boolean;
  documentZIndex: number;
  maskZIndex: number;
}

export interface PopupEvents {
  onVisibleChange: boolean;
  onAfterLeave: boolean;
  onEnter: PopupEnterEvent;
  onOpen: PopupOpenEvent;
  onAfterOpen: void;
  onClose: boolean;
}

export type PopupVerticalPosition = 'top' | 'bottom' | 'center';
export type PopupHorizontalPosition = 'left' | 'right' | 'center';

export interface PopupAnyPosition {
  top?: number;
  left?: number;
};

export interface PopupAnchorPosition {
  vertical?: PopupVerticalPosition;
  horizontal?: PopupHorizontalPosition;
}

export interface PopupTransformOrigin {
  vertical?: PopupVerticalPosition;
  horizontal?: PopupHorizontalPosition;
}

export type PopupAnimateType = 'none' | 'fade' | 'zoom' | 'zoom-scale' |
'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'scale-up' | 'scale-down';

export type PopupPosition = PopupAnyPosition | PopupAnchorPosition | PopupVerticalPosition | PopupHorizontalPosition;

export interface PopupProps {
  /**
   * 弹窗是否可视
   */
  visible?: boolean;
  /**
   * 弹窗主体的CSS样式
   */
  targetStyle?: CSSProps;
  /**
   * 弹窗主体的CSS类
   */
  targetClass?: ClassOptions;
  /**
   * 锚点，围绕锚点展开的弹出层
   */
  anchor?: HTMLElement | (() => HTMLElement);
  /**
   * 锚点模式下，弹层动画属性transform-origin
   */
  transformOrigin?: PopupTransformOrigin;
  /**
   * 是否进行边界检测，确保在页面可视范围内
   */
  edgeDetect?: boolean;
  /**
   * 进行边界检测时，距离页面可视边界的间隔
   */
  marginThreshold?: number;
  lockScroll?: boolean;
  /**
   * 弹出位置
   */
  position?: PopupPosition;
  /**
   * 是否开始遮罩层
   */
  mask?: boolean;
  /**
   * 遮罩层毛玻璃效果
   */
  maskFrosted?: boolean;
  /**
   * 点击遮罩层是否可关闭
   */
  maskClosable?: boolean;
  /**
   * 遮罩层动画
   */
  maskAnimate?: 'mask-fade' | 'none';
  /**
   * 部分遮罩效果
   */
  partialMask?: 'top' | 'bottom';
  /**
   * 全屏效果
   */
  fullscreen?: boolean;
  /**
   * 弹出动画
   */
  animate?: PopupAnimateType;
  /**
   * 弹层主体超出视窗范围是否可滚动
   */
  scrollBody?: boolean;
  /**
   * 弹窗主体是否能点透
   */
  tapThrough?: boolean;
  /**
   * 弹窗层级
   */
  zIndex?: number;
  round?: boolean;
  /**
   * 是否使用传送门
   */
  usePortal?: boolean;
  /**
   * 在deactivated状态下隐藏弹出层
   */
  hideOnDeactivated?: boolean;
};


export type PopupOutSideEvents = Omit<PopupEvents, 'onAfterLeave'> & {
  onAfterClose: any,
};

export type PopupGetContainerFunc = (() => HTMLElement) | HTMLElement;

export interface PopupOutSideProps extends PopupProps {
  getContainer?: PopupGetContainerFunc;
  dynamic?: boolean;
};

export type PopupOpenOptions = PopupProps
&
VueEventWrapper<PopupOutSideEvents>
& {
  parent?: Vue;
  render?: (h?: CreateElement) => (VNode | VNode[]);
};


export interface PopupHeaderProps {
  title?: string;
  minorText?: string,
  center?: boolean;
  confirm?: boolean;
  closeIcon?: IconDef;
  closeIconPosition?: 'left' | 'right';
}

export interface PopupHeaderEvents {
  onConfirm: void;
  onCancel: void;
}
