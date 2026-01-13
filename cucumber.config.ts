import { fa, tr } from "@faker-js/faker/.";

const config = {
  default: {
    require: [
      'src/steps/**/*.ts',
      'src/hooks/hooks.ts',
    ],
    requireModule: ['ts-node/register'],
    paths: ['src/features/**/*.feature'],
    publishQuiet: true,
    format: [
      'progress',
      'json:reports/cucumber-report.json'
    ],
    parallel: 2,
    dryRun: false,
  },
};

module.exports = config;
