module.exports = {
  bail: true,
  clearMocks: true,
  coverageDirectory: '<rootDir>/test/coverage',
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
      isolatedModules: true,
    },
  },
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  rootDir: './',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/test/**/*.(test|spec).(ts|tsx|js)'],
};
