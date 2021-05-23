import path from 'path';
import fs from 'fs-extra';
import art from 'art-template';
import svgo from 'svgo';
import { removeLastSep, transformToCamelCase } from './utils';
import { IconCommandOptions } from '../types';
import svgoConfig from './svgo/svgoConfig';
import resolvePlugins from './svgo/resolvePlugins';
import jsxPlugin from './svgo/jsxPlugin';

art.defaults.imports.indent = (svg: string, indent: number) => {
  return svg.split('\n')
    .map(line => Array(indent).fill(' ').join('') + line)
    .join('\n');
};

export function optimizeSVG(svgData: string, options: Partial<IconCommandOptions>) {
  let plugins = svgoConfig.plugins;
  let config = Object.assign({}, svgoConfig);
  if (options.dynamicId) {
    plugins = resolvePlugins(plugins, [
      // should remove `removeAttrs` plugin
      { name: 'removeAttrs', active: false },
      {
        name: 'prefixIds',
        params: { delim: '${id}' },
      }
    ]);
  }
  if (options.svgoConfig) {
    const p = options.svgoConfig.plugins;
    if (p) {
      plugins = resolvePlugins(plugins, p);
    }
    Object.assign(config, options.svgoConfig);
  }
  config.plugins = plugins;
  let result = svgo.optimize(svgData, config);
  let error = (result as any).error;
  if (error) {
    throw new Error(error);
  }
  if (options.tsx) {
    result = svgo.optimize(result.data, {
      js2svg: {
        indent: 2,
        pretty: true,
      },
      plugins: [jsxPlugin],
    });
  }
  return result;
}

export async function generateIcon(
  svgPath: string,
  outputPath: string,
  template: string,
  config: IconCommandOptions,
) {
  const { sortDir, noThemeSuffix, includedThemes, rename } = config;
  const { name, dir } = path.parse(svgPath);
  let iconTheme: string = '';
  let iconName = name;
  if (sortDir) {
    const dirNameArr = dir.split(path.sep);
    iconTheme = dirNameArr[dirNameArr.length - 1];
    if (noThemeSuffix && iconTheme) {
      let result = iconName.match(new RegExp(`(.+)${iconTheme}$`));
      if (result && result[1]) {
        const name = result[1];
        iconName = removeLastSep(name);
      }
    }
  } else if (includedThemes) {
    includedThemes.some((theme) => {
      const index = name.lastIndexOf(theme);
      if (index < 0) return false;
      const result = name.substring(0, index);
      iconName = removeLastSep(result);
      iconTheme = theme;
      return true;
    });
  }
  if (rename) {
    const { name, theme } = rename({ name: iconName, theme: iconTheme });
    iconName = name;
    iconTheme = theme;
  }
  const fileName = transformToCamelCase(iconName) + transformToCamelCase(iconTheme);
  let fileContent = await fs.readFile(svgPath, 'utf8');
  const result = optimizeSVG(fileContent, config);
  fileContent = result.data;
  let attrs: Record<string, string> = {};
  let children = fileContent.replace(/<svg([^>]*)>/, (_, attrsStr: string) => {
    if (attrsStr) {
      const reg = (/([a-zA-Z:]+)\="(.+?)"/g);
      let match = reg.exec(attrsStr);
      while (match !== null) {
        const [_, key, value] = Array.from(match);
        attrs[key] = value;
        match = reg.exec(attrsStr);
      }
    }
    return '';
  }).replace(/<\/svg>/, '');
  if (config.dynamicId && config.tsx) {
    children = children
      .replace(/(["'])(#?)prefix(\$\{id\})(\w+)\1/g, '{`$2$3$4`}')
      .replace(/(["'])(url\()(#?)prefix(\$\{id\})(\w+)(\))\1/g, '{`$2$3$4$5$6`}');
  }
  const outputFilePath = path.format({
    dir: outputPath,
    name: fileName,
    ext: !config.tsx ? (config.vue ? '.vue' : '.ts')  : '.tsx',
  });
  const outputFileData = art.render(template, {
    ...attrs,
    ...result.info,
    name: iconName,
    fileName,
    theme: iconTheme,
    dynamicId: config.dynamicId,
    children: children.endsWith('\n')
      ? children.substring(0, children.length - 1)
      : children,
  });
  await fs.writeFile(outputFilePath, outputFileData);
  return {
    outputPath: outputFilePath,
    fileName,
    theme: iconTheme,
    name: iconName,
  };
}

export async function generateIndexFile(outputPath: string, iconFileNames: string[]) {
  let result = ''
  iconFileNames.map((icon) => {
    result += `export { default as ${icon} } from './${icon}';\n`;
  });
  const outputFilePath = path.format({
    dir: outputPath,
    name: 'index',
    ext: '.ts',
  });
  await fs.writeFile(outputFilePath, result);
}

export async function generateTypeFile(outputPath: string, typesFileName: string, themes: string[]) {
  const templateStr = await fs.readFile(typesFileName, 'utf-8');
  const str = art.render(templateStr, {
    themes: themes.map(theme => `'${theme}'`).join(' | '),
  });
  const outputFilePath = path.format({
    dir: outputPath,
    name: 'types',
    ext: '.ts',
  });
  await fs.writeFile(outputFilePath, str);
}
