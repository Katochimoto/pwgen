import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  testEnvironment: 'jsdom',
  preset: 'ts-jest/presets/default-esm',
  roots: [ '<rootDir>/src' ],
  testRegex: '\\.spec\\.tsx?$',
  moduleFileExtensions: [ 'ts', 'tsx', 'js', 'jsx', 'json', 'node' ],
  moduleNameMapper: {
    '@/([^?]*)': '<rootDir>/src/$1',
    '\\.(scss)$': 'identity-obj-proxy',
  },
  clearMocks: true,
  collectCoverage: false,
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/*.spec.{ts,tsx}',
    '!**/node_modules/**',
  ],
  coverageProvider: 'v8',
  coverageReporters: [ 'html', 'json' ],
  coveragePathIgnorePatterns: [ '/node_modules/' ],
  setupFilesAfterEnv: [
    '<rootDir>/tests/config.ts',
  ],
}

export default config
