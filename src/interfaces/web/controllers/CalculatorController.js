import { PerformCalculationInputDTO } from '../../../application/dtos/CalculationDTO.js';

/**
 * Web Controller: CalculatorController
 *
 * Handles user interactions from the web UI and coordinates with use cases.
 * This is a thin layer - no business logic, only input validation and output formatting.
 */
export class CalculatorController {
  /**
   * @param {import('../../../application/use-cases/PerformCalculation.js').PerformCalculation} performCalculationUseCase
   * @param {import('../../../application/use-cases/GetCalculationHistory.js').GetCalculationHistory} getHistoryUseCase
   * @param {import('../../../application/use-cases/ClearCalculationHistory.js').ClearCalculationHistory} clearHistoryUseCase
   */
  constructor(
    performCalculationUseCase,
    getHistoryUseCase,
    clearHistoryUseCase
  ) {
    this.performCalculationUseCase = performCalculationUseCase;
    this.getHistoryUseCase = getHistoryUseCase;
    this.clearHistoryUseCase = clearHistoryUseCase;
  }

  /**
   * Handles a calculation request
   * @param {string} leftOperand
   * @param {string} operatorSymbol
   * @param {string} rightOperand
   * @returns {Promise<{success: boolean, data?: any, error?: string}>}
   */
  async calculate(leftOperand, operatorSymbol, rightOperand) {
    try {
      // Input validation (schema validation only, not business rules)
      if (!leftOperand || !operatorSymbol || !rightOperand) {
        return {
          success: false,
          error: 'All fields are required',
        };
      }

      // Create input DTO
      const inputDTO = new PerformCalculationInputDTO(
        leftOperand,
        operatorSymbol,
        rightOperand
      );

      // Execute use case
      const resultDTO = await this.performCalculationUseCase.execute(inputDTO);

      // Return formatted response
      return {
        success: true,
        data: {
          result: resultDTO.result,
          expression: resultDTO.expression,
          timestamp: resultDTO.timestamp,
        },
      };
    } catch (error) {
      // Map domain/application errors to user-friendly messages
      return {
        success: false,
        error: this.#formatErrorMessage(error.message),
      };
    }
  }

  /**
   * Handles a request to get calculation history
   * @returns {Promise<{success: boolean, data?: any, error?: string}>}
   */
  async getHistory() {
    try {
      // Execute use case
      const historyDTO = await this.getHistoryUseCase.execute();

      // Return formatted response
      return {
        success: true,
        data: {
          calculations: historyDTO.calculations,
          totalCount: historyDTO.totalCount,
        },
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to load history',
      };
    }
  }

  /**
   * Handles a request to clear calculation history
   * @returns {Promise<{success: boolean, data?: any, error?: string}>}
   */
  async clearHistory() {
    try {
      // Execute use case
      const resultDTO = await this.clearHistoryUseCase.execute();

      // Return formatted response
      return {
        success: true,
        data: {
          message: resultDTO.message,
        },
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to clear history',
      };
    }
  }

  /**
   * Formats error messages for display to users
   * @private
   * @param {string} errorMessage
   * @returns {string}
   */
  #formatErrorMessage(errorMessage) {
    // Map technical errors to user-friendly messages
    const errorMap = {
      'Cannot divide by zero': 'Error: Cannot divide by zero',
      'Invalid operator': 'Error: Invalid operator',
      'Invalid number format': 'Error: Invalid number format',
      'parse': 'Error: Invalid input',
    };

    for (const [key, value] of Object.entries(errorMap)) {
      if (errorMessage.includes(key)) {
        return value;
      }
    }

    // Default error message
    return 'An error occurred. Please try again.';
  }
}
