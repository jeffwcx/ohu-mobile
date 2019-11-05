import { PopupAnyPosition, PopupAnchorPosition, PopupPosition } from './types';

export function isAnyPosition(position: PopupPosition): position is PopupAnyPosition {
  return (position as PopupAnyPosition).left !== undefined
    || (position as PopupAnyPosition).top !== undefined;
}

export function isAnchorPosition(position: PopupPosition): position is PopupAnchorPosition {
  return (position as PopupAnchorPosition).horizontal !== undefined
    || (position as PopupAnchorPosition).vertical !== undefined;
}
