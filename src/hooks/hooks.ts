import { After, AfterAll, Before, BeforeAll, ITestCaseHookParameter, setDefaultTimeout } from '@cucumber/cucumber';
import type { CustomWorld } from '../world/custom-world';

setDefaultTimeout(60_000);

BeforeAll(async function () {
  // global init if needed
});

Before(async function (this: CustomWorld) {
  await this.initBrowser();
  await this.initContext();
  // Database connection will be established on-demand when getDb() is called
});

After(async function (this: CustomWorld, scenario: ITestCaseHookParameter) {
  if (scenario.result?.status === 'FAILED' && this.page) {
    const buffer = await this.page.screenshot({ fullPage: true, path: `reports/screenshots/${Date.now()}.png` });
    await this.attach(buffer, 'image/png');
  }

  if (this.context) await this.context.close();
  if (this.browser) await this.browser.close();
  
  // Close database connection if available
  if (this.dbUtil) {
    await this.dbUtil.close();
  } else {
    // Fallback if dbUtil wasn't created
    const db = await this.getDb();
    if (db) await db.close();
  }
});

AfterAll(async function () {
  // global cleanup
});