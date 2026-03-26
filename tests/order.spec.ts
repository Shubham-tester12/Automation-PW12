import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { InventoryPage } from '../pages/inventoryPage';
import { CartPage } from '../pages/cartPage';
import { CheckoutPage } from '../pages/checkoutPage';

test.afterEach(async ({ page }) => {
  try { await page.context().close(); } catch (e) { }
});

test('create an order for a T-Shirt', async ({ page }) => {
  const login = new LoginPage(page);
  const inventory = new InventoryPage(page);
  const cart = new CartPage(page);
  const checkout = new CheckoutPage(page);

  await login.goto();
  await login.login('standard_user', 'secret_sauce');

  const productName = 'Sauce Labs Bolt T-Shirt';
  await inventory.addToCartByName(productName);
  await inventory.openCart();

  await cart.expectItemPresent(productName);
  await cart.proceedToCheckout();

  await checkout.fillInformation('Test', 'User', '12345');
  await checkout.finish();
  await checkout.expectOrderComplete();
});
