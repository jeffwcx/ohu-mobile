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

const extensions = [ '.js', '.jsx', '.ts', '.tsx' ];
export default {
  input: './src/index.ts',
  output: [{
    file: 'dist/ohu-mobile.js',
    format: 'umd',
    name: 'ohu-mobile',
    globals: {
      vue: 'Vue'
    },
    sourcemap: true,
  }, {
    file: 'dist/ohu-mobile.min.js',
    format: 'umd',
    name: 'ohu-mobile',
    globals: {
      vue: 'Vue'
    },
    sourcemap: true,
  }, {
    file: 'dist/ohu-mobile.es.js',
    format: 'es',
    sourcemap: true,
  }, {
    file: 'dist/ohu-mobile.es.min.js',
    format: 'es',
    sourcemap: true,
  }],
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
      output: 'dist/ohu-mobile.css',
      options: {
        includePaths: [ 'src/_styles' ],
        data: `${generateScss(variables)}
          ${generateScss(componentVariables)}
          @import "mixins";`,
      },
      processor: css =>
        postcss([
          autoprefixer,
          require('postcss-pxtorem')({
            rootValue: 75,
            propList: ['*', '!border'],
            minPixelValue: 2,
          }),
        ]).process(css)
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
