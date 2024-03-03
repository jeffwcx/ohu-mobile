import iconCommand from './icon/command';
import docCommand from './doc/command';
import { yargsInstance, t } from './locale';
import { loadConfig } from './project';

async function main() {
  const projectConfig = await loadConfig();
  return yargsInstance
    .scriptName('ohu')
    .usage('$0 <cmd> [options]', t('desc'))
    .recommendCommands()
    .version()
    .pkgConf('ohu')
    .command(iconCommand(projectConfig.config))
    .command(docCommand)
    .alias('v', 'version')
    .alias('h', 'help')
    .help().argv;
}

main();
