import { cosmiconfig } from 'cosmiconfig';

const explorer = cosmiconfig('ohu');

export function loadConfig() {
  return explorer.search();
}
