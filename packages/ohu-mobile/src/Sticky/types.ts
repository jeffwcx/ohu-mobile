
export interface StickyProps {
  top: number;
  bottom: number;
  tag: string;
  disableEvents: boolean;
  useFixed: boolean;
}


export interface StickyEvents {
  onFixed: string;
  onStuck: string;
  onNormal: string;
}
