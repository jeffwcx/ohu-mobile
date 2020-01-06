
export interface ResultProps {
  title?: string;
  subTitle?: string;
  status?: 'network-broken' | 'empty' | 'no-message' | 'not-queried' | 'success' | 'error';
}
