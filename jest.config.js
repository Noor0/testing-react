module.exports = {
  snapshotSerializer: ["enzyme-to-json/serializer"],
  setupFilesAfterEnv: [
    "<rootDir>/src/setupTests.js",
    "jest-enzyme",
    "jest-extended"
  ],
  projects: [
    {
      displayName: "test"
    },
    {
      displayName: "lint",
      runner: "jest-runner-eslint",
      testMatch: ["<rootDir>/**/*.js"]
    }
  ]
};
