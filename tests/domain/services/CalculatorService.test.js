/**
 * Example test file for CalculatorService
 * Run with: npm test
 */

import { CalculatorService } from '../../../src/domain/services/CalculatorService.js';
import { Operator } from '../../../src/domain/value-objects/Operator.js';

describe('CalculatorService', () => {
  let service;

  beforeEach(() => {
    service = new CalculatorService();
  });

  describe('calculate', () => {
    it('should add two numbers', () => {
      const operator = new Operator(Operator.ADD);
      const result = service.calculate(5, operator, 3);
      expect(result).toBe(8);
    });

    it('should subtract two numbers', () => {
      const operator = new Operator(Operator.SUBTRACT);
      const result = service.calculate(5, operator, 3);
      expect(result).toBe(2);
    });

    it('should multiply two numbers', () => {
      const operator = new Operator(Operator.MULTIPLY);
      const result = service.calculate(5, operator, 3);
      expect(result).toBe(15);
    });

    it('should divide two numbers', () => {
      const operator = new Operator(Operator.DIVIDE);
      const result = service.calculate(6, operator, 3);
      expect(result).toBe(2);
    });

    it('should throw error for division by zero', () => {
      const operator = new Operator(Operator.DIVIDE);
      expect(() => service.calculate(5, operator, 0)).toThrow(
        'Cannot divide by zero'
      );
    });

    it('should handle decimal calculations', () => {
      const operator = new Operator(Operator.ADD);
      const result = service.calculate(0.1, operator, 0.2);
      expect(result).toBeCloseTo(0.3);
    });
  });

  describe('scientific operations', () => {
    it('should raise a number to a power', () => {
      const operator = new Operator(Operator.POWER);
      expect(service.calculate(2, operator, 3)).toBe(8);
    });

    it('should calculate the square root, ignoring the right operand', () => {
      const operator = new Operator(Operator.SQUARE_ROOT);
      expect(service.calculate(16, operator, 0)).toBe(4);
    });

    it('should calculate a percentage as a decimal', () => {
      const operator = new Operator(Operator.PERCENTAGE);
      expect(service.calculate(50, operator, 0)).toBe(0.5);
    });

    it('should calculate the sine of an angle in radians', () => {
      const operator = new Operator(Operator.SIN);
      expect(service.calculate(0, operator, 0)).toBe(0);
      expect(service.calculate(Math.PI / 2, operator, 0)).toBe(1);
    });

    it('should calculate the cosine of an angle in radians', () => {
      const operator = new Operator(Operator.COS);
      expect(service.calculate(0, operator, 0)).toBe(1);
      expect(service.calculate(Math.PI, operator, 0)).toBe(-1);
    });

    it('should calculate the tangent of an angle in radians', () => {
      const operator = new Operator(Operator.TAN);
      expect(service.calculate(0, operator, 0)).toBe(0);
    });

    it('should calculate the natural logarithm', () => {
      const operator = new Operator(Operator.LOG);
      expect(service.calculate(Math.E, operator, 0)).toBe(1);
    });

    it('should throw error for the square root of a negative number', () => {
      const operator = new Operator(Operator.SQUARE_ROOT);
      expect(() => service.calculate(-4, operator, 0)).toThrow(
        'Cannot calculate square root of a negative number'
      );
    });

    it('should throw error for the tangent at odd multiples of PI/2', () => {
      const operator = new Operator(Operator.TAN);
      expect(() => service.calculate(Math.PI / 2, operator, 0)).toThrow(
        'Tangent is undefined'
      );
    });

    it('should throw error for the logarithm of a non-positive number', () => {
      const operator = new Operator(Operator.LOG);
      expect(() => service.calculate(0, operator, 0)).toThrow(
        'Cannot calculate logarithm of a non-positive number'
      );
      expect(() => service.calculate(-1, operator, 0)).toThrow(
        'Cannot calculate logarithm of a non-positive number'
      );
    });
  });

  describe('isValidNumber', () => {
    it('should return true for valid numbers', () => {
      expect(service.isValidNumber('123')).toBe(true);
      expect(service.isValidNumber('12.34')).toBe(true);
      expect(service.isValidNumber(123)).toBe(true);
    });

    it('should return false for invalid numbers', () => {
      expect(service.isValidNumber('abc')).toBe(false);
      expect(service.isValidNumber('')).toBe(false);
      expect(service.isValidNumber(null)).toBe(false);
    });
  });

  describe('parseNumber', () => {
    it('should parse valid number strings', () => {
      expect(service.parseNumber('123')).toBe(123);
      expect(service.parseNumber('12.34')).toBe(12.34);
    });

    it('should throw error for invalid strings', () => {
      expect(() => service.parseNumber('abc')).toThrow('Cannot parse');
    });
  });
});
