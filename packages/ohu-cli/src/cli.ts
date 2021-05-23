import yargs from 'yargs';
import iconCommand from './icon/command';
import docCommand from './doc/command';
import l from './locale';
import { loadConfig } from './project';

const projectConfig = loadConfig();

yargs.scriptName('ohu')
  .usage('$0 <cmd> [options]', l('desc'))
  .recommendCommands()
  .version()
  .pkgConf('ohu')
  .command(iconCommand(projectConfig.config))
  .command(docCommand)
  .alias('v', 'version')
  .alias('h', 'help')
  .help()
  .argv;
