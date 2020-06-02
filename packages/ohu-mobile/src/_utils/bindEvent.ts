import { VueConstructor } from 'vue/types/umd';

export default function (instance: InstanceType<VueConstructor>, event: keyof WindowEventMap, handler: Function) {
  let registered = false;
  const listener = () => {
    handler();
  };
  const register = () => {
    window.addEventListener(event, listener);
    registered = true;
  };
  const unregister = () => {
    window.removeEventListener(event, listener);
    registered = false;
  };
  register();
  instance.$once('hook:beforeDestroy', unregister);
  instance.$once('hook:activated', () => {
    if (registered) return;
    register();
  });
  instance.$once('hook:deactivated', unregister);
}
