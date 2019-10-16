export interface SVGIconDef {
  name: string;
  theme: 'outlined' | 'filled' | 'multi-color';
  attrs: {
    viewBox?: string;
  },
  children?: string;
}
