module.exports = {
  moduleFileExtensions: ["js", "json", "ts"],
  transform: {
    "^.+\\.(ts|tsx)$": ["ts-jest", {
      tsconfig: 'tsconfig.json',
    }]
  },
  testMatch: ["**/*.test.(ts|js)"],
  testEnvironment: "node",
  preset: "ts-jest",
}