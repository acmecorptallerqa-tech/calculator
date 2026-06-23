import { Operator } from '../value-objects/Operator.js';

/**
 * Domain Service: CalculatorService
 *
 * Contains business logic for performing calculations.
 * This logic doesn't naturally belong to any single entity.
 */
export class CalculatorService {
  /**
   * Performs a calculation based on the operator
   * @param {number} leftOperand
   * @param {Operator} operator
   * @param {number} rightOperand
   * @returns {number}
   * @throws {Error} if division by zero is attempted
   */
  calculate(leftOperand, operator, rightOperand) {
    // Validate inputs
    if (typeof leftOperand !== 'number' || isNaN(leftOperand)) {
      throw new Error('Left operand must be a valid number');
    }
    if (typeof rightOperand !== 'number' || isNaN(rightOperand)) {
      throw new Error('Right operand must be a valid number');
    }
    if (!(operator instanceof Operator)) {
      throw new Error('Operator must be a valid Operator instance');
    }

    // Perform calculation based on operator
    switch (operator.getValue()) {
      case Operator.ADD:
        return this.#add(leftOperand, rightOperand);
      case Operator.SUBTRACT:
        return this.#subtract(leftOperand, rightOperand);
      case Operator.MULTIPLY:
        return this.#multiply(leftOperand, rightOperand);
      case Operator.DIVIDE:
        return this.#divide(leftOperand, rightOperand);
      default:
        throw new Error(`Unsupported operator: ${operator.getValue()}`);
    }
  }

  /**
   * Addition operation
   * @private
   */
  #add(a, b) {
    return this.#roundToDecimalPlaces(a + b, 10);
  }

  /**
   * Subtraction operation
   * @private
   */
  #subtract(a, b) {
    return this.#roundToDecimalPlaces(a - b, 10);
  }

  /**
   * Multiplication operation
   * @private
   */
  #multiply(a, b) {
    return this.#roundToDecimalPlaces(a * b, 10);
  }

  /**
   * Division operation
   * Business rule: Division by zero is not allowed
   * @private
   * @throws {Error} if divisor is zero
   */
  #divide(a, b) {
    if (b === 0) {
      throw new Error('Cannot divide by zero');
    }
    return this.#roundToDecimalPlaces(a / b, 10);
  }

  /**
   * Rounds a number to avoid floating-point precision errors
   * @private
   */
  #roundToDecimalPlaces(num, decimalPlaces) {
    const factor = Math.pow(10, decimalPlaces);
    return Math.round(num * factor) / factor;
  }

  /**
   * Validates if a string can be parsed as a valid number
   * @param {string} str
   * @returns {boolean}
   */
  isValidNumber(str) {
    if (typeof str !== 'string' && typeof str !== 'number') {
      return false;
    }
    const num = parseFloat(str);
    return !isNaN(num) && isFinite(num);
  }

  /**
   * Parses a string to a number
   * @param {string} str
   * @returns {number}
   * @throws {Error} if string cannot be parsed
   */
  parseNumber(str) {
    if (!this.isValidNumber(str)) {
      throw new Error(`Cannot parse "${str}" as a valid number`);
    }
    return parseFloat(str);
  }
}
