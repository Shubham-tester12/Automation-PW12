import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  itemLocator(name: string): Locator {
    return this.page.locator('.inventory_item').filter({ hasText: name });
  }

  nameLocator(item: Locator): Locator {
    return item.locator('.inventory_item_name');
  }

  async addToCartByName(name: string) {
    const item = this.itemLocator(name);
    const addButton = item.locator('button', { hasText: 'Add to cart' });
    await addButton.click();
  }

  async openCart() {
    await this.page.locator('.shopping_cart_link').click();
  }
}
