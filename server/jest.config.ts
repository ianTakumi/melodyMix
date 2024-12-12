module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest", // Use ts-jest for TypeScript files
  },
  moduleFileExtensions: ["ts", "tsx", "js", "json"],
  globals: {
    "ts-jest": {
      isolatedModules: true, // Helps in case of large TypeScript files
    },
  },
  roots: ["<rootDir>/src/tests"], // Look for tests in the 'src/tests' directory
};
