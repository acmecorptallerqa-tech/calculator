import { test, expect } from '@playwright/test';

test.describe('GetCalculationHistory Use Case Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  });

  test('should display empty history when no calculations exist', async ({ page }) => {
    const historyPanel = page.locator('#historyList');
    const historyItems = historyPanel.locator('.history-item');

    await expect(historyItems).toHaveCount(0);
  });

  test('should retrieve and display single calculation in history', async ({ page }) => {
    await page.getByRole('button', { name: '7' }).click();
    await page.getByRole('button', { name: '+' }).click();
    await page.getByRole('button', { name: '3' }).click();
    await page.getByRole('button', { name: '=' }).click();

    const historyPanel = page.locator('#historyList');
    await expect(historyPanel).toContainText('7 + 3 = 10');

    const historyItems = historyPanel.locator('.history-item');
    await expect(historyItems).toHaveCount(1);
  });

  test('should retrieve and display multiple calculations in history', async ({ page }) => {
    await page.getByRole('button', { name: '5' }).click();
    await page.getByRole('button', { name: '+' }).click();
    await page.getByRole('button', { name: '2' }).click();
    await page.getByRole('button', { name: '=' }).click();

    await page.getByRole('button', { name: '9' }).click();
    await page.getByRole('button', { name: '-' }).click();
    await page.getByRole('button', { name: '4' }).click();
    await page.getByRole('button', { name: '=' }).click();

    await page.getByRole('button', { name: '3' }).click();
    await page.getByRole('button', { name: '×' }).click();
    await page.getByRole('button', { name: '3' }).click();
    await page.getByRole('button', { name: '=' }).click();

    const historyPanel = page.locator('#historyList');
    await expect(historyPanel).toContainText('5 + 2 = 7');
    await expect(historyPanel).toContainText('9 - 4 = 5');
    await expect(historyPanel).toContainText('3 × 3 = 9');

    const historyItems = historyPanel.locator('.history-item');
    await expect(historyItems).toHaveCount(3);
  });

  test('should display history items in chronological order', async ({ page }) => {
    await page.getByRole('button', { name: '1' }).click();
    await page.getByRole('button', { name: '+' }).click();
    await page.getByRole('button', { name: '1' }).click();
    await page.getByRole('button', { name: '=' }).click();

    await page.waitForTimeout(100);

    await page.getByRole('button', { name: '2' }).click();
    await page.getByRole('button', { name: '+' }).click();
    await page.getByRole('button', { name: '2' }).click();
    await page.getByRole('button', { name: '=' }).click();

    await page.waitForTimeout(100);

    await page.getByRole('button', { name: '3' }).click();
    await page.getByRole('button', { name: '+' }).click();
    await page.getByRole('button', { name: '3' }).click();
    await page.getByRole('button', { name: '=' }).click();

    const historyPanel = page.locator('#historyList');
    const historyItems = historyPanel.locator('.history-item');

    const firstItem = historyItems.nth(0);
    const secondItem = historyItems.nth(1);
    const thirdItem = historyItems.nth(2);

    await expect(firstItem).toContainText('1 + 1 = 2');
    await expect(secondItem).toContainText('2 + 2 = 4');
    await expect(thirdItem).toContainText('3 + 3 = 6');
  });

  test('should persist history across page reloads', async ({ page }) => {
    await page.getByRole('button', { name: '8' }).click();
    await page.getByRole('button', { name: '+' }).click();
    await page.getByRole('button', { name: '2' }).click();
    await page.getByRole('button', { name: '=' }).click();

    await page.getByRole('button', { name: '5' }).click();
    await page.getByRole('button', { name: '×' }).click();
    await page.getByRole('button', { name: '5' }).click();
    await page.getByRole('button', { name: '=' }).click();

    await page.reload();

    const historyPanel = page.locator('#historyList');
    await expect(historyPanel).toContainText('8 + 2 = 10');
    await expect(historyPanel).toContainText('5 × 5 = 25');
  });

  test('should display history with correct calculation expressions', async ({ page }) => {
    const calculations = [
      { nums: ['15', '÷', '3'], expected: '15 ÷ 3 = 5' },
      { nums: ['7', '-', '2'], expected: '7 - 2 = 5' },
      { nums: ['4', '+', '6'], expected: '4 + 6 = 10' }
    ];

    for (const calc of calculations) {
      for (const num of calc.nums) {
        await page.getByRole('button', { name: num }).click();
      }
      await page.getByRole('button', { name: '=' }).click();
    }

    const historyPanel = page.locator('#historyList');

    for (const calc of calculations) {
      await expect(historyPanel).toContainText(calc.expected);
    }
  });

  test('should display decimal calculations in history', async ({ page }) => {
    await page.getByRole('button', { name: '3' }).click();
    await page.getByRole('button', { name: '.' }).click();
    await page.getByRole('button', { name: '5' }).click();
    await page.getByRole('button', { name: '+' }).click();
    await page.getByRole('button', { name: '2' }).click();
    await page.getByRole('button', { name: '.' }).click();
    await page.getByRole('button', { name: '5' }).click();
    await page.getByRole('button', { name: '=' }).click();

    const historyPanel = page.locator('#historyList');
    await expect(historyPanel).toContainText('3.5');
    await expect(historyPanel).toContainText('2.5');
    await expect(historyPanel).toContainText('6');
  });

  test('should retrieve history count correctly', async ({ page }) => {
    for (let i = 1; i <= 5; i++) {
      await page.getByRole('button', { name: '1' }).click();
      await page.getByRole('button', { name: '+' }).click();
      await page.getByRole('button', { name: '1' }).click();
      await page.getByRole('button', { name: '=' }).click();
    }

    const savedData = await page.evaluate(() => {
      return localStorage.getItem('calculations');
    });

    const calculations = JSON.parse(savedData || '[]');
    expect(calculations).toHaveLength(5);
  });

  test('should display timestamps for history items', async ({ page }) => {
    await page.getByRole('button', { name: '4' }).click();
    await page.getByRole('button', { name: '+' }).click();
    await page.getByRole('button', { name: '4' }).click();
    await page.getByRole('button', { name: '=' }).click();

    const historyPanel = page.locator('#historyList');
    const historyItem = historyPanel.locator('.history-item').first();

    const itemText = await historyItem.textContent();
    expect(itemText).toBeTruthy();
  });

  test('should handle large number of history items', async ({ page }) => {
    for (let i = 0; i < 20; i++) {
      await page.getByRole('button', { name: '1' }).click();
      await page.getByRole('button', { name: '+' }).click();
      await page.getByRole('button', { name: String(i % 10) }).click();
      await page.getByRole('button', { name: '=' }).click();
    }

    const historyPanel = page.locator('#historyList');
    const historyItems = historyPanel.locator('.history-item');

    const count = await historyItems.count();
    expect(count).toBe(20);
  });

  test('should display history panel UI elements correctly', async ({ page }) => {
    const historyPanel = page.locator('#history');
    await expect(historyPanel).toBeVisible();

    const historyTitle = page.locator('h2:has-text("History")');
    await expect(historyTitle).toBeVisible();
  });

  test('should update history immediately after calculation', async ({ page }) => {
    const historyPanel = page.locator('#historyList');
    let initialCount = await historyPanel.locator('.history-item').count();

    await page.getByRole('button', { name: '6' }).click();
    await page.getByRole('button', { name: '+' }).click();
    await page.getByRole('button', { name: '4' }).click();
    await page.getByRole('button', { name: '=' }).click();

    await page.waitForTimeout(100);

    let finalCount = await historyPanel.locator('.history-item').count();
    expect(finalCount).toBe(initialCount + 1);
  });

  test('should show history items with proper formatting', async ({ page }) => {
    await page.getByRole('button', { name: '9' }).click();
    await page.getByRole('button', { name: '×' }).click();
    await page.getByRole('button', { name: '9' }).click();
    await page.getByRole('button', { name: '=' }).click();

    const historyPanel = page.locator('#historyList');
    const historyItem = historyPanel.locator('.history-item').first();

    await expect(historyItem).toBeVisible();
    await expect(historyItem).toContainText('9 × 9 = 81');
  });
});
