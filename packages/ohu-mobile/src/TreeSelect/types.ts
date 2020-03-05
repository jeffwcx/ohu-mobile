import { IconProperty } from '../types';

export interface TreeNode {
  key?: string | number;
  title?: string;
  value?: any;
  disabled?: string;
  isLeaf?: boolean;
  hasChildren?: boolean;
  children?: TreeNode[];
}

export interface InternalTreeNode {
  key?: string | number;
  title?: string;
  value?: any;
  disabled?: string;
  isLeaf?: boolean;
  hasChildren?: boolean;
  children?: string[];
  loading?: boolean;
  loaded?: boolean;
}

export type TreeSelectLoadDataFunc = (node: InternalTreeNode) => Promise<TreeNode[]>;

export interface TreeSelectProps {
  value?: any | any[];
  treeData: TreeNode[];
  multiple?: boolean;
  loadData?: TreeSelectLoadDataFunc;
  leftWidth?: string;
  checkedIcon?: IconProperty | null;
  unCheckedIcon?: IconProperty | null;
}

export interface TreeSelectEvents {
  onChange: any;
  onLoadError: Error;
  onTreeExpand: TreeNode;
}
