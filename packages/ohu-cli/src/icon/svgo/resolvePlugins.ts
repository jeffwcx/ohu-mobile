import { DefaultPlugins, Plugin } from 'svgo';

export default function resolvePlugins(plugins: any[], addPlugins: any[]) {
  const map = plugins.reduce((acc, plugin) => {
    if (typeof plugin === 'string') {
      acc[plugin] = plugin;
    } else {
      acc[plugin.name] = plugin;
    }
    return acc;
  }, {} as Record<string, Plugin>);
  addPlugins.forEach((addPlugin) => {
    if (typeof addPlugin === 'string') {
      if (map[addPlugin]) return;
      map[addPlugin] = addPlugin;
      return;
    }
    if ((addPlugin as DefaultPlugins).active === false) {
      delete map[addPlugin.name];
      return;
    }
    const originPlugin = map[addPlugin.name];
    if (originPlugin) {
      if (typeof originPlugin === 'string') {
        map[addPlugin.name] = addPlugin;
      } else {
        map[addPlugin.name] = Object.assign({}, originPlugin, addPlugin);
      }
    } else {
      map[addPlugin.name] = addPlugin;
    }
  });
  return Object.keys(map).map((key) => map[key]);
}
