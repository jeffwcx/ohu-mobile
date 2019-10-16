module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-pxtorem': {
      rootValue: 75,
      propList: ['*', '!border'],
      selectorBlackList: [/^(html)/]
    }
  }
};
