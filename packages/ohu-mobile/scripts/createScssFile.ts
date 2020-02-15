import * as vars from '../src/_config/variables';
import * as fs from 'fs-extra';
import * as path from 'path';
import generateScssVars from './generateScss';

async function main() {
  await fs.writeFile(path.resolve(__dirname, '../src/_styles/variables.scss'), generateScssVars(vars));
}

main();


