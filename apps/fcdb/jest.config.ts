import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
    dir: './',
});

const config: Config = {
    coverageProvider: 'v8',
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        '^@/src/(.*)$': '<rootDir>/src/$1',
    },
    moduleDirectories: ['node_modules', '<rootDir>/'],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    verbose: true,
    testPathIgnorePatterns: ['/node_modules/', '\\.mock\\.ts$'],
};

const jestConfig = createJestConfig(config);
export default jestConfig as Config;
