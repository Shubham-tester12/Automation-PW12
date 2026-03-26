import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';

test.afterEach(async ({ page }) => {
  try { await page.context().close(); } catch (e) { }
});

test('login to SauceDemo', async ({ page }) => {
  const login = new LoginPage(page);
  await login.goto();
  await login.login('standard_user', 'secret_sauce');
  await expect(page).toHaveURL(/inventory.html/);
});
