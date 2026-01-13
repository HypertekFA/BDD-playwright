module.exports = {
  default: {
    require: ["src/world/**/*.ts", "src/hooks/hooks.ts", "src/steps/**/*.ts"],
    requireModule: ["ts-node/register"],
    paths: ["src/features/**/*.feature"],
    publishQuiet: true,
    format: ["progress", "json:reports/cucumber-report.json"],
    parallel: 2,
  },
};
