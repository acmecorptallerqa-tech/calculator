/**
 * Example test file for Operator value object
 * Run with: npm test
 */

import { Operator } from '../../../src/domain/value-objects/Operator.js';

describe('Operator Value Object', () => {
  const SCIENTIFIC_OPERATORS = [
    [Operator.POWER, '^'],
    [Operator.SQUARE_ROOT, '√'],
    [Operator.PERCENTAGE, '%'],
    [Operator.SIN, 'sin'],
    [Operator.COS, 'cos'],
    [Operator.TAN, 'tan'],
    [Operator.LOG, 'log'],
  ];

  describe('constructor', () => {
    it('should create valid operator', () => {
      const operator = new Operator(Operator.ADD);
      expect(operator.getValue()).toBe(Operator.ADD);
    });

    it('should throw error for invalid operator', () => {
      expect(() => new Operator('INVALID')).toThrow('Invalid operator');
    });
  });

  describe('getSymbol', () => {
    it('should return correct symbol for ADD', () => {
      const operator = new Operator(Operator.ADD);
      expect(operator.getSymbol()).toBe('+');
    });

    it('should return correct symbol for MULTIPLY', () => {
      const operator = new Operator(Operator.MULTIPLY);
      expect(operator.getSymbol()).toBe('×');
    });
  });

  describe('equals', () => {
    it('should return true for equal operators', () => {
      const op1 = new Operator(Operator.ADD);
      const op2 = new Operator(Operator.ADD);
      expect(op1.equals(op2)).toBe(true);
    });

    it('should return false for different operators', () => {
      const op1 = new Operator(Operator.ADD);
      const op2 = new Operator(Operator.SUBTRACT);
      expect(op1.equals(op2)).toBe(false);
    });
  });

  describe('fromSymbol', () => {
    it('should create operator from symbol', () => {
      const operator = Operator.fromSymbol('+');
      expect(operator.getValue()).toBe(Operator.ADD);
    });

    it('should throw error for invalid symbol', () => {
      expect(() => Operator.fromSymbol('$')).toThrow('Invalid operator symbol');
    });
  });

  describe('scientific operators', () => {
    it.each(SCIENTIFIC_OPERATORS)(
      'should create %s without throwing',
      (value) => {
        const operator = new Operator(value);
        expect(operator.getValue()).toBe(value);
      }
    );

    it.each(SCIENTIFIC_OPERATORS)(
      'should return symbol "%s" for %s',
      (value, symbol) => {
        const operator = new Operator(value);
        expect(operator.getSymbol()).toBe(symbol);
      }
    );

    it.each(SCIENTIFIC_OPERATORS)(
      'should create %s from symbol "%s"',
      (value, symbol) => {
        expect(Operator.fromSymbol(symbol).getValue()).toBe(value);
      }
    );

    it.each(SCIENTIFIC_OPERATORS)('should stay immutable for %s', (value) => {
      const operator = new Operator(value);
      expect(Object.isFrozen(operator)).toBe(true);
    });

    it('should compare scientific operators by value', () => {
      expect(
        new Operator(Operator.SIN).equals(new Operator(Operator.SIN))
      ).toBe(true);
      expect(
        new Operator(Operator.SIN).equals(new Operator(Operator.COS))
      ).toBe(false);
    });
  });

  describe('getAllValues', () => {
    it('should include basic and scientific operators', () => {
      expect(Operator.getAllValues()).toEqual([
        Operator.ADD,
        Operator.SUBTRACT,
        Operator.MULTIPLY,
        Operator.DIVIDE,
        Operator.POWER,
        Operator.SQUARE_ROOT,
        Operator.PERCENTAGE,
        Operator.SIN,
        Operator.COS,
        Operator.TAN,
        Operator.LOG,
      ]);
    });

    it('should return a copy, not the internal list', () => {
      const values = Operator.getAllValues();
      values.push('INVALID');
      expect(Operator.getAllValues()).not.toContain('INVALID');
    });
  });

  describe('getAllSymbols', () => {
    it('should include basic and scientific symbols', () => {
      expect(Operator.getAllSymbols()).toEqual([
        '+',
        '-',
        '×',
        '÷',
        '^',
        '√',
        '%',
        'sin',
        'cos',
        'tan',
        'log',
      ]);
    });

    it('should not contain duplicate symbols', () => {
      const symbols = Operator.getAllSymbols();
      expect(new Set(symbols).size).toBe(symbols.length);
    });
  });
});
