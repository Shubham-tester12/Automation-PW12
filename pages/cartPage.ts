import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  itemLocator(name: string): Locator {
    return this.page.locator('.cart_item').filter({ hasText: name });
  }

  async proceedToCheckout() {
    await this.page.locator('[data-test="checkout"]').click();
  }

  async expectItemPresent(name: string) {
    const item = this.itemLocator(name);
    await expect(item).toBeVisible({ timeout: 10000 });
  }
}
