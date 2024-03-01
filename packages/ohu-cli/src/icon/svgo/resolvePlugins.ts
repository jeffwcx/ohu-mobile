import type { PluginConfig } from 'svgo';
import type { BuiltinsWithOptionalParams, BuiltinsWithRequiredParams } from 'svgo/plugins/plugins-types';


export default function resolvePlugins(
  plugins: PluginConfig[],
  mergedPlugins: PluginConfig[],
  removedPlugins?: (keyof BuiltinsWithOptionalParams | keyof BuiltinsWithRequiredParams)[]) {
  const map = plugins.reduce((acc, plugin) => {
    if (typeof plugin === 'string') {
      acc[plugin] = plugin;
    } else {
      acc[plugin.name] = plugin;
    }
    return acc;
  }, {} as Record<string, any>);

  mergedPlugins.forEach((plugin) => {
    if (typeof plugin === 'string') {
      if (map[plugin]) return;
      map[plugin] = plugin;
      return;
    }
    const originPlugin = map[plugin.name];
    if (originPlugin) {
      if (typeof originPlugin === 'string') {
        map[plugin.name] = plugin;
      } else {
        map[plugin.name] = Object.assign({}, originPlugin, plugin);
      }
    } else {
      map[plugin.name] = plugin;
    }
  });

  removedPlugins?.forEach(plugin => {
    map[plugin] && delete map[plugin];
  });

  return Object.keys(map).map((key) => map[key]);
}
