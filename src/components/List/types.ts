import { LoadingProps } from '../Loading';

export interface ListProps {
  loading?: boolean;
  loadingProps?: LoadingProps;
  finished?: boolean;
  finishedText?: string;
}
