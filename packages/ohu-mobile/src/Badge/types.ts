export type BadgePosition = 'up-left' | 'up-right' | 'down-left' | 'down-right';

export type BadgeType = 'corner' | 'tag' | 'dot';

export interface BadgeProps {
  type?: BadgeType;
  color?: string;
  fontColor?: string;
  position?: BadgePosition;
  text?: string | number;
  overflowNumber?: number;
}
