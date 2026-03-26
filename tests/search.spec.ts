import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { InventoryPage } from '../pages/inventoryPage';

test.afterEach(async ({ page }) => {
  try { await page.context().close(); } catch (e) { }
});

test('search for Sauce Labs Bolt T-Shirt', async ({ page }) => {
  const login = new LoginPage(page);
  const inventory = new InventoryPage(page);

  await login.goto();
  await login.login('standard_user', 'secret_sauce');

  const item = inventory.itemLocator('Sauce Labs Bolt T-Shirt');
  await expect(item).toBeVisible({ timeout: 10000 });
  await expect(item.locator('.inventory_item_name')).toHaveText('Sauce Labs Bolt T-Shirt');
});
