/**
 * Value Object: Operator
 *
 * Represents an arithmetic or scientific operator with validation.
 * Immutable - equality is based on value, not identity.
 */
export class Operator {
  static ADD = 'ADD';
  static SUBTRACT = 'SUBTRACT';
  static MULTIPLY = 'MULTIPLY';
  static DIVIDE = 'DIVIDE';
  static POWER = 'POWER';
  static SQUARE_ROOT = 'SQUARE_ROOT';
  static PERCENTAGE = 'PERCENTAGE';
  static SIN = 'SIN';
  static COS = 'COS';
  static TAN = 'TAN';
  static LOG = 'LOG';

  static #VALID_OPERATORS = [
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
  ];

  static #OPERATOR_SYMBOLS = {
    [Operator.ADD]: '+',
    [Operator.SUBTRACT]: '-',
    [Operator.MULTIPLY]: '×',
    [Operator.DIVIDE]: '÷',
    [Operator.POWER]: '^',
    [Operator.SQUARE_ROOT]: '√',
    [Operator.PERCENTAGE]: '%',
    [Operator.SIN]: 'sin',
    [Operator.COS]: 'cos',
    [Operator.TAN]: 'tan',
    [Operator.LOG]: 'log',
  };

  /**
   * @param {string} value - One of the valid operator constants
   */
  constructor(value) {
    if (!Operator.#VALID_OPERATORS.includes(value)) {
      throw new Error(
        `Invalid operator: ${value}. Must be one of: ${Operator.#VALID_OPERATORS.join(', ')}`
      );
    }

    Object.defineProperty(this, '_value', {
      value: value,
      writable: false,
      enumerable: false,
    });

    Object.freeze(this);
  }

  /**
   * Gets the internal value of the operator
   * @returns {string}
   */
  getValue() {
    return this._value;
  }

  /**
   * Gets the symbol representation of the operator
   * @returns {string}
   */
  getSymbol() {
    return Operator.#OPERATOR_SYMBOLS[this._value];
  }

  /**
   * Checks equality with another Operator
   * @param {Operator} other
   * @returns {boolean}
   */
  equals(other) {
    if (!(other instanceof Operator)) {
      return false;
    }
    return this._value === other._value;
  }

  /**
   * Factory method to create an Operator from a string value
   * @param {string} value
   * @returns {Operator}
   */
  static fromValue(value) {
    return new Operator(value);
  }

  /**
   * Factory method to create an Operator from a symbol
   * @param {string} symbol
   * @returns {Operator}
   */
  static fromSymbol(symbol) {
    const entry = Object.entries(Operator.#OPERATOR_SYMBOLS).find(
      ([_, sym]) => sym === symbol
    );
    if (!entry) {
      throw new Error(`Invalid operator symbol: ${symbol}`);
    }
    return new Operator(entry[0]);
  }

  /**
   * Gets all valid operator values
   * @returns {string[]}
   */
  static getAllValues() {
    return [...Operator.#VALID_OPERATORS];
  }

  /**
   * Gets all valid operator symbols
   * @returns {string[]}
   */
  static getAllSymbols() {
    return Object.values(Operator.#OPERATOR_SYMBOLS);
  }
}
