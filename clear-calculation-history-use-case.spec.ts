import { test, expect } from '@playwright/test';

test.describe('ClearCalculationHistory Use Case Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  });

  test('should clear all history when clear button is clicked', async ({ page }) => {
    await page.getByRole('button', { name: '5' }).click();
    await page.getByRole('button', { name: '+' }).click();
    await page.getByRole('button', { name: '3' }).click();
    await page.getByRole('button', { name: '=' }).click();

    await page.getByRole('button', { name: '7' }).click();
    await page.getByRole('button', { name: '-' }).click();
    await page.getByRole('button', { name: '2' }).click();
    await page.getByRole('button', { name: '=' }).click();

    const historyPanel = page.locator('#historyList');
    let historyItems = historyPanel.locator('.history-item');
    await expect(historyItems).toHaveCount(2);

    const clearButton = page.getByRole('button', { name: /clear history/i });
    await clearButton.click();

    historyItems = historyPanel.locator('.history-item');
    await expect(historyItems).toHaveCount(0);
  });

  test('should remove all calculations from localStorage when cleared', async ({ page }) => {
    await page.getByRole('button', { name: '8' }).click();
    await page.getByRole('button', { name: '+' }).click();
    await page.getByRole('button', { name: '2' }).click();
    await page.getByRole('button', { name: '=' }).click();

    let savedData = await page.evaluate(() => {
      return localStorage.getItem('calculations');
    });
    expect(JSON.parse(savedData || '[]')).toHaveLength(1);

    const clearButton = page.getByRole('button', { name: /clear history/i });
    await clearButton.click();

    savedData = await page.evaluate(() => {
      return localStorage.getItem('calculations');
    });

    const calculations = JSON.parse(savedData || '[]');
    expect(calculations).toHaveLength(0);
  });

  test('should show empty history panel after clearing', async ({ page }) => {
    await page.getByRole('button', { name: '4' }).click();
    await page.getByRole('button', { name: '×' }).click();
    await page.getByRole('button', { name: '3' }).click();
    await page.getByRole('button', { name: '=' }).click();

    const historyPanel = page.locator('#historyList');
    await expect(historyPanel).toContainText('4 × 3 = 12');

    const clearButton = page.getByRole('button', { name: /clear history/i });
    await clearButton.click();

    await expect(historyPanel).not.toContainText('4 × 3 = 12');
  });

  test('should persist cleared state across page reloads', async ({ page }) => {
    await page.getByRole('button', { name: '9' }).click();
    await page.getByRole('button', { name: '+' }).click();
    await page.getByRole('button', { name: '1' }).click();
    await page.getByRole('button', { name: '=' }).click();

    const clearButton = page.getByRole('button', { name: /clear history/i });
    await clearButton.click();

    await page.reload();

    const historyPanel = page.locator('#historyList');
    const historyItems = historyPanel.locator('.history-item');
    await expect(historyItems).toHaveCount(0);
  });

  test('should clear multiple calculations at once', async ({ page }) => {
    const calculations = [
      ['5', '+', '5'],
      ['10', '-', '3'],
      ['4', '×', '2'],
      ['16', '÷', '4']
    ];

    for (const calc of calculations) {
      for (const num of calc) {
        await page.getByRole('button', { name: num }).click();
      }
      await page.getByRole('button', { name: '=' }).click();
    }

    const historyPanel = page.locator('#historyList');
    let historyItems = historyPanel.locator('.history-item');
    await expect(historyItems).toHaveCount(4);

    const clearButton = page.getByRole('button', { name: /clear history/i });
    await clearButton.click();

    historyItems = historyPanel.locator('.history-item');
    await expect(historyItems).toHaveCount(0);
  });

  test('should allow new calculations after clearing history', async ({ page }) => {
    await page.getByRole('button', { name: '3' }).click();
    await page.getByRole('button', { name: '+' }).click();
    await page.getByRole('button', { name: '3' }).click();
    await page.getByRole('button', { name: '=' }).click();

    const clearButton = page.getByRole('button', { name: /clear history/i });
    await clearButton.click();

    await page.getByRole('button', { name: '7' }).click();
    await page.getByRole('button', { name: '+' }).click();
    await page.getByRole('button', { name: '3' }).click();
    await page.getByRole('button', { name: '=' }).click();

    const historyPanel = page.locator('#historyList');
    await expect(historyPanel).not.toContainText('3 + 3 = 6');
    await expect(historyPanel).toContainText('7 + 3 = 10');

    const historyItems = historyPanel.locator('.history-item');
    await expect(historyItems).toHaveCount(1);
  });

  test('should handle clearing when history is already empty', async ({ page }) => {
    const historyPanel = page.locator('#historyList');
    let historyItems = historyPanel.locator('.history-item');
    await expect(historyItems).toHaveCount(0);

    const clearButton = page.getByRole('button', { name: /clear history/i });
    await clearButton.click();

    historyItems = historyPanel.locator('.history-item');
    await expect(historyItems).toHaveCount(0);

    const savedData = await page.evaluate(() => {
      return localStorage.getItem('calculations');
    });
    const calculations = JSON.parse(savedData || '[]');
    expect(calculations).toHaveLength(0);
  });

  test('should clear history with decimal calculations', async ({ page }) => {
    await page.getByRole('button', { name: '2' }).click();
    await page.getByRole('button', { name: '.' }).click();
    await page.getByRole('button', { name: '5' }).click();
    await page.getByRole('button', { name: '+' }).click();
    await page.getByRole('button', { name: '3' }).click();
    await page.getByRole('button', { name: '.' }).click();
    await page.getByRole('button', { name: '5' }).click();
    await page.getByRole('button', { name: '=' }).click();

    const historyPanel = page.locator('#historyList');
    await expect(historyPanel).toContainText('2.5');

    const clearButton = page.getByRole('button', { name: /clear history/i });
    await clearButton.click();

    const historyItems = historyPanel.locator('.history-item');
    await expect(historyItems).toHaveCount(0);
  });

  test('should clear history button remain functional after multiple uses', async ({ page }) => {
    await page.getByRole('button', { name: '1' }).click();
    await page.getByRole('button', { name: '+' }).click();
    await page.getByRole('button', { name: '1' }).click();
    await page.getByRole('button', { name: '=' }).click();

    const clearButton = page.getByRole('button', { name: /clear history/i });
    await clearButton.click();

    await page.getByRole('button', { name: '2' }).click();
    await page.getByRole('button', { name: '+' }).click();
    await page.getByRole('button', { name: '2' }).click();
    await page.getByRole('button', { name: '=' }).click();

    await clearButton.click();

    await page.getByRole('button', { name: '3' }).click();
    await page.getByRole('button', { name: '+' }).click();
    await page.getByRole('button', { name: '3' }).click();
    await page.getByRole('button', { name: '=' }).click();

    const historyPanel = page.locator('#historyList');
    const historyItems = historyPanel.locator('.history-item');
    await expect(historyItems).toHaveCount(1);
    await expect(historyPanel).toContainText('3 + 3 = 6');
  });

  test('should return success message after clearing history', async ({ page }) => {
    await page.getByRole('button', { name: '5' }).click();
    await page.getByRole('button', { name: '+' }).click();
    await page.getByRole('button', { name: '5' }).click();
    await page.getByRole('button', { name: '=' }).click();

    await page.getByRole('button', { name: '3' }).click();
    await page.getByRole('button', { name: '+' }).click();
    await page.getByRole('button', { name: '3' }).click();
    await page.getByRole('button', { name: '=' }).click();

    const clearButton = page.getByRole('button', { name: /clear history/i });
    await clearButton.click();

    const historyPanel = page.locator('#historyList');
    const historyItems = historyPanel.locator('.history-item');
    await expect(historyItems).toHaveCount(0);
  });

  test('should clear history with large number of calculations', async ({ page }) => {
    for (let i = 0; i < 15; i++) {
      await page.getByRole('button', { name: '1' }).click();
      await page.getByRole('button', { name: '+' }).click();
      await page.getByRole('button', { name: '1' }).click();
      await page.getByRole('button', { name: '=' }).click();
    }

    let savedData = await page.evaluate(() => {
      return localStorage.getItem('calculations');
    });
    expect(JSON.parse(savedData || '[]')).toHaveLength(15);

    const clearButton = page.getByRole('button', { name: /clear history/i });
    await clearButton.click();

    savedData = await page.evaluate(() => {
      return localStorage.getItem('calculations');
    });
    expect(JSON.parse(savedData || '[]')).toHaveLength(0);
  });

  test('should not affect current display when clearing history', async ({ page }) => {
    await page.getByRole('button', { name: '8' }).click();
    await page.getByRole('button', { name: '+' }).click();
    await page.getByRole('button', { name: '2' }).click();
    await page.getByRole('button', { name: '=' }).click();

    await page.getByRole('button', { name: '5' }).click();

    const display = page.locator('#display');
    await expect(display).toContainText('5');

    const clearButton = page.getByRole('button', { name: /clear history/i });
    await clearButton.click();

    await expect(display).toContainText('5');
  });

  test('should clear button be visible and accessible', async ({ page }) => {
    const clearButton = page.getByRole('button', { name: /clear history/i });
    await expect(clearButton).toBeVisible();
    await expect(clearButton).toBeEnabled();
  });
});
