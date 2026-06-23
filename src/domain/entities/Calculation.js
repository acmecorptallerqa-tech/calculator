/**
 * Domain Entity: Calculation
 *
 * Represents a single mathematical calculation with identity and lifecycle.
 * Immutable once created - calculations cannot be modified after creation.
 */
export class Calculation {
  /**
   * @param {number} leftOperand - The first number in the calculation
   * @param {import('../value-objects/Operator.js').Operator} operator - The operation to perform
   * @param {number} rightOperand - The second number in the calculation
   * @param {number} result - The calculated result
   * @param {Date} timestamp - When the calculation was performed
   */
  constructor(leftOperand, operator, rightOperand, result, timestamp = new Date()) {
    // Validate invariants
    if (typeof leftOperand !== 'number' || isNaN(leftOperand)) {
      throw new Error('Left operand must be a valid number');
    }
    if (typeof rightOperand !== 'number' || isNaN(rightOperand)) {
      throw new Error('Right operand must be a valid number');
    }
    if (typeof result !== 'number' || isNaN(result)) {
      throw new Error('Result must be a valid number');
    }
    if (!operator || typeof operator.getSymbol !== 'function') {
      throw new Error('Operator must be a valid Operator value object');
    }
    if (!(timestamp instanceof Date) || isNaN(timestamp.getTime())) {
      throw new Error('Timestamp must be a valid Date');
    }

    // Freeze properties to ensure immutability
    Object.defineProperty(this, 'leftOperand', {
      value: leftOperand,
      writable: false,
      enumerable: true,
    });
    Object.defineProperty(this, 'operator', {
      value: operator,
      writable: false,
      enumerable: true,
    });
    Object.defineProperty(this, 'rightOperand', {
      value: rightOperand,
      writable: false,
      enumerable: true,
    });
    Object.defineProperty(this, 'result', {
      value: result,
      writable: false,
      enumerable: true,
    });
    Object.defineProperty(this, 'timestamp', {
      value: timestamp,
      writable: false,
      enumerable: true,
    });

    Object.freeze(this);
  }

  /**
   * Returns a string representation of the calculation
   * @returns {string} - Example: "5 + 3 = 8"
   */
  toString() {
    return `${this.leftOperand} ${this.operator.getSymbol()} ${this.rightOperand} = ${this.result}`;
  }

  /**
   * Creates a plain object representation for serialization
   * @returns {Object}
   */
  toObject() {
    return {
      leftOperand: this.leftOperand,
      operator: this.operator.getValue(),
      rightOperand: this.rightOperand,
      result: this.result,
      timestamp: this.timestamp.toISOString(),
    };
  }

  /**
   * Factory method to create a Calculation from a plain object
   * @param {Object} data
   * @returns {Calculation}
   */
  static fromObject(data) {
    const { Operator } = require('../value-objects/Operator.js');
    return new Calculation(
      data.leftOperand,
      Operator.fromValue(data.operator),
      data.rightOperand,
      data.result,
      new Date(data.timestamp)
    );
  }
}
