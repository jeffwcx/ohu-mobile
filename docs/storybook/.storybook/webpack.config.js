const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const tsImportPluginFactory = require('ts-import-plugin');
const path = require('path');
const fs = require('fs');

function resolve(relativeUrl) {
  return path.resolve(__dirname, relativeUrl);
}
module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.stories\.(ts|tsx)$/,
    use: [
      {
        loader: require.resolve('@storybook/source-loader'),
        options: { parser: 'typescript' },
      },
    ],
    enforce: 'pre',
  }, {
    test: /\.(js|jsx|ts|tsx)$/,
    exclude: [resolve('../node_modules')],
    use: [
      {
        loader: 'babel-loader',
        options: {
          configFile: resolve('../../../babel.config.js'),
        },
      },
      {
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
          happyPackMode: false,
          getCustomTransformers: () => ({
            before: [
              tsImportPluginFactory({
                libraryName: '@ohu-mobile/core',
                libraryDirectory: 'lib-rem',
                style: false,
                camel2DashComponentName: false,
              }),
            ],
          }),
          appendTsxSuffixTo: [
            '\\.vue$'
          ],
        }
      },
    ],
  }, {
    test: /\.(scss|sass)$/,
    include: [
      resolve('../src'),
    ],
    use: [
      'vue-style-loader',
      {
        loader: 'css-loader',
      },
      {
        loader: 'postcss-loader',
        options: {
          config: {
            path: resolve('../../../post.config.js'),
          }
        },
      },
      {
        loader: 'sass-loader',
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
  config.resolve.alias['@'] = resolve('../../../packages/ohu-mobile/src');
  return config;
};
