import { test, expect } from '@playwright/test';

test.describe('Calculator Basic Operations', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#display')).toBeVisible();
  });

  test('performs addition correctly', async ({ page }) => {
    await page.locator('button[data-number="5"]').click();
    await page.locator('button[data-operator="+"]').click();
    await page.locator('button[data-number="3"]').click();
    await page.locator('#btn-equals').click();

    await expect(page.locator('#display')).toHaveText('8');
  });

  test('performs subtraction correctly', async ({ page }) => {
    await page.locator('button[data-number="9"]').click();
    await page.locator('button[data-operator="-"]').click();
    await page.locator('button[data-number="4"]').click();
    await page.locator('#btn-equals').click();

    await expect(page.locator('#display')).toHaveText('5');
  });

  test('performs multiplication correctly', async ({ page }) => {
    await page.locator('button[data-number="6"]').click();
    await page.locator('button[data-operator="×"]').click();
    await page.locator('button[data-number="7"]').click();
    await page.locator('#btn-equals').click();

    await expect(page.locator('#display')).toHaveText('42');
  });

  test('performs division correctly', async ({ page }) => {
    await page.locator('button[data-number="8"]').click();
    await page.locator('button[data-operator="÷"]').click();
    await page.locator('button[data-number="2"]').click();
    await page.locator('#btn-equals').click();

    await expect(page.locator('#display')).toHaveText('4');
  });

  test('handles division by zero', async ({ page }) => {
    await page.locator('button[data-number="5"]').click();
    await page.locator('button[data-operator="÷"]').click();
    await page.locator('button[data-number="0"]').click();
    await page.locator('#btn-equals').click();

    await expect(page.locator('#display')).toContainText(/error|cannot divide|infinity/i);
  });

  test('clears display with C button', async ({ page }) => {
    await page.locator('button[data-number="1"]').click();
    await page.locator('button[data-number="2"]').click();
    await page.locator('button[data-number="3"]').click();
    await page.locator('#btn-clear').click();

    await expect(page.locator('#display')).toHaveText('0');
  });

  test('performs decimal number calculations', async ({ page }) => {
    await page.locator('button[data-number="2"]').click();
    await page.locator('#btn-decimal').click();
    await page.locator('button[data-number="5"]').click();
    await page.locator('button[data-operator="+"]').click();
    await page.locator('button[data-number="1"]').click();
    await page.locator('#btn-decimal').click();
    await page.locator('button[data-number="5"]').click();
    await page.locator('#btn-equals').click();

    await expect(page.locator('#display')).toHaveText('4');
  });

  test('performs multiple operations in sequence', async ({ page }) => {
    await page.locator('button[data-number="1"]').click();
    await page.locator('button[data-number="0"]').click();
    await page.locator('button[data-operator="+"]').click();
    await page.locator('button[data-number="5"]').click();
    await page.locator('#btn-equals').click();
    await expect(page.locator('#display')).toHaveText('15');

    await page.locator('button[data-operator="×"]').click();
    await page.locator('button[data-number="2"]').click();
    await page.locator('#btn-equals').click();
    await expect(page.locator('#display')).toHaveText('30');
  });

  test('saves calculation to history', async ({ page }) => {
    await page.locator('button[data-number="3"]').click();
    await page.locator('button[data-operator="+"]').click();
    await page.locator('button[data-number="4"]').click();
    await page.locator('#btn-equals').click();

    const historyList = page.locator('#history-list');
    await expect(historyList).toContainText('3 + 4 = 7');
  });

  test('clears calculation history', async ({ page }) => {
    await page.locator('button[data-number="5"]').click();
    await page.locator('button[data-operator="+"]').click();
    await page.locator('button[data-number="5"]').click();
    await page.locator('#btn-equals').click();

    await expect(page.locator('#history-list')).toContainText('5 + 5 = 10');

    await page.locator('#btn-clear-history').click();
    await expect(page.locator('#history-list')).toContainText('No calculations yet');
  });
});
