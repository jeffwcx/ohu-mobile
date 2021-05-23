module.exports = {
  transform: {
    '.(ts|tsx)': 'ts-jest',
  },
  testPathIgnorePatterns: ['/node_modules/', '/lib/'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
  ],
  testRegex: '(/test/.*|\\.(test|spec))\\.(ts|js)$',
  coverageDirectory: './coverage',
  moduleFileExtensions: ['ts', 'js', 'json'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
};
