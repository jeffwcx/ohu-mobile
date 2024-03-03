export interface SkeletonProps {
  loading?: boolean;
  shape?: 'rect' | 'circle';
  title?: boolean;
  titleWidth?: string;
  rows?: number;
  row?: boolean;
  rowWidth?: string;
  avatar?: boolean;
  avatarSize?: string;
  animateDisable?: boolean;
  animate?: 'blink' | 'scan';
  duration?: number;
}
