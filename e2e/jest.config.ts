import { JestConfigWithTsJest } from "ts-jest";

const jestConfig: JestConfigWithTsJest = {
  preset: "ts-jest",
  testEnvironment: "node",
  //testMatch: ["**/e2e/**/*.test.ts"], // ✅ Runs only E2E tests
  testMatch: ["**/e2e/rpc/*.test.ts"],
  globalSetup: './jest.globalSetup.ts',
  globalTeardown: './jest.globalTeardown.ts',
  //setupFilesAfterEnv: ["./setup.ts"], // ✅ Runs setup only for E2E tests
  testTimeout: 30000, // Increase timeout for long-running tests
  extensionsToTreatAsEsm: [".ts"], // ✅ Treat .ts files as ES modules
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { tsconfig: 'tsconfig.json', isolatedModules: true }]
  },
  forceExit: true,
  resetMocks: false,  // Set to false if not needed
  resetModules: false, // Avoid resetting modules if unnecessary
  clearMocks: true,  
};

export default jestConfig;