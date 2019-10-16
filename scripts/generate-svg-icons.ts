import * as glob from 'glob';
import * as path from 'path';
import * as util from 'util';
import * as fs from 'fs-extra';
import * as rimraf from 'rimraf';
import * as yargs from 'yargs';
import chalk from 'chalk';
import SVGO from 'svgo';
import * as art from 'art-template';

const globAsync = util.promisify(glob);

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

export function transformToCamelCase(name: string) {
  return name.split('-').map(str => {
    return str[0].toUpperCase() + str.substring(1);
  }).join('');
}

export function upperCaseFirstLetter(str: string) {
  if (str) {
    return str[0].toUpperCase() + str.substring(1);
  }
  return '';
}

async function genIcons(svgPath: string, outputPath: string, template: string, useSvgo?: boolean) {
  const { name, dir } = path.parse(svgPath);
  const dirNameArr = dir.split(path.sep);
  const theme = dirNameArr[dirNameArr.length - 1];
  const themeInFileName = transformToCamelCase(theme);
  const fileName = transformToCamelCase(name) + upperCaseFirstLetter(themeInFileName);
  let fileContent = await fs.readFile(svgPath, 'utf8');
  if (useSvgo) {
    const { data } = await svgo.optimize(fileContent, { path: svgPath });
    fileContent = data;
  }
  let attrs = {};
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
    ext: '.tsx',
  });
  const outputFileData = art.render(template, {
    ...attrs,
    name,
    fileName,
    theme,
    children,
  });
  await fs.writeFile(outputFilePath, outputFileData);
  return {
    outputPath: outputFilePath,
    fileName,
    theme,
    name,
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

interface Options {
  outputDir: string;
  _: string[];
  svgTemplate: string;
  useSvgo: boolean;
}

async function main ({ outputDir, _, svgTemplate, useSvgo }: Options) {
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
  const iconFileNames = [];
  await Promise.all(svgPaths.map(
    (svgPath) =>
      genIcons(svgPath, outputDir, templateStr, useSvgo)
        .then(({ outputPath, fileName }) => {
          iconFileNames.push(fileName);
          console.log(chalk.green(outputPath, '生成成功'));
        })
        .catch(error => {
          console.log(chalk.red(svgPath, '生成失败'));
          console.error(error);
        }))
  );
  try {
    await genIndex(outputDir, iconFileNames);
  } catch (error) {
    console.error(error);
  }
}

const options = yargs
  .scriptName('generate-svg-icons')
  .options({
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
  })
  .help()
  .argv;

main(options as any);


