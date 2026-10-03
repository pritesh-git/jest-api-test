import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/?(*.)+(spec|test).ts"],
  moduleNameMapper: {
    "^@src/(.*)$": "<rootDir>/src/$1",
    "^@tests/(.*)$": "<rootDir>/tests/$1",
  },
  verbose: true,
  clearMocks: true,
  resetMocks: true,
  coverageDirectory: "./coverage",
  collectCoverageFrom: ["src/**/*.ts", "!src/**/*.d.ts", "!src/**/index.ts"],
  coverageReporters: ["text", "text-summary", "lcov", "html"],
  testTimeout: 25000,
};

export default config;
