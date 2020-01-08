module.exports = {
  presets: [
    '@vue/babel-preset-jsx',
    ['@babel/preset-env', {
      'targets': {
        'browsers': ['iOS >= 8', 'Android >= 4']
      }
    }],
  ],
  plugins: ['@babel/plugin-proposal-optional-chaining', '@babel/plugin-syntax-dynamic-import'],
}
