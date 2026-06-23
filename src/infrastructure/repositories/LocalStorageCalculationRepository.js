import { CalculationRepository } from '../../domain/repositories/CalculationRepository.js';
import { Calculation } from '../../domain/entities/Calculation.js';
import { Operator } from '../../domain/value-objects/Operator.js';

/**
 * Infrastructure: LocalStorage Implementation of CalculationRepository
 *
 * Persists calculations to browser localStorage.
 * This is a concrete implementation of the domain interface.
 */
export class LocalStorageCalculationRepository extends CalculationRepository {
  static #STORAGE_KEY = 'calculator_history';

  /**
   * Saves a calculation to localStorage
   * @param {Calculation} calculation
   * @returns {Promise<void>}
   */
  async save(calculation) {
    try {
      const calculations = await this.#loadFromStorage();
      calculations.push(calculation.toObject());
      this.#saveToStorage(calculations);
    } catch (error) {
      throw new Error(`Failed to save calculation: ${error.message}`);
    }
  }

  /**
   * Retrieves all calculations from localStorage
   * @returns {Promise<Calculation[]>}
   */
  async findAll() {
    try {
      const data = await this.#loadFromStorage();
      return data
        .map((item) => this.#deserializeCalculation(item))
        .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    } catch (error) {
      throw new Error(`Failed to retrieve calculations: ${error.message}`);
    }
  }

  /**
   * Retrieves calculations within a date range
   * @param {Date} startDate
   * @param {Date} endDate
   * @returns {Promise<Calculation[]>}
   */
  async findByDateRange(startDate, endDate) {
    try {
      const allCalculations = await this.findAll();
      return allCalculations.filter((calc) => {
        const timestamp = calc.timestamp.getTime();
        return (
          timestamp >= startDate.getTime() && timestamp <= endDate.getTime()
        );
      });
    } catch (error) {
      throw new Error(
        `Failed to retrieve calculations by date range: ${error.message}`
      );
    }
  }

  /**
   * Deletes all calculations from localStorage
   * @returns {Promise<void>}
   */
  async deleteAll() {
    try {
      this.#saveToStorage([]);
    } catch (error) {
      throw new Error(`Failed to delete calculations: ${error.message}`);
    }
  }

  /**
   * Counts total number of calculations
   * @returns {Promise<number>}
   */
  async count() {
    try {
      const calculations = await this.#loadFromStorage();
      return calculations.length;
    } catch (error) {
      throw new Error(`Failed to count calculations: ${error.message}`);
    }
  }

  /**
   * Loads data from localStorage
   * @private
   * @returns {Promise<Object[]>}
   */
  async #loadFromStorage() {
    try {
      const data = localStorage.getItem(
        LocalStorageCalculationRepository.#STORAGE_KEY
      );
      if (!data) {
        return [];
      }
      return JSON.parse(data);
    } catch (error) {
      // If parsing fails, return empty array and clear corrupted data
      localStorage.removeItem(LocalStorageCalculationRepository.#STORAGE_KEY);
      return [];
    }
  }

  /**
   * Saves data to localStorage
   * @private
   * @param {Object[]} data
   */
  #saveToStorage(data) {
    try {
      localStorage.setItem(
        LocalStorageCalculationRepository.#STORAGE_KEY,
        JSON.stringify(data)
      );
    } catch (error) {
      // Handle quota exceeded or other storage errors
      throw new Error('Storage quota exceeded or localStorage unavailable');
    }
  }

  /**
   * Deserializes a plain object to a Calculation entity
   * @private
   * @param {Object} data
   * @returns {Calculation}
   */
  #deserializeCalculation(data) {
    const operator = Operator.fromValue(data.operator);
    return new Calculation(
      data.leftOperand,
      operator,
      data.rightOperand,
      data.result,
      new Date(data.timestamp)
    );
  }
}
