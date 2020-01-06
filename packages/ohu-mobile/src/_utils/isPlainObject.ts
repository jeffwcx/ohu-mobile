

export default function isPlainObject<T extends object>(obj: any): obj is T {
  return Object.prototype.toString.call(obj) === '[object Object]';
}
