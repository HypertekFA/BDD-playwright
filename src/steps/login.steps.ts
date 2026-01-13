import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import type { CustomWorld } from '../world/custom-world';
import { LoginPage } from '../pages/login.page';
import { config } from '../config/env.config';

Given('I am on the login page', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page!);
  await loginPage.goto();
});

When('I login as {string}', async function (this: CustomWorld, username: string) {
  const loginPage = new LoginPage(this.page!);
  const password = config.defaultCredentials.password;
  this.currentUser = { username, password };
  await loginPage.login(username, password);
});

Given('I have a random user in the database', async function (this: CustomWorld) {
  const email = faker.internet.email();
  const password = faker.internet.password();
  const dbUtil = await this.getDbUtil();
  
  await dbUtil.insert(
    'INSERT INTO Users (Email, Password) VALUES (@email, @password)',
    { email, password }
  );
  
  this.currentUser = { username: email, password };
});

When('I login with that user', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page!);
  await loginPage.login(this.currentUser!.username, this.currentUser!.password);
});

Then('I should see the dashboard', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page!);
  await loginPage.assertDashboardVisible();
});
