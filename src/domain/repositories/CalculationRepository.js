/**
 * Repository Interface: CalculationRepository
 *
 * Defines the contract for persisting and retrieving calculations.
 * This is an INTERFACE - implementations live in the infrastructure layer.
 */
export class CalculationRepository {
  /**
   * Saves a calculation
   * @param {import('../entities/Calculation.js').Calculation} calculation
   * @returns {Promise<void>}
   * @abstract
   */
  async save(calculation) {
    throw new Error('Method not implemented: save()');
  }

  /**
   * Retrieves all calculations, ordered by timestamp (newest first)
   * @returns {Promise<import('../entities/Calculation.js').Calculation[]>}
   * @abstract
   */
  async findAll() {
    throw new Error('Method not implemented: findAll()');
  }

  /**
   * Retrieves calculations within a time range
   * @param {Date} startDate
   * @param {Date} endDate
   * @returns {Promise<import('../entities/Calculation.js').Calculation[]>}
   * @abstract
   */
  async findByDateRange(startDate, endDate) {
    throw new Error('Method not implemented: findByDateRange()');
  }

  /**
   * Deletes all calculations
   * @returns {Promise<void>}
   * @abstract
   */
  async deleteAll() {
    throw new Error('Method not implemented: deleteAll()');
  }

  /**
   * Counts total number of calculations
   * @returns {Promise<number>}
   * @abstract
   */
  async count() {
    throw new Error('Method not implemented: count()');
  }
}
