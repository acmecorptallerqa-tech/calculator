import {
  CalculationHistoryDTO,
  CalculationHistoryItemDTO,
} from '../dtos/CalculationDTO.js';

/**
 * Use Case: Get Calculation History
 *
 * Retrieves all past calculations and returns them as DTOs.
 */
export class GetCalculationHistory {
  /**
   * @param {import('../../domain/repositories/CalculationRepository.js').CalculationRepository} calculationRepository
   */
  constructor(calculationRepository) {
    this.calculationRepository = calculationRepository;
  }

  /**
   * Executes the use case
   * @returns {Promise<CalculationHistoryDTO>}
   */
  async execute() {
    try {
      // Retrieve all calculations from repository
      const calculations = await this.calculationRepository.findAll();

      // Get total count
      const totalCount = calculations.length;

      // Map domain entities to DTOs
      const calculationDTOs = calculations.map(
        (calc) =>
          new CalculationHistoryItemDTO(
            calc.toString(),
            calc.result,
            calc.timestamp.toISOString()
          )
      );

      return new CalculationHistoryDTO(calculationDTOs, totalCount);
    } catch (error) {
      // Re-throw with context
      throw new Error(`Failed to retrieve calculation history: ${error.message}`);
    }
  }

  /**
   * Executes the use case with date range filter
   * @param {Date} startDate
   * @param {Date} endDate
   * @returns {Promise<CalculationHistoryDTO>}
   */
  async executeWithDateRange(startDate, endDate) {
    try {
      // Validate dates
      if (!(startDate instanceof Date) || isNaN(startDate.getTime())) {
        throw new Error('Invalid start date');
      }
      if (!(endDate instanceof Date) || isNaN(endDate.getTime())) {
        throw new Error('Invalid end date');
      }
      if (startDate > endDate) {
        throw new Error('Start date must be before end date');
      }

      // Retrieve calculations within date range
      const calculations = await this.calculationRepository.findByDateRange(
        startDate,
        endDate
      );

      // Get total count
      const totalCount = calculations.length;

      // Map domain entities to DTOs
      const calculationDTOs = calculations.map(
        (calc) =>
          new CalculationHistoryItemDTO(
            calc.toString(),
            calc.result,
            calc.timestamp.toISOString()
          )
      );

      return new CalculationHistoryDTO(calculationDTOs, totalCount);
    } catch (error) {
      // Re-throw with context
      throw new Error(`Failed to retrieve calculation history: ${error.message}`);
    }
  }
}
