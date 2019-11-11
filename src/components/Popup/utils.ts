import { PopupAnyPosition, PopupAnchorPosition, PopupPosition, PopupTransformOrigin, PopupVerticalPosition, PopupHorizontalPosition } from './types';

export function isAnyPosition(position: PopupPosition): position is PopupAnyPosition {
  return (position as PopupAnyPosition).left !== undefined
    || (position as PopupAnyPosition).top !== undefined;
}

export function isAnchorPosition(position: PopupPosition): position is PopupAnchorPosition {
  return (position as PopupAnchorPosition).horizontal !== undefined
    || (position as PopupAnchorPosition).vertical !== undefined;
}

export function computeRect(el: HTMLElement) {
  return {
    width: el.offsetWidth,
    height:el.offsetHeight,
  };
}

export function getAnchorPosition(position: PopupPosition) {
  let anchorPos: PopupAnchorPosition = {};
  if (typeof position === 'string') {
    if (position === 'top' || position === 'bottom') {
      anchorPos.vertical = position;
      anchorPos.horizontal = 'center';
    } else {
      anchorPos.horizontal = position;
      anchorPos.vertical = 'center';
    }
  } else if (isAnchorPosition(position)) {
    anchorPos = position;
  }
  return anchorPos;
}

const vPositionReverseMap = {
  top: 'bottom',
  bottom: 'top',
  center: 'center',
};
const hPositionReserveMap = {
  left: 'right',
  right: 'left',
  center: 'center',
};

export function getTransformOrigin(anchorPos: PopupAnchorPosition, origin?: PopupTransformOrigin) {
  let transformOrigin: PopupTransformOrigin = origin || {};
  // preset transform origin
  if (anchorPos.vertical !== undefined && !transformOrigin.vertical) {
    transformOrigin.vertical = vPositionReverseMap[anchorPos.vertical] as PopupVerticalPosition;
  }
  if (anchorPos.horizontal !== undefined && !transformOrigin.horizontal) {
    if (transformOrigin.vertical !== 'center') {
      transformOrigin.horizontal = anchorPos.horizontal;
    } else {
      transformOrigin.horizontal = hPositionReserveMap[anchorPos.horizontal] as PopupHorizontalPosition;
    }
  }
  return transformOrigin;
}
