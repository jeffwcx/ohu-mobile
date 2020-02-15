module.exports = {
  transform: {
    '.(ts|tsx)': 'ts-jest',
  },
  testPathIgnorePatterns: ['/node_modules/', '/lib/', '/lib-rem/'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
  ],
  testRegex: '(/test/.*|\\.(test|spec))\\.(ts|tsx|js)$',
  coverageDirectory: './coverage',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  snapshotSerializers: ['jest-serializer-vue'],
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json',
      babelConfig: {
        presets: [
          '@vue/babel-preset-jsx',
          ['@babel/preset-env', {
            'targets': {
              'browsers': ['iOS >= 8', 'Android >= 4']
            }
          }],
        ],
      },
    },
  },
};
