

export default function isPlainObject(obj: any): obj is object {
  return Object.prototype.toString.call(obj) === '[object Object]';
}
