import { test, expect } from '@playwright/test';

test('happy path enquiry page renders', async ({ page }) => {
  await page.goto('/enquiry');
  await expect(page.getByRole('heading', { name: 'Rental enquiry wizard' })).toBeVisible();
});
