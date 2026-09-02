/**
 * UI tests for the scientific calculator buttons.
 * Drives the real public/index.html markup through button clicks.
 */

import fs from 'fs';
import path from 'path';
import { DIContainer, UIManager } from '../../../src/interfaces/web/index.js';

const INDEX_HTML = fs.readFileSync(
  path.resolve(process.cwd(), 'public/index.html'),
  'utf8'
);

const SCIENTIFIC_SYMBOLS = ['^', '√', '%', 'sin', 'cos', 'tan', 'log'];

/** Lets the async click handlers settle */
const flush = () => new Promise((resolve) => setTimeout(resolve, 0));

describe('Scientific calculator buttons', () => {
  let display;

  /** Clicks an element, then waits for its handler to finish */
  const click = async (selector) => {
    const element = document.querySelector(selector);
    if (!element) {
      throw new Error(`No element matching "${selector}"`);
    }
    element.click();
    await flush();
  };

  /** Types a number by clicking the digit and decimal buttons */
  const type = async (value) => {
    for (const character of String(value)) {
      await click(
        character === '.' ? '#btn-decimal' : `[data-number="${character}"]`
      );
    }
  };

  /** Clicks a scientific or arithmetic operator by its Operator symbol */
  const operator = (symbol) => click(`[data-operator="${symbol}"]`);

  beforeEach(() => {
    localStorage.clear();
    document.body.innerHTML = INDEX_HTML.match(/<body>([\s\S]*)<\/body>/)[1];

    const controller = new DIContainer().getCalculatorController();
    new UIManager(controller).init();

    display = document.getElementById('display');
  });

  // Acceptance criterion 1
  it('renders a button for each of the seven scientific operators', () => {
    SCIENTIFIC_SYMBOLS.forEach((symbol) => {
      const button = document.querySelector(`[data-operator="${symbol}"]`);
      expect(button).not.toBeNull();
      expect(button.tagName).toBe('BUTTON');
      expect(button.textContent.trim()).toBe(symbol);
    });
  });

  // Acceptance criterion 2
  it('computes 2 ^ 3 = 8', async () => {
    await type(2);
    await operator('^');
    await type(3);
    await click('#btn-equals');

    expect(display.textContent).toBe('8');
  });

  // Acceptance criterion 3
  it('computes √16 = 4', async () => {
    await type(16);
    await operator('√');

    expect(display.textContent).toBe('4');
  });

  // Acceptance criterion 4
  it('computes 50% = 0.5', async () => {
    await type(50);
    await operator('%');

    expect(display.textContent).toBe('0.5');
  });

  // Acceptance criteria 5, 6 and 7
  it.each([
    ['sin', '0'],
    ['cos', '1'],
    ['tan', '0'],
  ])('computes %s(0) = %s', async (symbol, expected) => {
    await type(0);
    await operator(symbol);

    expect(display.textContent).toBe(expected);
  });

  // Acceptance criterion 8
  it('computes log(Math.E) = 1', async () => {
    await type(Math.E);
    await operator('log');

    expect(display.textContent).toBe('1');
  });

  // Acceptance criterion 9
  it.each(SCIENTIFIC_SYMBOLS)(
    'calculates with the %s button without errors',
    async (symbol) => {
      await click('#btn-clear-entry');
      await type(2);
      await operator(symbol);

      if (symbol === '^') {
        await type(2);
        await click('#btn-equals');
      }

      expect(display.textContent).toMatch(/^-?\d+(\.\d+)?$/);
    }
  );

  it('records each scientific calculation in the history', async () => {
    await type(9);
    await operator('√');

    expect(document.querySelectorAll('.history-item')).toHaveLength(1);
    expect(document.querySelector('.history-expression').textContent).toContain(
      '√'
    );
  });

  it('applies a unary operator without discarding a pending operation', async () => {
    await type(5);
    await operator('+');
    await type(16);
    await operator('√');

    expect(display.textContent).toBe('4');

    await click('#btn-equals');

    expect(display.textContent).toBe('9');
  });

  it('still computes basic arithmetic', async () => {
    await type(7);
    await operator('+');
    await type(3);
    await click('#btn-equals');

    expect(display.textContent).toBe('10');
  });

  it('deletes the last character when backspace is clicked', async () => {
    await type(123);
    await click('#btn-backspace');

    expect(display.textContent).toBe('12');
  });
});
