module.exports = {
  setupFilesAfterEnv: [
    '<rootDir>/src/setupTests.js',
    './node_modules/jest-enzyme/lib/index.js',
  ],
  moduleNameMapper: {
    '\\.(css|less)$': '<rootDir>/src/__mock__/styleMock.js',
    // '\\.(gif|ttf|eot|svg)$': '<rootDir>/src/__mock__/fileMock.js',
  }
}
