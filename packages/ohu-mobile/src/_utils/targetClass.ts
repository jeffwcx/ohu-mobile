import isPlainObject from './isPlainObject';

export type TargetClass = string | Record<string, boolean> | Array<string>;

export function addTargetClass(
  currentClass: Record<string, boolean>,
  targetClass?: TargetClass,
) {
  if (!targetClass) return currentClass;
  if (typeof targetClass === 'string') {
    currentClass[targetClass] = true;
  } else if (targetClass instanceof Array) {
    targetClass.map((classStr) => (currentClass[classStr] = true));
  } else if (isPlainObject(targetClass)) {
    Object.keys(targetClass).map((key) => {
      currentClass[key] = targetClass[key];
    });
  }
  return currentClass;
}
