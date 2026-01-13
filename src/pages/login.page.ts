import { Page, expect } from '@playwright/test';
import { config } from '../config/env.config';

export class LoginPage {
  constructor(private readonly page: Page) {}

  async goto(url: string = '/') {
    const baseUrl = config.baseUrl || 'https://example.com';
    const fullUrl = url.startsWith('http') ? url : `${baseUrl.replace(/\/$/, '')}${url}`;
    await this.page.goto(fullUrl);
  }

  async login(username: string, password: string) {
    await this.page.fill('#username', username);
    await this.page.fill('#password', password);
    await this.page.click('#login');
  }

  async assertDashboardVisible() {
    await expect(this.page.locator('#dashboard')).toBeVisible();
  }
}
