import chalk from 'chalk';
import ora, { Ora } from 'ora';
import { CommandModule, type InferredOptionTypes, type ArgumentsCamelCase } from 'yargs';
import { t } from '../locale';
import { IconCommandOptions, OhuOptions } from '../types';
import { buildIcon } from './index';
import defaultConfig from './defaultConfig';

const options = {
  type: {
    type: 'string',
    alias: 'i',
    description: t('icon.typeDesc'),
    require: false,
  },
  outputDir: {
    alias: 'o',
    type: 'string',
    description: t('icon.outputDirDesc'),
    default: defaultConfig.outputDir,
  },
  template: {
    alias: 't',
    type: 'string',
    description: t('icon.templateDesc'),
    require: false,
  },
  noIndex: {
    type: 'boolean',
    description: t('icon.noIndexDesc'),
    require: false,
    default: defaultConfig.noIndex,
  },
  sortDir: {
    type: 'boolean',
    description: t('icon.sortDirDesc'),
    default: defaultConfig.sortDir,
  },
  noThemeSuffix: {
    type: 'boolean',
    description: t('icon.noThemeSuffixDesc'),
    default: defaultConfig.noThemeSuffix,
    demandOption: 'sortDir',
  },
  includedThemes: {
    type: 'array',
    description: t('icon.includedThemesDesc'),
    default: defaultConfig.includedThemes,
  },
  uniqueId: {
    type: 'boolean',
    description: t('icon.uniqueIdDesc'),
    default: defaultConfig.uniqueId,
  },
  taskChunk: {
    alias: 'c',
    type: 'number',
    description: t('icon.taskChunkDesc'),
    default: defaultConfig.taskChunk,
  },
  tsx: {
    type: 'boolean',
    description: t('icon.tsx'),
    default: defaultConfig.tsx,
  },
  vue: {
    type: 'boolean',
    description: t('icon.vue'),
    default: defaultConfig.vue,
  },
} as const;

type IconCommandArgs = InferredOptionTypes<typeof options>;
type IconModule = CommandModule<object, IconCommandArgs>;

function buildIconForCommand(options: ArgumentsCamelCase<IconCommandArgs>, spinner: Ora) {
  return buildIcon({
    ...options as unknown as IconCommandOptions,
    onStart: () => {
      spinner.start();
    },
    onProgress: ({ count, total, fileName }) => {
      spinner.text = chalk.cyan(`${count}/${total} ${fileName} ${t('icon.genSuccess')}`)
    },
    onIconsGenerated: () => {
      spinner.succeed(chalk.green(t('icon.iconsGenSuccess'))).start();
    },
    onIndexFileGenerated: () => {
      spinner.succeed(chalk.green(t('icon.indexFileGenSuccess'))).start();
    },
    onTypeFileGenerated: () => {
      spinner.succeed(chalk.green(t('icon.typeFileGenSuccess'))).start();
    },
  });
}

export default function createIconCommand(globalOptions: OhuOptions): IconModule {
  return {
    command: 'icon [globs]',
    describe: t('icon.desc'),
    aliases: ['svg', 'icons'],
    handler: (options) => {
      const spinner = ora({
        discardStdin: false,
        text: chalk.cyan(t('icon.start')),
        spinner: 'material',
        color: 'cyan',
      });
      buildIconForCommand(options, spinner).then(() => {
        spinner.start()
          .stopAndPersist({
            text: chalk.green(t('icon.allGenSuccess')),
            symbol: '🎉',
          });
      }).catch((error) => {
        spinner.start()
          .fail(chalk.black.bgRed(t('icon.allGenFail')));
        console.error(error);
      });
    },
    builder: (yargs) => {
      let y = yargs
        .positional('globs', {
          type: 'string',
          description: t('icon.sourceDesc'),
        })
        .options(options)
        .example([
          ['$0 icon ./remixicon -o ./icons', t('icon.example1')],
          ['$0 icon ./remixicon -o ./icons --sort-dir', t('icon.example2')],
          ['$0 icon ./remixicon -o ./icons --tsx', t('icon.example3')],
          ['$0 icon ./remixicon -o ./icons --vue', t('icon.example4')],
          ['$0 icon ./remixicon -o ./icons -t ./custom.art', t('icon.example5')],
        ]);
      if (globalOptions.icon) {
        y = y.config(globalOptions.icon);
      }
      process.env.NODE_ENV === 'debug' && console.log(y.argv);
      return y;
    },
  };
}
