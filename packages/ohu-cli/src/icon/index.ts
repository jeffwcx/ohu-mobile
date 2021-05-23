import path from 'path';
import glob from 'glob';
import util from 'util';
import fs from 'fs-extra';
import rimraf from 'rimraf';
import chalk from 'chalk';
import yargs from 'yargs';
import { Ora } from 'ora';
import inquirer from 'inquirer';
import { generateIcon, generateTypeFile, generateIndexFile } from './generate';
import { IconCommandOptions, OhuOptions } from '../types';
import l from '../locale';
import chunk from 'lodash/chunk';

const globAsync = util.promisify<(glob: string) => string[]>(glob as any);

type Options = yargs.Arguments<IconCommandOptions>;

async function generateIcons(
  svgPaths: string[],
  outputDir: string,
  template: string,
  options: IconCommandOptions,
  success?: (result: { count: number, total: number, fileName: string }) => void,
) {
  let count = 0;
  let total = svgPaths.length;
  let result: string[] = [];
  const themeMap: Record<string, boolean> = {};
  const iterateTasks = chunk(svgPaths, options.taskChunk);
  for await (const paths of iterateTasks) {
    const fileNames = await Promise.all(paths.map((svgPath) =>
      generateIcon(svgPath, outputDir, template, options)
        .then(({ fileName, theme }) => {
          count += 1;
          if (theme && !themeMap[theme]) themeMap[theme] = true;
          success && success({ count, total, fileName });
          return fileName;
        })
    ));
    result = result.concat(fileNames);
  }
  return {
    fileNames: result,
    themes: Object.keys(themeMap),
  };
}


interface BuildIconExtraOptions {
  spinner?: Ora;
  global?: OhuOptions;
}

function resolveTemplatePath(p: string) {
  return path.resolve(__dirname, '../../templates/', p);
}

/**
 * Main function to convert svg
 * @param options
 * @param spinner ora instance
 * @returns The path of the converted icon files
 */
export async function buildIcon(options: Options, { spinner }: BuildIconExtraOptions = {}) {
  let {
    outputDir,
    template,
    type,
    globs,
    noIndex,
    dynamicId,
    tsx,
    vue,
  } = options;
  if (!globs) {
    throw new Error(l('icon.globsExistError'));
  }
  if (!template) {
    if (tsx) {
      if (vue) {
        template = resolveTemplatePath('vue-tsx-template.art');
      } else {
        template = resolveTemplatePath('react-template.art');
      }
    } else if (vue) {
      template = resolveTemplatePath('vue-template.art');
    } else if (!dynamicId) {
      template = resolveTemplatePath('default-template.art');
    } else {
      template = resolveTemplatePath('default-dynamic-template.art');
    }
  }
  if (type && !path.isAbsolute(type)) {
    type = path.join(process.cwd(), type);
  }
  if (!path.isAbsolute(outputDir)) {
    outputDir = path.join(process.cwd(), outputDir);
  }
  const isExists = await fs.pathExists(outputDir);
  if (!isExists) {
    await fs.mkdirp(outputDir);
  } else {
    const p = path.resolve(outputDir, '**/*.(tsx|ts|vue)');
    const files = await globAsync(p);
    if (files.length <= 0) {
      const answer = await inquirer.prompt({
        name: 'removeFiles',
        type: 'confirm',
        message: l('icon.removeFilesQuestion'),
        default: true,
      });
      if (answer.removeFiles) {
        rimraf.sync(p);
      }
    }
  }
  if (!path.isAbsolute(globs)) {
    globs = path.join(process.cwd(), globs);
  }
  try {
    const stats = await fs.stat(globs);
    if (stats.isDirectory()) {
      globs = path.resolve(globs, '**/*.svg');
    }
  } catch (error) {}
  if (!path.isAbsolute(template)) {
    template = path.join(process.cwd(), template);
  }
  const svgTplExists = await fs.pathExists(template);
  if (!svgTplExists) {
    throw new Error(l('icon.templateExistError'));
  }
  const [svgPaths, templateStr] = await Promise.all([
    globAsync(globs),
    fs.readFile(template, 'utf8'),
  ]);

  if (svgPaths.length === 0) return;
  spinner && spinner.start();
  const { fileNames, themes } = await generateIcons(
    svgPaths,
    outputDir,
    templateStr,
    options,
    ({ count, total, fileName }) => {
      spinner && (spinner.text = chalk.cyan(`${count}/${total} ${fileName} ${l('icon.genSuccess')}`));
    },
  );
  spinner && spinner.succeed(chalk.green(l('icon.iconsGenSuccess'))).start();
  if (!noIndex) {
    await generateIndexFile(outputDir, fileNames).then(() => {
      spinner && spinner.succeed(chalk.green(l('icon.indexFileGenSuccess'))).start();
    });
  }
  if (type) {
    await generateTypeFile(outputDir, type, themes).then(() => {
      spinner && spinner.succeed(chalk.green(l('icon.typeFileGenSuccess')));
    });
  }
  return fileNames;
}


