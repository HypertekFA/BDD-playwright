import { Page, Locator, expect } from '@playwright/test';

export class BrowserUtil {
  constructor(private readonly page: Page) {}

  /**
   * Fill an input field with the given text
   */
  async fillInput(locator: string | Locator, text: string): Promise<void> {
    const element = this.getLocator(locator);
    await element.fill(text);
  }

  /**
   * Clear an input field
   */
  async clearInput(locator: string | Locator): Promise<void> {
    const element = this.getLocator(locator);
    await element.clear();
  }

  /**
   * Fill and then clear (useful for autocomplete fields)
   */
  async clearAfterFill(locator: string | Locator, text: string): Promise<void> {
    const element = this.getLocator(locator);
    await element.clear();
    await this.page.waitForTimeout(500); // Wait for dropdown to appear
      await element.fill(text);
  }

  /**
   * Type text character by character (slower, more realistic)
   */
  async typeText(locator: string | Locator, text: string, delay: number = 50): Promise<void> {
    const element = this.getLocator(locator);
    await element.focus();
    for (const char of text) {
      await element.press(char);
      await this.page.waitForTimeout(delay);
    }
  }

  /**
   * Get the value of an input field
   */
  async getInputValue(locator: string | Locator): Promise<string> {
    const element = this.getLocator(locator);
    return await element.inputValue();
  }

  /**
   * Click on an element
   */
  async click(locator: string | Locator, options?: { button?: 'left' | 'right' | 'middle'; clickCount?: number; delay?: number }): Promise<void> {
    const element = this.getLocator(locator);
    await element.click(options);
  }

  /**
   * Double click on an element
   */
  async doubleClick(locator: string | Locator): Promise<void> {
    const element = this.getLocator(locator);
    await element.dblclick();
  }

  /**
   * Right click on an element
   */
  async rightClick(locator: string | Locator): Promise<void> {
    const element = this.getLocator(locator);
    await element.click({ button: 'right' });
  }

  /**
   * Hover over an element
   */
  async hover(locator: string | Locator): Promise<void> {
    const element = this.getLocator(locator);
    await element.hover();
  }

  /**
   * Select option from dropdown by text
   */
  async selectByText(locator: string | Locator, text: string): Promise<void> {
    const element = this.getLocator(locator);
    await element.selectOption({ label: text });
  }

  /**
   * Select option from dropdown by value
   */
  async selectByValue(locator: string | Locator, value: string): Promise<void> {
    const element = this.getLocator(locator);
    await element.selectOption(value);
  }

  /**
   * Select multiple options from a multi-select dropdown
   */
  async selectMultiple(locator: string | Locator, values: string[]): Promise<void> {
    const element = this.getLocator(locator);
    await element.selectOption(values);
  }

  /**
   * Get all selected options from dropdown
   */
  async getSelectedOptions(locator: string | Locator): Promise<string[]> {
    const element = this.getLocator(locator);
    return await element.evaluate((select: any) => {
      return Array.from(select.selectedOptions).map((option: any) => option.value);
    });
  }

  /**
   * Check a checkbox or radio button
   */
  async check(locator: string | Locator): Promise<void> {
    const element = this.getLocator(locator);
    await element.check();
  }

  /**
   * Uncheck a checkbox
   */
  async uncheck(locator: string | Locator): Promise<void> {
    const element = this.getLocator(locator);
    await element.uncheck();
  }

  /**
   * Toggle a checkbox (check if unchecked, uncheck if checked)
   */
  async toggleCheckbox(locator: string | Locator): Promise<void> {
    const element = this.getLocator(locator);
    const isChecked = await element.isChecked();
    if (isChecked) {
      await element.uncheck();
    } else {
      await element.check();
    }
  }

  /**
   * Check if checkbox/radio is checked
   */
  async isChecked(locator: string | Locator): Promise<boolean> {
    const element = this.getLocator(locator);
    return await element.isChecked();
  }

  /**
   * Get text content of an element
   */
  async getText(locator: string | Locator): Promise<string> {
    const element = this.getLocator(locator);
    return await element.textContent() || '';
  }

