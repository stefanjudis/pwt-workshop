// @ts-check
const { test } = require('@playwright/test');

test('first test', async ({ page }) => {
  await page.goto('https://danube-web.shop/');
  await page.locator('a').filter({ hasText: 'Crime & Thrillers' }).click();
  await page.getByText('Novels & Stories').click();
  await page.getByText('Larper Hee').click();
});

test('login', async ({ page }) => {
  await page.goto('https://danube-web.shop/');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('user@email.com');
  await page.getByPlaceholder('Email').press('Tab');
  await page.getByPlaceholder('Password').fill('supersecure1');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByText('Welcome back, user@email.com').click();
});
