import { test, expect } from '@playwright/test';

test.describe('PerformCalculation Use Case Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  });

  test('should perform addition calculation and save to history', async ({ page }) => {
    await page.getByRole('button', { name: '5' }).click();
    await page.getByRole('button', { name: '+' }).click();
    await page.getByRole('button', { name: '3' }).click();
    await page.getByRole('button', { name: '=' }).click();

    const display = page.locator('#display');
    await expect(display).toHaveText('8');

    const historyPanel = page.locator('#historyList');
    await expect(historyPanel).toContainText('5 + 3 = 8');
  });

  test('should perform subtraction calculation', async ({ page }) => {
    await page.getByRole('button', { name: '10' }).click();
    await page.getByRole('button', { name: '-' }).click();
    await page.getByRole('button', { name: '4' }).click();
    await page.getByRole('button', { name: '=' }).click();

    const display = page.locator('#display');
    await expect(display).toHaveText('6');

    const historyPanel = page.locator('#historyList');
    await expect(historyPanel).toContainText('10 - 4 = 6');
  });

  test('should perform multiplication calculation', async ({ page }) => {
    await page.getByRole('button', { name: '7' }).click();
    await page.getByRole('button', { name: '×' }).click();
    await page.getByRole('button', { name: '6' }).click();
    await page.getByRole('button', { name: '=' }).click();

    const display = page.locator('#display');
    await expect(display).toHaveText('42');

    const historyPanel = page.locator('#historyList');
    await expect(historyPanel).toContainText('7 × 6 = 42');
  });

  test('should perform division calculation', async ({ page }) => {
    await page.getByRole('button', { name: '15' }).click();
    await page.getByRole('button', { name: '÷' }).click();
    await page.getByRole('button', { name: '3' }).click();
    await page.getByRole('button', { name: '=' }).click();

    const display = page.locator('#display');
    await expect(display).toHaveText('5');

    const historyPanel = page.locator('#historyList');
    await expect(historyPanel).toContainText('15 ÷ 3 = 5');
  });

  test('should handle division by zero with error message', async ({ page }) => {
    await page.getByRole('button', { name: '10' }).click();
    await page.getByRole('button', { name: '÷' }).click();
    await page.getByRole('button', { name: '0' }).click();
    await page.getByRole('button', { name: '=' }).click();

    const display = page.locator('#display');
    await expect(display).toContainText(/error|cannot divide by zero/i);
  });

  test('should handle decimal number calculations', async ({ page }) => {
    await page.getByRole('button', { name: '2' }).click();
    await page.getByRole('button', { name: '.' }).click();
    await page.getByRole('button', { name: '5' }).click();
    await page.getByRole('button', { name: '+' }).click();
    await page.getByRole('button', { name: '1' }).click();
    await page.getByRole('button', { name: '.' }).click();
    await page.getByRole('button', { name: '5' }).click();
    await page.getByRole('button', { name: '=' }).click();

    const display = page.locator('#display');
    await expect(display).toHaveText('4');
  });

  test('should persist calculation in localStorage', async ({ page }) => {
    await page.getByRole('button', { name: '8' }).click();
    await page.getByRole('button', { name: '+' }).click();
    await page.getByRole('button', { name: '2' }).click();
    await page.getByRole('button', { name: '=' }).click();

    const savedData = await page.evaluate(() => {
      return localStorage.getItem('calculations');
    });

    expect(savedData).toBeTruthy();
    const calculations = JSON.parse(savedData || '[]');
    expect(calculations).toHaveLength(1);
    expect(calculations[0]).toMatchObject({
      leftOperand: 8,
      rightOperand: 2,
      result: 10
    });
  });

  test('should perform multiple calculations in sequence', async ({ page }) => {
    await page.getByRole('button', { name: '5' }).click();
    await page.getByRole('button', { name: '+' }).click();
    await page.getByRole('button', { name: '5' }).click();
    await page.getByRole('button', { name: '=' }).click();

    let display = page.locator('#display');
    await expect(display).toHaveText('10');

    await page.getByRole('button', { name: '3' }).click();
    await page.getByRole('button', { name: '×' }).click();
    await page.getByRole('button', { name: '4' }).click();
    await page.getByRole('button', { name: '=' }).click();

    await expect(display).toHaveText('12');

    const historyPanel = page.locator('#historyList');
    await expect(historyPanel).toContainText('5 + 5 = 10');
    await expect(historyPanel).toContainText('3 × 4 = 12');
  });

  test('should use keyboard input for calculations', async ({ page }) => {
    await page.keyboard.type('9');
    await page.keyboard.type('+');
    await page.keyboard.type('1');
    await page.keyboard.press('Enter');

    const display = page.locator('#display');
    await expect(display).toHaveText('10');
  });

  test('should clear current entry with CE button', async ({ page }) => {
    await page.getByRole('button', { name: '5' }).click();
    await page.getByRole('button', { name: '+' }).click();
    await page.getByRole('button', { name: '3' }).click();
    await page.getByRole('button', { name: 'CE' }).click();

    const display = page.locator('#display');
    await expect(display).toHaveText(/^0$|^$/);
  });

  test('should clear display with C button', async ({ page }) => {
    await page.getByRole('button', { name: '7' }).click();
    await page.getByRole('button', { name: 'C' }).click();

    const display = page.locator('#display');
    await expect(display).toHaveText(/^0$|^$/);
  });

  test('should validate calculation result is displayed with proper formatting', async ({ page }) => {
    await page.getByRole('button', { name: '1' }).click();
    await page.getByRole('button', { name: '0' }).click();
    await page.getByRole('button', { name: '0' }).click();
    await page.getByRole('button', { name: '÷' }).click();
    await page.getByRole('button', { name: '3' }).click();
    await page.getByRole('button', { name: '=' }).click();

    const display = page.locator('#display');
    const displayText = await display.textContent();

    expect(displayText).toBeTruthy();
    const result = parseFloat(displayText || '0');
    expect(result).toBeCloseTo(33.333, 2);
  });

  test('should include timestamp in saved calculation', async ({ page }) => {
    const beforeTime = Date.now();

    await page.getByRole('button', { name: '4' }).click();
    await page.getByRole('button', { name: '+' }).click();
    await page.getByRole('button', { name: '4' }).click();
    await page.getByRole('button', { name: '=' }).click();

    const afterTime = Date.now();

    const savedData = await page.evaluate(() => {
      return localStorage.getItem('calculations');
    });

    const calculations = JSON.parse(savedData || '[]');
    expect(calculations[0]).toHaveProperty('timestamp');

    const timestamp = new Date(calculations[0].timestamp).getTime();
    expect(timestamp).toBeGreaterThanOrEqual(beforeTime);
    expect(timestamp).toBeLessThanOrEqual(afterTime);
  });
});
