const { test, expect } = require('@playwright/test');
const LoginPage = require('../../pages/loginPage');
const users = require('../../testData/users.json').users;

test.describe('Data-Driven Login Tests', () => {
  users.forEach(data => {
    test(`Login test for ${data.username}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.navigate();
      await loginPage.login(data.username, data.password);

      await expect(page).toHaveURL(/inventory/);
    });
  });
});