  /**
   * Get all text contents (useful for lists)
   */
  async getAllTexts(locator: string | Locator): Promise<string[]> {
    const element = this.getLocator(locator);
    return await element.allTextContents();
  }

  /**
   * Get an attribute value
   */
  async getAttribute(locator: string | Locator, attribute: string): Promise<string | null> {
    const element = this.getLocator(locator);
    return await element.getAttribute(attribute);
  }

  /**
   * Check if element is visible
   */
  async isVisible(locator: string | Locator): Promise<boolean> {
    const element = this.getLocator(locator);
    return await element.isVisible();
  }

  /**
   * Check if element is enabled
   */
  async isEnabled(locator: string | Locator): Promise<boolean> {
    const element = this.getLocator(locator);
    return await element.isEnabled();
  }

  /**
   * Check if element is disabled
   */
  async isDisabled(locator: string | Locator): Promise<boolean> {
    const element = this.getLocator(locator);
    return await element.isDisabled();
  }

  /**
   * Wait for element to be visible
   */
  async waitForVisible(locator: string | Locator, timeout: number = 30000): Promise<void> {
    const element = this.getLocator(locator);
    await element.waitFor({ state: 'visible', timeout });
  }

  /**
   * Wait for element to be hidden
   */
  async waitForHidden(locator: string | Locator, timeout: number = 30000): Promise<void> {
    const element = this.getLocator(locator);
    await element.waitFor({ state: 'hidden', timeout });
  }

  /**
   * Scroll element into view
   */
  async scrollIntoView(locator: string | Locator): Promise<void> {
    const element = this.getLocator(locator);
    await element.scrollIntoViewIfNeeded();
  }

  /**
   * Get count of elements matching locator
   */
  async getElementCount(locator: string | Locator): Promise<number> {
    const element = this.getLocator(locator);
    return await element.count();
  }

  /**
   * Press a key on an element
   */
  async pressKey(locator: string | Locator, key: string): Promise<void> {
    const element = this.getLocator(locator);
    await element.press(key);
  }

  /**
   * Press Tab to move focus to next element
   */
  async pressTab(locator: string | Locator): Promise<void> {
    await this.pressKey(locator, 'Tab');
  }

  /**
   * Press Enter key
   */
  async pressEnter(locator: string | Locator): Promise<void> {
    await this.pressKey(locator, 'Enter');
  }

  /**
   * Press Escape key
   */
  async pressEscape(locator: string | Locator): Promise<void> {
    await this.pressKey(locator, 'Escape');
  }

  // ==================== TAB/WINDOW OPERATIONS ====================

  /**
   * Get the number of open pages/tabs
   */
  async getTabCount(): Promise<number> {
    const context = this.page.context();
    const pages = context.pages();
    return pages.length;
  }

  /**
   * Switch to tab by index
   */
  async switchToTab(index: number): Promise<Page> {
    const context = this.page.context();
    const pages = context.pages();
    
    if (index >= pages.length) {
      throw new Error(`Tab index ${index} does not exist. Total tabs: ${pages.length}`);
    }
    
    return pages[index];
  }

  /**
   * Switch to tab by title
   */
  async switchToTabByTitle(title: string): Promise<Page> {
    const context = this.page.context();
    const pages = context.pages();
    
    for (const page of pages) {
      const pageTitle = await page.title();
      if (pageTitle.includes(title)) {
        return page;
      }
    }
    
    throw new Error(`Tab with title containing "${title}" not found`);
  }

  /**
   * Switch to tab by URL
   */
  async switchToTabByUrl(urlPart: string): Promise<Page> {
    const context = this.page.context();
    const pages = context.pages();
    
    for (const page of pages) {
      if (page.url().includes(urlPart)) {
        return page;
      }
    }
    
    throw new Error(`Tab with URL containing "${urlPart}" not found`);
  }

  /**
   * Switch to the last opened tab
   */
  async switchToLastTab(): Promise<Page> {
    const context = this.page.context();
    const pages = context.pages();
    return pages[pages.length - 1];
  }

  /**
   * Switch to the first tab
   */
  async switchToFirstTab(): Promise<Page> {
    const context = this.page.context();
    const pages = context.pages();
    return pages[0];
  }

