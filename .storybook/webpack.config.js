const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const path = require('path');
const fs = require('fs');
const  { generateScssVars } = require('./generate-scss-data');
const variables = require('../src/components/_styles/variables');
const componentVariables = require('../src/components/_styles/component.variables');

function resolve(relativeUrl) {
  return path.resolve(__dirname, relativeUrl);
}
module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      {
        loader: 'babel-loader',
      },
      {
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
          happyPackMode: false,
          appendTsxSuffixTo: [
            '\\.vue$'
          ],
        }
      },
    ],
  }, {
    test: /\.(scss|sass)$/,
    include: [
      resolve('../src')
    ],
    use: [
      'vue-style-loader',
      {
        loader: 'css-loader',
      },
      {
        loader: 'postcss-loader',
      },
      {
        loader: 'sass-loader',
        options: {
          prependData: `${generateScssVars(variables)}${generateScssVars(componentVariables)}`,
        },
      },
      {
        loader: 'style-resources-loader',
        options: {
          patterns: [
            // resolve('../src/components/_styles/variables.scss'),
            // resolve('../src/components/_styles/component.variables.scss'),
            resolve('../src/components/_styles/mixins.scss'),
          ]
        }
      },
    ],
  });
  config.plugins.push(
    new ForkTsCheckerWebpackPlugin(
      {
        vue: true,
        tslint: false,
        formatter: 'codeframe',
        checkSyntacticErrors: false
      }
    )
  );
  config.resolve.extensions.push('.ts', '.tsx', '.md');
  return config;
};
