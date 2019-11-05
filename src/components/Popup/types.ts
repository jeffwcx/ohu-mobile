import Vue, { CreateElement, VNode } from 'vue';

export interface PopupEvents {
  onVisibleChange: boolean;
  onAfterLeave: boolean;
  onOpen: boolean;
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
'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | string;

export type PopupPosition = PopupAnyPosition | PopupAnchorPosition | PopupVerticalPosition | PopupHorizontalPosition;

export interface PopupProps {
  visible?: boolean;
  anchor?: HTMLElement;
  transformOrigin?: PopupTransformOrigin;
  marginThreshold?: number;
  edgeDetect?: boolean;
  lockScroll?: boolean;
  position?: PopupPosition;
  mask?: boolean;
  maskFrosted?: boolean;
  maskClosable?: boolean;
  fullscreen?: boolean;
  animate?: PopupAnimateType;
  targetStyle?: Partial<CSSStyleDeclaration>;
  scrollBody?: boolean;
};


export type PopupWrapperEvents = Omit<PopupEvents, 'onAfterLeave'> & {
  onAfterClose: any,
};

export type PopupGetContainerFunc = (() => HTMLElement) | HTMLElement;

export interface PopupOutSideProps extends PopupProps {
  getContainer: PopupGetContainerFunc;
  dynamic: boolean;
};

export type PopupOpenOptions = PopupProps & {
  parent?: Vue;
  render?: (h?: CreateElement) => (VNode | VNode[]);
};
