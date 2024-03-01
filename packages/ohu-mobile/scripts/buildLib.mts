import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'fs-extra';
import * as glob from 'glob';
import * as babel from '@babel/core';
import * as sass from 'sass';
import autoprefixer from 'autoprefixer';
import yargs from 'yargs';
import ora from 'ora';
import chalk from 'chalk';
import postcss, { Result } from 'postcss';
import px2Rem from 'postcss-pxtorem';

async function compileES(
  file: string,
  babelConfig: string,
) {
  try {
    const result = await babel.transformFileAsync(file, {
      configFile: babelConfig,
      sourceMaps: true,
    });
    if (!result) {
      return;
    }
    return result;
  } catch (error) {
    console.log(chalk.redBright(error));
  }
}

interface CompileScriptOptions {
  // compilerOptions: ts.CompilerOptions;
  babelConfig: string;
  inputPath: string;
  outputPath: string;
}

// compile esnext to es5
async function compileScripts(
  files: string[],
  {
    babelConfig,
  }: CompileScriptOptions,
) {
  const tasks = files.map((file) => {
    return compileES(file, babelConfig)
      .then(async (result) => {
        if (!result) return;
        let { code, map } = result;
        const { dir, name } = path.parse(file);
        if (!await fs.pathExists(dir)) {
          await fs.mkdirp(dir);
        }
        await fs.remove(file);
        const filename = name + '.js';
        if (code) {
          await fs.writeFile(path.join(dir, filename), code);
        }
        if (map) {
          await fs.writeFile(path.join(dir, filename + '.map'), JSON.stringify(map));
        }
      });
  });
  await Promise.all(tasks);
}

// using postcss and sass to compile

function usePostcss(css: string, cssPath: string, useRem = false): Promise<Result> {
  return new Promise(async (resolve) => {
    const plugins: any[] = [
      autoprefixer,
    ];
    if (useRem) {
      plugins.push(
        px2Rem({
          rootValue: 75,
          propList: ['*', '!border'],
          minPixelValue: 2,
        }),
      );
    }
    postcss(plugins).process(css, { from: cssPath, to: cssPath }).then((result) => {
      resolve(result);
    });
  });
}

const currentDir = path.dirname(fileURLToPath(import.meta.url))
const projectDir = path.resolve(currentDir, '../');

function compileSass(file: string) {
  return sass.compileAsync(file, {
    loadPaths: [ 'src/_styles', 'node_modules' ],
    sourceMap: true,
    importers: [
      new sass.NodePackageImporter(projectDir),
    ],
  });
}

async function compileStyle(file: string) {
  const sassResult = await compileSass(file);
  return {
    code: sassResult.css,
    map: sassResult.sourceMap,
  };
}


async function compileStyles(
  files: string[],
  { inputPath, outputPath, useRem }: {
    inputPath: string;
    outputPath: string;
    useRem?: boolean;
  }) {
  const tasks = files.map((file) => {
    const relativePath = path.relative(inputPath, file);
    const sassPath = path.join(outputPath, relativePath);
    const cssPath = sassPath.replace('.scss', '.css');
    spinner.text = '🚀 SCSS file proccessing';
    return compileStyle(file)
      .then(async ({ code }) => {
        const { dir } = path.parse(cssPath);
        if (!await fs.pathExists(dir)) {
          await fs.mkdirp(dir);
        }
        await fs.writeFile(cssPath, code.toString());
        spinner.text = 'SCSS file processing succeed, transfer to postcss';
        return cssPath;
      }).then(async (cssPath: string) => {
        const css = await fs.readFile(cssPath, { encoding: 'utf8' });
        const result = await usePostcss(css, cssPath, useRem);
        await fs.writeFile(cssPath, result.css);
        spinner.text = 'PostCSS proccessing succced!';
      });
  });
  await Promise.all(tasks);
}

async function copyStyles(
  files: string[],
  { inputPath, outputPath }:
  { inputPath: string, outputPath: string }
) {
  const tasks = files.map((file) => {
    const relativePath = path.relative(inputPath, file);
    const sassPath = path.join(outputPath, relativePath);
    return fs.readFile(file)
      .then(async ( data ) => {
        const { dir } = path.parse(sassPath);
        if (!await fs.pathExists(dir)) {
          await fs.mkdirp(dir);
        }
        await fs.writeFile(sassPath, data);
      });
  });
  await Promise.all(tasks);
}

interface BuildLibOptions {
  target: string;
  outputDir: string;
  babelConfig: string;
  useRem?: boolean;
  // tsconfig: string;
  // files: string;
}

function transformPath(p: string) {
  if (!path.isAbsolute(p)) {
    return path.join(process.cwd(), p);
  }
  return p;
}

async function main(options: BuildLibOptions) {
  const inputPath = transformPath(options.target);
  const outputPath = transformPath(options.outputDir);
  const babelConfig = transformPath(options.babelConfig);
  const allJsFilePath = path.join(outputPath, '**/*.+(js|jsx)');
  const allInputStyleFilePath = path.join(inputPath, '**/index.+(sass|scss)');
  const scriptFiles = glob.sync(allJsFilePath);
  spinner.start('🚀 Start to compile scripts');
  try {
    await compileScripts(scriptFiles, { babelConfig, inputPath, outputPath });
  } catch (error) {
    spinner.fail('Compile scripts error');
    console.error(error);
    process.exitCode = 1;
    return;
  }
  spinner.succeed('Script compiled');
  spinner.start('🚀 Start to compile SCSS');
  const styleFiles = glob.sync(allInputStyleFilePath);
  spinner.start('🚀 Start to copy SCSS files');
  const allStyleFilePath = path.join(inputPath, '**/*.+(sass|scss)');
  const styleFilePaths = glob.sync(allStyleFilePath);
  try {
    await copyStyles(styleFilePaths, { inputPath, outputPath });
    spinner.succeed('SCSS files copied');
  } catch (error) {
    spinner.fail('SCSS files copy failed');
    console.error(error);
    process.exitCode = 1;
    return;
  }

  try {
    await compileStyles(styleFiles, { inputPath, outputPath, useRem: options.useRem });
    spinner.succeed('SCSS files compiled successfully');
  } catch (error) {
    spinner.fail('SCSS files compiltion failed');
    console.error(error);
    process.exitCode = 1;
    return;
  }
  spinner.succeed('All files compiled successfully');
  spinner.clear();
}


const options = yargs(process.argv.slice(2))
  .scriptName('build-lib')
  .options({
    target: {
      alias: 't',
      type: 'string',
      description: 'files to be compiled',
    },
    outputDir: {
      alias: 'o',
      type: 'string',
      description: 'output directory',
    },
    babelConfig: {
      alias: 'b',
      type: 'string',
      description: 'babel config file path',
    },
    useRem: {
      type: 'boolean',
      description: 'using rem?（default is false） | 是否使用rem（默认不使用）',
      default: false,
    },
  }).help().parse();

const spinner = ora('🚀 Start compiling').start();
main(options as BuildLibOptions);
