import { test, expect } from '@playwright/test';

test('shows items list', async ({ page }) => {
  await page.goto('/items');

  // Expect at least one item to be visible in the list
  await expect(page.locator('li')).toHaveCount(1); // or more, depending on your mock data

  // Or check for a specific item name from your in-memory data
  await expect(page.locator('li')).toContainText('Item One');
});
