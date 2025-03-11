import { JestConfigWithTsJest } from "ts-jest";

const jestConfig: JestConfigWithTsJest = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/e2e/**/*.test.ts"], // ✅ Runs only E2E tests
  setupFilesAfterEnv: ["<rootDir>/setup.ts"], // ✅ Runs setup only for E2E tests
  testTimeout: 30000, // Increase timeout for long-running tests
  extensionsToTreatAsEsm: [".ts"], // ✅ Treat .ts files as ES modules
  globals: {
    "ts-jest": {
      useESM: true, // ✅ Enables ES module support
    },
  },
  forceExit: true
};

export default jestConfig;