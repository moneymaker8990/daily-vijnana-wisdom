import { test, expect } from '@playwright/test';

test.describe('production smoke (run with PW_BASE_URL)', () => {
  const url = process.env.PW_BASE_URL ?? 'https://daily-vijnana-app.vercel.app/';

  test('prints console errors and expects #root to have content', async ({ page }) => {
    const logs: string[] = [];
    page.on('console', (msg) => {
      logs.push(`[${msg.type()}] ${msg.text()}`);
    });
    page.on('pageerror', (err) => {
      logs.push(`[pageerror] ${err.message}\n${err.stack ?? ''}`);
    });

    const res = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60_000 });
    expect(res?.ok()).toBeTruthy();

    await page.waitForTimeout(4000);

    const rootHtml = await page.locator('#root').innerHTML();
    expect(rootHtml.length, `console/log tail:\n${logs.join('\n')}\nroot: ${rootHtml}`).toBeGreaterThan(20);
  });
});
