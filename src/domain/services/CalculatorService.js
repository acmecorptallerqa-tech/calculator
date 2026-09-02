import { Operator } from '../value-objects/Operator.js';

/**
 * Domain Service: CalculatorService
 *
 * Contains business logic for performing calculations.
 * This logic doesn't naturally belong to any single entity.
 */
export class CalculatorService {
  /**
   * How close |cos(a)| must be to zero for the tangent to count as undefined
   */
  static #TAN_ASYMPTOTE_TOLERANCE = 1e-10;

  /**
   * Performs a calculation based on the operator
   * @param {number} leftOperand
   * @param {Operator} operator
   * @param {number} rightOperand - Unused for single-operand operators
   *   (SQUARE_ROOT, PERCENTAGE, SIN, COS, TAN, LOG); callers pass 0
   * @returns {number}
   * @throws {Error} if the operation is undefined for the given operands
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
      case Operator.POWER:
        return this.#power(leftOperand, rightOperand);
      case Operator.SQUARE_ROOT:
        return this.#squareRoot(leftOperand);
      case Operator.PERCENTAGE:
        return this.#percentage(leftOperand);
      case Operator.SIN:
        return this.#sin(leftOperand);
      case Operator.COS:
        return this.#cos(leftOperand);
      case Operator.TAN:
        return this.#tan(leftOperand);
      case Operator.LOG:
        return this.#log(leftOperand);
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
   * Power operation: a raised to the power of b
   * @private
   */
  #power(a, b) {
    return this.#roundToDecimalPlaces(Math.pow(a, b), 10);
  }

  /**
   * Square root operation (single operand)
   * Business rule: the square root of a negative number is not a real number
   * @private
   * @throws {Error} if the operand is negative
   */
  #squareRoot(a) {
    if (a < 0) {
      throw new Error('Cannot calculate square root of a negative number');
    }
    return this.#roundToDecimalPlaces(Math.sqrt(a), 10);
  }

  /**
   * Percentage operation (single operand): a% expressed as a decimal
   * @private
   */
  #percentage(a) {
    return this.#roundToDecimalPlaces(a / 100, 10);
  }

  /**
   * Sine operation (single operand, angle in radians)
   * @private
   */
  #sin(a) {
    return this.#roundToDecimalPlaces(Math.sin(a), 10);
  }

  /**
   * Cosine operation (single operand, angle in radians)
   * @private
   */
  #cos(a) {
    return this.#roundToDecimalPlaces(Math.cos(a), 10);
  }

  /**
   * Tangent operation (single operand, angle in radians)
   * Business rule: the tangent is undefined at odd multiples of PI/2.
   * Math.tan does not return Infinity there because PI/2 is not exactly
   * representable, so the asymptote is detected through the cosine instead.
   * @private
   * @throws {Error} if the operand is an odd multiple of PI/2
   */
  #tan(a) {
    if (Math.abs(Math.cos(a)) < CalculatorService.#TAN_ASYMPTOTE_TOLERANCE) {
      throw new Error('Tangent is undefined at odd multiples of \u03C0/2');
    }
    return this.#roundToDecimalPlaces(Math.tan(a), 10);
  }

  /**
   * Natural logarithm operation (single operand)
   * Business rule: the logarithm is only defined for positive numbers
   * @private
   * @throws {Error} if the operand is zero or negative
   */
  #log(a) {
    if (a <= 0) {
      throw new Error('Cannot calculate logarithm of a non-positive number');
    }
    return this.#roundToDecimalPlaces(Math.log(a), 10);
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
