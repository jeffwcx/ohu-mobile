import { PopupOutSideEvents } from '../Popup';

export interface PopoverSelectEvent {
  key?: string | number;
  index: number;
}

export interface PopoverEvents extends PopupOutSideEvents {
  onSelect: PopoverSelectEvent;
}

export interface PopoverItemEvents {
  onClick: Event;
  onTouchstart: TouchEvent;
}
