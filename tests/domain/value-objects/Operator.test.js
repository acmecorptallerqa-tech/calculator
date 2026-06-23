/**
 * Example test file for Operator value object
 * Run with: npm test
 */

import { Operator } from '../../../src/domain/value-objects/Operator.js';

describe('Operator Value Object', () => {
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
});
