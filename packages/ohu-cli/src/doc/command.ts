import { CommandModule } from 'yargs';
import { t } from '../locale';

export default {
  command: 'doc <source>',
  describe: t('doc.desc'),
  aliases: ['md'],
  builder: (yargs) => {
    return yargs
      .positional('source', {
        type: 'string',
        description: '入口文件',
        require: true,
      })
      .example([['$0 doc src/index.ts']]);
  },
  handler: (options) => {
    // todo
  },
} as CommandModule<{}, {}>;