  /**
   * Close current tab
   */
  async closeCurrentTab(): Promise<void> {
    await this.page.close();
  }

  /**
   * Close tab by index
   */
  async closeTabByIndex(index: number): Promise<void> {
    const tab = await this.switchToTab(index);
    await tab.close();
  }

  /**
   * Get all open tab URLs
   */
  async getAllTabUrls(): Promise<string[]> {
    const context = this.page.context();
    const pages = context.pages();
    return pages.map(page => page.url());
  }

  /**
   * Get all open tab titles
   */
  async getAllTabTitles(): Promise<string[]> {
    const context = this.page.context();
    const pages = context.pages();
    const titles: string[] = [];
    for (const page of pages) {
      titles.push(await page.title());
    }
    return titles;
  }

  /**
   * Wait for new tab to open
   */
  async waitForNewTab(timeout: number = 30000): Promise<Page> {
    const context = this.page.context();
    const newPage = await context.waitForEvent('page', { timeout });
    return newPage;
  }

  /**
   * Handle alert dialog (accept it)
   */
  async acceptAlert(): Promise<string> {
    return new Promise(resolve => {
      this.page.once('dialog', async dialog => {
        const message = dialog.message();
        await dialog.accept();
        resolve(message);
      });
    });
  }

  /**
   * Handle alert dialog (dismiss it)
   */
  async dismissAlert(): Promise<string> {
    return new Promise(resolve => {
      this.page.once('dialog', async dialog => {
        const message = dialog.message();
        await dialog.dismiss();
        resolve(message);
      });
    });
  }

  /**
   * Type in alert dialog and accept
   */
  async alertTypeAndAccept(text: string): Promise<string> {
    return new Promise(resolve => {
      this.page.once('dialog', async dialog => {
        const message = dialog.message();
        await dialog.accept(text);
        resolve(message);
      });
    });
  }

  // ==================== HELPER METHODS ====================

  /**
   * Convert string to Locator or return existing Locator
   */
  private getLocator(locator: string | Locator): Locator {
    if (typeof locator === 'string') {
      return this.page.locator(locator);
    }
    return locator;
  }

  /**
   * Focus on an element
   */
  async focus(locator: string | Locator): Promise<void> {
    const element = this.getLocator(locator);
    await element.focus();
  }

  /**
   * Blur (unfocus) an element
   */
  async blur(locator: string | Locator): Promise<void> {
    const element = this.getLocator(locator);
    await element.blur();
  }

  /**
   * Drag and drop element to target
   */
  async dragAndDrop(sourceLocator: string | Locator, targetLocator: string | Locator): Promise<void> {
    const source = this.getLocator(sourceLocator);
    const target = this.getLocator(targetLocator);
    await source.dragTo(target);
  }

  /**
   * Upload file to file input
   */
  async uploadFile(locator: string | Locator, filePath: string): Promise<void> {
    const element = this.getLocator(locator);
    await element.setInputFiles(filePath);
  }

  /**
   * Upload multiple files
   */
  async uploadMultipleFiles(locator: string | Locator, filePaths: string[]): Promise<void> {
    const element = this.getLocator(locator);
    await element.setInputFiles(filePaths);
  }

  /**
   * Clear file input
   */
  async clearFileInput(locator: string | Locator): Promise<void> {
    const element = this.getLocator(locator);
    await element.setInputFiles([]);
  }

  /**
   * Get page content as string
   */
  async getPageContent(): Promise<string> {
    return await this.page.content();
  }

  /**
   * Get page title
   */
  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Get current URL
   */
  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  /**
   * Refresh/Reload the page
   */
  async refreshPage(): Promise<void> {
    await this.page.reload();
  }

  /**
   * Go back in browser history
   */
  async goBack(): Promise<void> {
    await this.page.goBack();
  }

  /**
   * Go forward in browser history
   */
  async goForward(): Promise<void> {
    await this.page.goForward();
  }

  /**
   * Take screenshot
   */
  async takeScreenshot(name: string): Promise<Buffer> {
    return await this.page.screenshot({ path: `reports/screenshots/${name}.png` });
  }
}
