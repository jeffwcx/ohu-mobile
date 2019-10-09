const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

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
  config.resolve.extensions.push('.ts', '.tsx');
  return config;
};
