/**
 * Example test file for Calculation entity
 * Run with: npm test
 */

import { Calculation } from '../../../src/domain/entities/Calculation.js';
import { Operator } from '../../../src/domain/value-objects/Operator.js';

describe('Calculation Entity', () => {
  describe('constructor', () => {
    it('should create a valid calculation', () => {
      const operator = new Operator(Operator.ADD);
      const calc = new Calculation(5, operator, 3, 8);

      expect(calc.leftOperand).toBe(5);
      expect(calc.rightOperand).toBe(3);
      expect(calc.result).toBe(8);
      expect(calc.operator).toBe(operator);
    });

    it('should throw error for invalid left operand', () => {
      const operator = new Operator(Operator.ADD);
      expect(() => new Calculation('invalid', operator, 3, 8)).toThrow(
        'Left operand must be a valid number'
      );
    });

    it('should be immutable', () => {
      const operator = new Operator(Operator.ADD);
      const calc = new Calculation(5, operator, 3, 8);

      expect(() => {
        calc.result = 10;
      }).toThrow();
    });
  });

  describe('toString', () => {
    it('should format calculation as string', () => {
      const operator = new Operator(Operator.ADD);
      const calc = new Calculation(5, operator, 3, 8);

      expect(calc.toString()).toBe('5 + 3 = 8');
    });
  });
});
