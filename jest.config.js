module.exports = {
  preset: 'ts-jest',
  testTimeout: 100000,
  testEnvironment: 'node',
  testMatch: ['**/test/**/*.spec.ts'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/types/**/*.ts',
    '!<rootDir>/src/generated/**/*.ts',
  ],
  transform: {
    '^.+\\.ts$': ['ts-jest', {
      diagnostics: false,
      isolatedModules: true,
    }],
  },
};
