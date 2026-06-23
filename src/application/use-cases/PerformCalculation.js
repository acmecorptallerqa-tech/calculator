import { Calculation } from '../../domain/entities/Calculation.js';
import { Operator } from '../../domain/value-objects/Operator.js';
import { CalculatorService } from '../../domain/services/CalculatorService.js';
import { CalculationResultDTO } from '../dtos/CalculationDTO.js';

/**
 * Use Case: Perform Calculation
 *
 * Orchestrates the calculation process:
 * 1. Parse and validate input
 * 2. Perform calculation using domain service
 * 3. Create calculation entity
 * 4. Persist to repository
 * 5. Return result as DTO
 */
export class PerformCalculation {
  /**
   * @param {import('../../domain/repositories/CalculationRepository.js').CalculationRepository} calculationRepository
   * @param {CalculatorService} calculatorService
   */
  constructor(calculationRepository, calculatorService) {
    this.calculationRepository = calculationRepository;
    this.calculatorService = calculatorService;
  }

  /**
   * Executes the use case
   * @param {import('../dtos/CalculationDTO.js').PerformCalculationInputDTO} inputDTO
   * @returns {Promise<CalculationResultDTO>}
   * @throws {Error} if validation fails or calculation error occurs
   */
  async execute(inputDTO) {
    try {
      // Parse input strings to numbers
      const leftOperand = this.calculatorService.parseNumber(
        inputDTO.leftOperand
      );
      const rightOperand = this.calculatorService.parseNumber(
        inputDTO.rightOperand
      );

      // Parse operator symbol to Operator value object
      const operator = Operator.fromSymbol(inputDTO.operatorSymbol);

      // Perform calculation using domain service
      const result = this.calculatorService.calculate(
        leftOperand,
        operator,
        rightOperand
      );

      // Create calculation entity
      const calculation = new Calculation(
        leftOperand,
        operator,
        rightOperand,
        result
      );

      // Persist calculation
      await this.calculationRepository.save(calculation);

      // Return result as DTO
      return new CalculationResultDTO(
        result,
        calculation.toString(),
        calculation.timestamp.toISOString()
      );
    } catch (error) {
      // Re-throw with context
      if (error.message.includes('divide by zero')) {
        throw new Error('Cannot divide by zero');
      }
      if (error.message.includes('Invalid operator')) {
        throw new Error('Invalid operator provided');
      }
      if (error.message.includes('Cannot parse')) {
        throw new Error('Invalid number format');
      }
      throw error;
    }
  }
}
