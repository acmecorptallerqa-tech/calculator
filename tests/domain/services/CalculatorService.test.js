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
