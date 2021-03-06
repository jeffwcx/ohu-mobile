import Vue, { CreateElement, VNode } from 'vue';
import { VueEventWrapper, IconDef } from '../types';
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
  visible?: boolean;
  anchor?: HTMLElement | (() => HTMLElement);
  transformOrigin?: PopupTransformOrigin;
  marginThreshold?: number;
  edgeDetect?: boolean;
  lockScroll?: boolean;
  position?: PopupPosition;
  mask?: boolean;
  maskFrosted?: boolean;
  maskClosable?: boolean;
  maskAnimate?: 'mask-fade' | 'none';
  partialMask?: 'top' | 'bottom';
  fullscreen?: boolean;
  animate?: PopupAnimateType;
  targetStyle?: Partial<CSSStyleDeclaration>;
  targetClass?: ClassOptions;
  scrollBody?: boolean;
  tapThrough?: boolean;
  zIndex?: number;
  round?: boolean;
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
