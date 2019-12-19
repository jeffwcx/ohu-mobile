
export interface StickyProps {
  top: number;
  bottom: number;
  tag: string;
  disableEvents: boolean;
  useFixed: boolean;
}


export interface StickyEvents {
  onFixed: void;
  onStuck: void;
  onNormal: void;
}
