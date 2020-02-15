
export default function debounce(func: Function, wait = 166) {
  let timeout: any;
  function debounced(this: any, ...args: any[]) {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      func.apply(this, args)
    }, wait);
  };
  debounced.clear = () => {
    if (timeout) {
      clearTimeout(timeout);
    }
  };
  return debounced;
}
