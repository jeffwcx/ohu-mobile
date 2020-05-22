import IndexList from './IndexList';
import List from '../List';
import Group from './IndexListGroup';

export * from './types';

export default Object.assign(IndexList, {
  Group,
  Item: List.Item,
});
