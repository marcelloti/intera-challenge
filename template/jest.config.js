module.exports = {
  bail: true,
  clearMocks: true,
  coverageDirectory: "<rootDir>/test/coverage",
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
      isolatedModules: true
    }
  },
  transform: {
    "^.+\\.ts?$": "ts-jest"
  },
  rootDir: "./",
  moduleNameMapper: {
    "@src/(.*)": ["<rootDir>/src/$1"]
  },
  moduleFileExtensions: ["ts", "tsx", "js", "json"],
  testEnvironment: "node",
  testMatch: ["<rootDir>/test/**/*.(test|spec).(ts|tsx|js)"],
  setupFilesAfterEnv: ["<rootDir>/test/jest.setup.js"]
};
