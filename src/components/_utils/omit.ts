import { Dictionary } from 'vue-router/types/router';
import deepMerge from 'deepmerge';
export default function omit<T extends Dictionary<{}>, K extends keyof T>(target: T, keys: Array<K>) {
  const result : Dictionary<{}> = {};
  for (const key in target) {
    if (target.hasOwnProperty(key)) {
      const element: any = deepMerge({}, target[key]);
      if (keys.indexOf(key as any) < 0) {
        result[key] = element;
      }
    }
  }
  return result as Omit<T, K>;
}
