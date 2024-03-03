module.exports = {
  presets: [
    '@vue/babel-preset-jsx',
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: ['iOS >= 8', 'Android >= 4'],
        },
      },
    ],
  ],
  plugins: [
    '@babel/plugin-transform-optional-chaining',
    '@babel/plugin-syntax-dynamic-import',
    [
      'import',
      {
        libraryName: '@ohu-mobile/icons',
        libraryDirectory: 'lib',
        camel2DashComponentName: false,
      },
      '@ohu-mobile/icons',
    ],
  ],
};
