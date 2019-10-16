import typescript from 'rollup-plugin-typescript';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import progress from 'rollup-plugin-progress';
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';
import sass from 'rollup-plugin-sass';


export default {
  input: './src/components/index.ts',
  output: [{
    file: 'dist/ohu-mobile.umd.js',
    format: 'umd',
    name: 'ohu-mobile',
    globals: {
      vue: 'Vue'
    },
  }, {
    file: 'dist/ohu-mobile.es.js',
    format: 'es',
  }],
  plugins: [
    resolve(),
    commonjs({
      include: 'node_modules/**',
      namedExports: {
        'vue-tsx-support': ['componentFactory'],
      },
    }),
    typescript(),
    // sass + postcss
    sass({
      output: 'dist/ohu-mobile.css',
      processor: css =>
        postcss([
          autoprefixer,
          require('postcss-pxtorem')({
            rootValue: 75,
            propList: ['*', '!border'],
            minPixelValue: 2,
          }),
        ]).process(css)
          .then(result => result.css),
    }),
    progress(),
  ],
  external: ['vue'],
};
