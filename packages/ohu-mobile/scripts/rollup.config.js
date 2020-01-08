import typescript from 'rollup-plugin-typescript';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import progress from 'rollup-plugin-progress';
import babel from 'rollup-plugin-babel';
import sass from 'rollup-plugin-sass';
import filesize from 'rollup-plugin-filesize';
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';
import { terser } from 'rollup-plugin-terser';
import generateScss from './generate-scss';
import variables from '../src/_styles/variables';
import * as componentVariables from '../src/_styles/component.variables';

const isProd = process.env.NODE_ENV === 'production';
const isRem = process.env.CSS_EDITION === 'rem';
let format = isRem ? 'es' : 'umd';
let output = { name: 'ohu-mobile', sourcemap: true, format };
let file = 'dist/ohu-mobile';
if (!isRem) {
  output.globals = {
    vue: 'Vue'
  };
} else {
  file += '.es';
}
if (isProd) {
  file += '.min';
}
file += '.js';
output.file = file;

let sassOutput = 'dist/ohu-mobile';
let plugins = [ autoprefixer ];
if (isRem) {
  plugins.push(
    require('postcss-pxtorem')({
      rootValue: 75,
      propList: ['*', '!border'],
      minPixelValue: 2,
    })
  );
  sassOutput += '.rem';
}
if (isProd) {
  sassOutput += '.min'
}
sassOutput += '.css';


const sassOptions = {};

const extensions = [ '.js', '.jsx', '.ts', '.tsx' ];
export default {
  input: './src/index.ts',
  output: [output],
  plugins: [
    resolve({ extensions }),
    commonjs({
      include: 'node_modules/**',
      namedExports: {
        'vue-tsx-support': ['componentFactory', 'componentFactoryOf', 'component', 'extendFrom', 'ofType'],
      },
    }),
    // sass + postcss
    typescript(),
    sass({
      output: sassOutput,
      options: {
        outputStyle: isProd ? 'compressed' : 'expanded',
        includePaths: [ 'src/_styles' ],
        data: `${generateScss(variables)}
          ${generateScss(componentVariables)}
          @import "mixins";`,
      },
      processor: css =>
        postcss(plugins).process(css)
          .then(result => {
            return result.css;
          }),
    }),
    babel({
      exclude: 'node_modules/**',
      extensions: extensions,
      configFile: '../../babel.config.js'
    }),
    progress(),
    terser({
      include: [/^.+\.min\.js$/],
    }),
    filesize(),
  ],
  external: [
    'vue',
  ],
};
