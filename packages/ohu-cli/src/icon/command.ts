import chalk from 'chalk';
import ora from 'ora';
import { CommandModule } from 'yargs';
import l from '../locale';
import { IconCommandOptions, OhuOptions } from '../types';
import { buildIcon } from './index';
import defaultConfig from './defaultConfig';

type IconModule = CommandModule<{}, IconCommandOptions>;

const iconCommandModule: Omit<IconModule, 'handler'>= {
  command: 'icon [globs]',
  describe: l('icon.desc'),
  aliases: ['svg', 'icons'],
};


export default function createIconCommand(globalOptions: OhuOptions): IconModule {
  return {
    ...iconCommandModule,
    handler: (options) => {
      const spinner = ora({
        discardStdin: false,
        text: chalk.cyan(l('icon.start')),
        spinner: 'material',
        color: 'cyan',
      });
      buildIcon(options, { spinner }).then(() => {
        spinner.start()
          .stopAndPersist({
            text: chalk.green(l('icon.allGenSuccess')),
            symbol: '🎉',
          });
      }).catch((error) => {
        spinner.start()
          .fail(chalk.black.bgRed(l('icon.allGenFail')));
        console.error(error);
      });
    },
    builder: (yargs) => {
      let y = yargs
        .positional('globs', {
          type: 'string',
          description: l('icon.sourceDesc'),
        })
        .options({
          type: {
            type: 'string',
            alias: 'i',
            description: l('icon.typeDesc'),
            require: false,
          },
          outputDir: {
            alias: 'o',
            type: 'string',
            description: l('icon.outputDirDesc'),
            default: defaultConfig.outputDir,
          },
          template: {
            alias: 't',
            type: 'string',
            description: l('icon.templateDesc'),
            require: false,
          },
          noIndex: {
            type: 'boolean',
            description: l('icon.noIndexDesc'),
            require: false,
            default: defaultConfig.noIndex,
          },
          sortDir: {
            type: 'boolean',
            description: l('icon.sortDirDesc'),
            default: defaultConfig.sortDir,
          },
          noThemeSuffix: {
            type: 'boolean',
            description: l('icon.noThemeSuffixDesc'),
            default: defaultConfig.noThemeSuffix,
            demandOption: 'sortDir',
          },
          includedThemes: {
            type: 'array',
            description: l('icon.includedThemesDesc'),
            default: defaultConfig.includedThemes,
          },
          dynamicId: {
            type: 'boolean',
            description: l('icon.dynamicIdDesc'),
            default: defaultConfig.dynamicId,
          },
          taskChunk: {
            alias: 'c',
            type: 'number',
            description: l('icon.taskChunkDesc'),
            default: defaultConfig.taskChunk,
          },
          tsx: {
            type: 'boolean',
            description: l('icon.tsx'),
            default: defaultConfig.tsx,
          },
          vue: {
            type: 'boolean',
            description: l('icon.vue'),
            default: defaultConfig.vue,
          },
        })
        .example([
          ['$0 icon ./remixicon -o ./icons', l('icon.example1')],
          ['$0 icon ./remixicon -o ./icons --sort-dir', l('icon.example2')],
          ['$0 icon ./remixicon -o ./icons --tsx', l('icon.example3')],
          ['$0 icon ./remixicon -o ./icons --vue', l('icon.example4')],
          ['$0 icon ./remixicon -o ./icons -t ./custom.art', l('icon.example5')],
        ]);
      if (globalOptions.icon) {
        y = y.config(globalOptions.icon);
      }
      process.env.NODE_ENV === 'debug' && console.log(y.argv);
      return y;
    },
  };
}
