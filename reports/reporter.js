const report = require("multiple-cucumber-html-reporter");

report.generate({
  jsonDir: "reports",
  reportPath: "reports/html",
  pageTitle: "Integrated Time And Attendece (ITAS APPLICATION)",
  reportName: "ITAS E2E Test Report",
  customData: {
    title: "Test Execution Information",
    data: [
      { label: "Test By", value: "QA Lead Faiz Amiree" },
      { label: "OS", value: process.platform.toUpperCase() },
      { label: "Device", value: "Local machine" },
      { label: "Browser", value: (process.env.BROWSER || "chromium").toUpperCase() },
    ],
  },
  meta: {
    browser: {
      name: process.env.BROWSER || "chromium",
      version: "latest",
    },
    device: "Local machine",
    platform: {
      name: process.platform,
      version: process.env.ENV || "dev",
    },
  },
  displayDuration: true,
  openReportInBrowser: false,
});
