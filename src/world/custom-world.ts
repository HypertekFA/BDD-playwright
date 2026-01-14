import { IWorldOptions, setWorldConstructor, World } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page, chromium, firefox, webkit } from 'playwright';
import { config } from '../config/env.config';
import { createDbClient, DbClient } from '../db/mssqlClient';
import { DatabaseUtil } from '../utils/database.util';
import { BrowserUtil } from '../utils/browser.util';
import { getSystemBrowserPath } from '../utils/browser-path.util';

export interface CustomWorld extends World {
  browser?: Browser;
  context?: BrowserContext;
  page?: Page;
  db?: DbClient;
  dbUtil?: DatabaseUtil;
  browserUtil?: BrowserUtil;
  currentUser?: { username: string; password: string };
  initBrowser(): Promise<void>;
  initContext(): Promise<void>;
  getDb(): Promise<DbClient | null>;
  getDbUtil(): Promise<DatabaseUtil>;
  getBrowserUtil(): BrowserUtil;
}

class CustomWorldImpl extends World implements CustomWorld {
  browser?: Browser;
  context?: BrowserContext;
  page?: Page;
  private dbInstance?: DbClient;
  private dbInitialized: boolean = false;
  dbUtil?: DatabaseUtil;
  browserUtil?: BrowserUtil;
  currentUser?: { username: string; password: string };

  get db(): DbClient | undefined {
    return this.dbInstance;
  }

  constructor(options: IWorldOptions) {
    super(options);
  }

  async initBrowser() {
    const browserName = (process.env.BROWSER || 'chromium').toLowerCase();
    const headless = process.env.HEADLESS !== 'false';
    const executablePath = await getSystemBrowserPath(browserName);
    
    if (browserName === 'firefox') {
      this.browser = await firefox.launch({ headless, executablePath });
    } else if (browserName === 'webkit') {
      this.browser = await webkit.launch({ headless, executablePath });
    } else {
      this.browser = await chromium.launch({ headless, executablePath });
    }
  }

  async initContext() {
    if (!this.browser) await this.initBrowser();
    this.context = await this.browser!.newContext();
    this.page = await this.context.newPage();
    await this.page.goto(config.baseUrl);
  }

  async getDb(): Promise<DbClient | null> {
    // Only initialize once, even if called multiple times
    if (this.dbInitialized) {
      return this.dbInstance || null;
    }

    this.dbInitialized = true;

    try {
      this.dbInstance = await createDbClient(config.db);
      return this.dbInstance;
    } catch (error) {
      console.warn('Database connection failed:', error);
      return null;
    }
  }

  async getDbUtil(): Promise<DatabaseUtil> {
    // Get or create the database utility
    if (!this.dbUtil) {
      const db = await this.getDb();
      this.dbUtil = new DatabaseUtil(db);
    }
    return this.dbUtil;
  }

  getBrowserUtil(): BrowserUtil {
    // Get or create the browser utility
    if (!this.browserUtil) {
      if (!this.page) {
        throw new Error('Page is not initialized. Call initContext() first.');
      }
      this.browserUtil = new BrowserUtil(this.page);
    }
    return this.browserUtil;
  }
}

setWorldConstructor(CustomWorldImpl);
