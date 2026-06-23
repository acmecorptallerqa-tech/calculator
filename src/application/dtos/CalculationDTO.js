/**
 * Data Transfer Objects for Calculation Use Cases
 *
 * DTOs define the input/output contracts for use cases.
 * They protect the domain from external concerns.
 */

/**
 * Input DTO for performing a calculation
 */
export class PerformCalculationInputDTO {
  /**
   * @param {string} leftOperand - String representation of the first number
   * @param {string} operatorSymbol - The operator symbol (+, -, ×, ÷)
   * @param {string} rightOperand - String representation of the second number
   */
  constructor(leftOperand, operatorSymbol, rightOperand) {
    this.leftOperand = leftOperand;
    this.operatorSymbol = operatorSymbol;
    this.rightOperand = rightOperand;
  }
}

/**
 * Output DTO for a successful calculation
 */
export class CalculationResultDTO {
  /**
   * @param {number} result - The calculation result
   * @param {string} expression - Human-readable expression (e.g., "5 + 3 = 8")
   * @param {string} timestamp - ISO timestamp of when calculation was performed
   */
  constructor(result, expression, timestamp) {
    this.result = result;
    this.expression = expression;
    this.timestamp = timestamp;
  }
}

/**
 * Output DTO for calculation history
 */
export class CalculationHistoryDTO {
  /**
   * @param {CalculationHistoryItemDTO[]} calculations - List of past calculations
   * @param {number} totalCount - Total number of calculations
   */
  constructor(calculations, totalCount) {
    this.calculations = calculations;
    this.totalCount = totalCount;
  }
}

/**
 * Individual calculation in history
 */
export class CalculationHistoryItemDTO {
  /**
   * @param {string} expression - Human-readable expression
   * @param {number} result - The result
   * @param {string} timestamp - ISO timestamp
   */
  constructor(expression, result, timestamp) {
    this.expression = expression;
    this.result = result;
    this.timestamp = timestamp;
  }
}

/**
 * Output DTO for operation success (no data)
 */
export class OperationSuccessDTO {
  /**
   * @param {string} message - Success message
   */
  constructor(message) {
    this.message = message;
  }
}
