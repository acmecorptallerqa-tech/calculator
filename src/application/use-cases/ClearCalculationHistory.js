import { OperationSuccessDTO } from '../dtos/CalculationDTO.js';

/**
 * Use Case: Clear Calculation History
 *
 * Deletes all calculation history.
 */
export class ClearCalculationHistory {
  /**
   * @param {import('../../domain/repositories/CalculationRepository.js').CalculationRepository} calculationRepository
   */
  constructor(calculationRepository) {
    this.calculationRepository = calculationRepository;
  }

  /**
   * Executes the use case
   * @returns {Promise<OperationSuccessDTO>}
   */
  async execute() {
    try {
      // Get count before deletion for confirmation message
      const count = await this.calculationRepository.count();

      // Delete all calculations
      await this.calculationRepository.deleteAll();

      // Return success message
      return new OperationSuccessDTO(
        `Successfully cleared ${count} calculation${count !== 1 ? 's' : ''} from history`
      );
    } catch (error) {
      // Re-throw with context
      throw new Error(`Failed to clear calculation history: ${error.message}`);
    }
  }
}
