import { IconDef } from '../types';

export type ResultStatus = 'network-broken' | 'empty' | 'no-message' | 'not-queried' | 'success' | 'error';
export type ResultStatusMap = Record<string, IconDef | (() => IconDef)>
export interface ResultProps {
  title?: string;
  subTitle?: string;
  status?: ResultStatus;
  statusMap?: Partial<ResultStatusMap>;
  svgSize?: string;
}
