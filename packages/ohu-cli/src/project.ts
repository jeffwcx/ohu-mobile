import { cosmiconfigSync } from 'cosmiconfig';

const explorer = cosmiconfigSync('ohu');

export function loadConfig() {
  return explorer.search();
}
