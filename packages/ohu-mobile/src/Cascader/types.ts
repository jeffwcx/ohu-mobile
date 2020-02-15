export interface CascaderOption {
  label?: string;
  value: any;
  useCollapse?: boolean;
  disabled?: boolean;
  children?: CascaderOption[];
}

export type CascaderLoadDataFunction = (selectOption: CascaderOption) => Promise<CascaderOption[]>;

export type CascaderShouldLoadDataFunction = (selectOption: CascaderOption) => boolean;

export interface CascaderProps<T = any> {
  value?: T[];
  options?: CascaderOption[];
  loadData?: CascaderLoadDataFunction;
  shouldLoadData?: CascaderShouldLoadDataFunction;
  max?: number;
  columns?: number;
  fieldNames?: {
    label?: string;
    value?: string;
    children?: string;
  };
}

export interface CascaderEvents {
  onChange: {
    value: string | number;
    selectedOptions: CascaderOption[];
  };
}
