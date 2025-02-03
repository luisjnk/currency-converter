const esmModules = ['swiper', 'ssr-window', 'dom7'];

module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    transform: {
        '^.+\\.(ts|tsx|js|jsx|cjs)$': 'babel-jest',
        '^.+\\.mjs$': 'jest-esm-transformer',
    },
    transformIgnorePatterns: [
        `node_modules/(?!(?:.pnpm/)?(${esmModules.join('|')}))`,
    ],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node', 'mjs'],
    moduleNameMapper: {
        '\\.css$': '<rootDir>/src/__mocks__/styleMock.js',
    },
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
    testMatch: [
        '**/__tests__/**/*.[jt]s?(x)',
        '**/?(*.)+(spec|test).[tj]s?(x)'
    ],
};