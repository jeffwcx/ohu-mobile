#!/usr/bin/env node
import * as path from 'path';
import * as glob from 'glob';
import * as util from 'util';
import * as fs from 'fs-extra';
import * as rimraf from 'rimraf';
import * as yargs from 'yargs';
import * as chalk from 'chalk';
import SVGO from 'svgo';
import * as art from 'art-template';

const globAsync = util.promisify<(glob: string) => string[]>(glob as any);

const svgo = new SVGO({
  plugins: [{
    cleanupAttrs: true,
  }, {
    removeDoctype: true,
  },{
    removeXMLProcInst: true,
  },{
    removeComments: true,
  },{
    removeMetadata: true,
  },{
    removeTitle: true,
  },{
    removeDesc: true,
  },{
    removeUselessDefs: true,
  },{
    removeEditorsNSData: true,
  },{
    removeEmptyAttrs: true,
  },{
    removeHiddenElems: true,
  },{
    removeEmptyText: true,
  },{
    removeEmptyContainers: true,
  },{
    removeViewBox: false,
  },{
    cleanupEnableBackground: true,
  },{
    convertStyleToAttrs: true,
  },{
    convertColors: true,
  },{
    convertPathData: true,
  },{
    convertTransform: true,
  },{
    removeUnknownsAndDefaults: true,
  },{
    removeNonInheritableGroupAttrs: true,
  },{
    removeUselessStrokeAndFill: true,
  },{
    removeUnusedNS: true,
  },{
    cleanupIDs: true,
  },{
    cleanupNumericValues: true,
  },{
    moveElemsAttrsToGroup: true,
  },{
    moveGroupAttrsToElems: true,
  },{
    collapseGroups: true,
  },{
    removeRasterImages: false,
  },{
    mergePaths: true,
  },{
    convertShapeToPath: true,
  },{
    sortAttrs: true,
  },{
    removeDimensions: true,
  },{
    removeAttrs: {attrs: '(stroke|fill)'},
  }]
});

function upperCaseFirstLetter(str: string) {
  if (str) {
    return str[0].toUpperCase() + str.substring(1);
  }
  return '';
}

function transformToCamelCase(name: string) {
  return name.split('-').map(str => {
    return upperCaseFirstLetter(str);
  }).join('');
}

async function genIcons(
  svgPath: string,
  outputPath: string,
  template: string,
  useSvgo?: boolean,
  themeByFile?: boolean,
) {
  const { name, dir } = path.parse(svgPath);
  let iconTheme: string = '';
  let iconName: string;
  if (!themeByFile) {
    const dirNameArr = dir.split(path.sep);
    const theme = dirNameArr[dirNameArr.length - 1];
    iconTheme = theme;
    iconName = name;
  } else {
    const nameArr = name.split('-');
    const lastOne = nameArr[nameArr.length - 1];
    let result;
    if (lastOne && (result = lastOne.match(/.*(line)|(fill)|(multi).*/))) {
      const [_, l, f, m] = result;
      if (l) iconTheme = 'outlined';
      if (f) iconTheme = 'filled';
      if (m) iconTheme = 'multi-color';
      iconName = nameArr.slice(0, nameArr.length - 1).join('-');
    } else {
      iconName = name;
      iconTheme = 'outlined';
    }
  }
  const fileName = transformToCamelCase(iconName) + transformToCamelCase(iconTheme);
  let fileContent = await fs.readFile(svgPath, 'utf8');
  if (useSvgo) {
    const { data } = await svgo.optimize(fileContent, { path: svgPath });
    fileContent = data;
  }
  let attrs: Record<string, string> = {};
  const children = fileContent.replace(/<svg([^>]*)>/, (_, attrsStr: string) => {
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
  }).replace(/<\/svg>/, '').replace('\n', '');
  const outputFilePath = path.format({
    dir: outputPath,
    name: fileName,
    ext: '.ts',
  });
  const outputFileData = art.render(template, {
    ...attrs,
    name: iconName,
    fileName,
    theme: iconTheme,
    children,
  });
  await fs.writeFile(outputFilePath, outputFileData);
  return {
    outputPath: outputFilePath,
    fileName,
    theme: iconTheme,
    name: iconName,
  };
}

async function genIndex(outputPath: string, iconFileNames: string[]) {
  let result = ''
  iconFileNames.map((icon) => {
    result += `export * from './${icon}';\n`;
  });
  const outputFilePath = path.format({
    dir: outputPath,
    name: 'index',
    ext: '.ts',
  });
  await fs.writeFile(outputFilePath, result);
}

async function genTypes(outputPath: string, typesFileName: string) {
  const str = await fs.readFile(typesFileName, 'utf-8');
  const outputFilePath = path.format({
    dir: outputPath,
    name: 'types',
    ext: '.ts',
  });
  await fs.writeFile(outputFilePath, str);
}

export interface Options {
  outputDir: string;
  _: string[];
  svgTemplate: string;
  useSvgo: boolean;
  themeByFile: boolean;
  types: string;
}

export async function main ({ outputDir, _, svgTemplate, useSvgo, themeByFile, types }: Options) {
  if (!path.isAbsolute(outputDir)) {
    outputDir = path.join(process.cwd(), outputDir);
  }
  const isExists = await fs.pathExists(outputDir);
  if (!isExists) {
    await fs.mkdirp(outputDir);
  } else {
    rimraf.sync(`${outputDir}/*.(tsx|ts)`);
  }
  let svgGlob = _[0];
  if (!path.isAbsolute(svgGlob)) {
    svgGlob = path.join(process.cwd(), svgGlob);
  }
  if (!path.isAbsolute(svgTemplate)) {
    svgTemplate = path.join(process.cwd(), svgTemplate);
  }
  const svgTplExists = await fs.pathExists(svgTemplate);
  if (!svgTplExists) {
    throw new Error('svg模板不存在！请保证其存在');
  }
  const [ svgPaths, templateStr ] = await Promise.all([
    globAsync(svgGlob),
    fs.readFile(svgTemplate, 'utf8'),
  ]);
  const iconFileNames: string[] = [];
  await Promise.all(svgPaths.map(
    (svgPath) =>
      genIcons(svgPath, outputDir, templateStr, useSvgo, themeByFile)
        .then(({ outputPath, fileName }) => {
          iconFileNames.push(fileName);
          console.log(chalk.green(outputPath, '生成成功'));
        })
        .catch(error => {
          console.log(chalk.yellow(svgPath, '生成失败'));
          console.error(error);
        }))
  );
  try {
    await genIndex(outputDir, iconFileNames);
    if (types) {
      if (!path.isAbsolute(types)) {
        types = path.join(process.cwd(), types);
      }
      await genTypes(outputDir, types);
    }
  } catch (error) {
    console.error(error);
  }
}

const options = yargs
  .scriptName('generate-svg-icons')
  .options({
    types: {
      type: 'string',
      description: '类型文件'
    },
    outputDir: {
      alias: 'o',
      type: 'string',
      description: '图标输出路径',
    },
    svgTemplate: {
      alias: 't',
      type: 'string',
      description: 'svg模板文件地址',
    },
    useSvgo: {
      alias: 's',
      type: 'boolean',
      description: '是否使用svgo',
      default: false,
    },
    themeByFile: {
      alias: 'f',
      type: 'boolean',
      description: '是否通过文件名区分主题',
      default: false,
    },
  })
  .help()
  .argv;
try {
  main(options as any);
} catch (error) {
  console.error(chalk.red(error, '生成失败'));
}


