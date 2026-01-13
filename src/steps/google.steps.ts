import { Given, When, Then } from '@cucumber/cucumber';
import type { CustomWorld } from '../world/custom-world';

Given('user is on google page', async function (this: CustomWorld) {
  await this.page!.goto(process.env.DEV_BASE_URL);
});

When('user enter {string} into search box', async function (this: CustomWorld, searchText: string) {
  const searchBox = this.page!.locator('[name="q"]');
  await searchBox.fill(searchText);
});

When('user enter the enter botton', async function (this: CustomWorld) {
  await this.page!.press('[name="q"]', 'Enter');
  // Wait for results to load
  await this.page!.waitForLoadState('networkidle');
});
