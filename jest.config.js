module.exports = {
  'verbose': true,
  'roots': [
    'app/javascript/__tests__',
  ],
  'moduleDirectories': [
    'node_modules',
    'app/javascript',
  ],
  'moduleNameMapper': {
    '^@/(.*)$': '<rootDir>/app/javascript/$1',
  },
  'moduleFileExtensions': [
    'js',
    'vue',
  ],
  'transform': {
    '.+\\.js$': 'babel-jest',
    '.+\\.vue$': 'vue-jest',
  },
  'testPathIgnorePatterns': [
    '<rootDir>/config/webpack/',
  ],
  'snapshotSerializers': [
    'jest-serializer-vue',
  ],
};
