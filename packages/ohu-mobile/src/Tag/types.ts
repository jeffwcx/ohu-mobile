
export type TagSize = 'sm' | 'md' | 'lg';
export type TagShape = 'square' | 'fillet';
export interface TagProps {
  text?: string | number;
  shape?: TagShape;
  size?: TagSize;
  color?: string;
  fontColor?: string;
  deleteable?: boolean;
  outline?: boolean;
}

export interface TagEvents {
  onClick: Event;
}
