
export interface GridProps {
  row?: boolean;
  column?: boolean;
  x?: 'left' | 'right' | 'center' | 'between' | 'around' | 'baseline' | 'stretch' | 'evenly';
  y?: 'top' | 'bottom' | 'center' | 'baseline' | 'stretch' | 'between' | 'around' | 'evenly';
  m?: 'left' | 'right' | 'top' | 'bottom' | 'center' | 'between' | 'around' | 'stretch' | 'evenly';
  gap?: number;
  wrap?: boolean;
  reverse?: boolean;
}
