import { test, expect } from '@playwright/test';

test.describe('MindVanta smoke', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('mindvanta_onboarding_complete', 'true');
      localStorage.setItem(
        'mindvanta_user_state',
        JSON.stringify({ currentDay: 1, lastVisited: new Date().toISOString() })
      );
    });
  });

  test('boots past onboarding and shows the main shell', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('navigation', { name: 'Main navigation' })).toBeVisible({
      timeout: 15_000,
    });
  });

  test('all five primary tabs are present', async ({ page }) => {
    await page.goto('/');
    const nav = page.getByRole('navigation', { name: 'Main navigation' });
    for (const label of ['Today', 'Journal', 'Study', 'Library', 'Dreams']) {
      await expect(nav.getByText(label, { exact: true })).toBeVisible();
    }
  });

  test('premium tabs display a lock for free users', async ({ page }) => {
    await page.goto('/');
    const nav = page.getByRole('navigation', { name: 'Main navigation' });
    const locks = nav.getByText('lock');
    await expect(locks).toHaveCount(3);
  });

  test('tapping a premium tab shows the paywall for free users', async ({ page }) => {
    await page.goto('/');
    const nav = page.getByRole('navigation', { name: 'Main navigation' });
    await nav.getByText('Library', { exact: true }).click();
    await expect(page.getByText(/premium|upgrade|unlock/i).first()).toBeVisible({
      timeout: 10_000,
    });
  });
});
