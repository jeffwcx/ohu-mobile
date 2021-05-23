import { CommandModule } from 'yargs';
import l from '../locale';

export default {
  command: 'doc <source>',
  describe: l('doc.desc'),
  aliases: ['md'],
  builder: (yargs) => {
    return yargs
      .positional('source', {
        type: 'string',
        description: '入口文件',
        require: true,
      })
      .example([
        ['$0 doc src/index.ts'],
      ]);
  },
  handler: (options) => {
    // todo
  },
} as CommandModule<{}, {}>;
