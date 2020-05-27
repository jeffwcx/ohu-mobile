import deepMerge from 'deepmerge';
export default function omit<T extends Record<string, any>, K extends keyof T>(target: T, keys: Array<K>) {
  const result: Record<string, any> = {};
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
