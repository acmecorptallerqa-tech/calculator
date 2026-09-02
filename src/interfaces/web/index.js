/**
 * Web Application Entry Point
 *
 * Initializes the application with dependency injection.
 * Sets up all layers and wires them together.
 */

// Domain
import { CalculatorService } from '../../domain/services/CalculatorService.js';
import { Operator } from '../../domain/value-objects/Operator.js';

// Infrastructure
import { LocalStorageCalculationRepository } from '../../infrastructure/repositories/LocalStorageCalculationRepository.js';

// Application
import { PerformCalculation } from '../../application/use-cases/PerformCalculation.js';
import { GetCalculationHistory } from '../../application/use-cases/GetCalculationHistory.js';
import { ClearCalculationHistory } from '../../application/use-cases/ClearCalculationHistory.js';

// Interface
import { CalculatorController } from './controllers/CalculatorController.js';

/**
 * Dependency Injection Container
 * Wires up all dependencies following clean architecture rules
 */
export class DIContainer {
  constructor() {
    // Infrastructure layer
    this.calculationRepository = new LocalStorageCalculationRepository();

    // Domain layer
    this.calculatorService = new CalculatorService();

    // Application layer
    this.performCalculationUseCase = new PerformCalculation(
      this.calculationRepository,
      this.calculatorService
    );
    this.getHistoryUseCase = new GetCalculationHistory(
      this.calculationRepository
    );
    this.clearHistoryUseCase = new ClearCalculationHistory(
      this.calculationRepository
    );

    // Interface layer
    this.calculatorController = new CalculatorController(
      this.performCalculationUseCase,
      this.getHistoryUseCase,
      this.clearHistoryUseCase
    );
  }

  getCalculatorController() {
    return this.calculatorController;
  }
}

/**
 * UI Manager
 * Handles DOM manipulation and event listeners
 */
export class UIManager {
  constructor(controller) {
    this.controller = controller;
    this.currentInput = '';
    this.leftOperand = null;
    this.operator = null;
    this.waitingForSecondOperand = false;
  }

  /**
   * Initializes the UI and sets up event listeners
   */
  init() {
    this.display = document.getElementById('display');
    this.historyList = document.getElementById('history-list');

    this.#setupEventListeners();
    this.#loadHistory();
  }

  /**
   * Sets up event listeners for calculator buttons
   * @private
   */
  #setupEventListeners() {
    // Number buttons
    document.querySelectorAll('.btn-number').forEach((button) => {
      button.addEventListener('click', () => this.#handleNumber(button.textContent));
    });

    // Operator buttons (arithmetic and scientific)
    document.querySelectorAll('[data-operator]').forEach((button) => {
      const symbol = button.dataset.operator;
      button.addEventListener('click', () => this.#handleOperatorSymbol(symbol));
    });

    // Equals button
    document.getElementById('btn-equals')?.addEventListener('click', () => this.#handleEquals());

    // Clear button
    document.getElementById('btn-clear')?.addEventListener('click', () => this.#handleClear());

    // Clear entry button
    document.getElementById('btn-clear-entry')?.addEventListener('click', () => this.#handleClearEntry());

    // Backspace button
    document.getElementById('btn-backspace')?.addEventListener('click', () => this.#handleBackspace());

    // Decimal button
    document.getElementById('btn-decimal')?.addEventListener('click', () => this.#handleDecimal());

    // Clear history button
    document.getElementById('btn-clear-history')?.addEventListener('click', () => this.#handleClearHistory());

    // Keyboard support
    document.addEventListener('keydown', (e) => this.#handleKeyboard(e));
  }

  /**
   * Handles number button clicks
   * @private
   */
  #handleNumber(num) {
    if (this.waitingForSecondOperand) {
      this.currentInput = num;
      this.waitingForSecondOperand = false;
    } else {
      this.currentInput = this.currentInput === '0' ? num : this.currentInput + num;
    }
    this.#updateDisplay(this.currentInput);
  }

  /**
   * Routes an operator symbol to the binary or unary flow.
   * Arity is owned by the domain, not by the markup.
   * @private
   * @param {string} symbol
   */
  #handleOperatorSymbol(symbol) {
    if (Operator.fromSymbol(symbol).isUnary()) {
      return this.#handleUnaryOperator(symbol);
    }
    return this.#handleOperator(symbol);
  }

  /**
   * Handles single-operand operator clicks (√, %, sin, cos, tan, log).
   * Applies to the value on the display right away; a pending binary
   * operation is left untouched, so "5 + 16 √ =" yields 9.
   * @private
   * @param {string} symbol
   */
  async #handleUnaryOperator(symbol) {
    const operand = this.currentInput === '' ? '0' : this.currentInput;

    // The domain service ignores the right operand for unary operators
    const result = await this.controller.calculate(operand, symbol, '0');

    if (await this.#applyResult(result)) {
      this.waitingForSecondOperand = true;
    }
  }

  /**
   * Handles operator button clicks
   * @private
   */
  #handleOperator(op) {
    const inputValue = this.currentInput;

    if (this.leftOperand === null) {
      this.leftOperand = inputValue;
    } else if (this.operator) {
      // If there's a pending operation, perform it first
      this.#performCalculation();
    }

    this.operator = op;
    this.waitingForSecondOperand = true;
  }

  /**
   * Handles equals button click
   * @private
   */
  async #handleEquals() {
    if (this.operator && this.leftOperand !== null) {
      await this.#performCalculation();
      this.operator = null;
      this.leftOperand = null;
      this.waitingForSecondOperand = true;
    }
  }

  /**
   * Performs the calculation via the controller
   * @private
   */
  async #performCalculation() {
    const result = await this.controller.calculate(
      this.leftOperand,
      this.operator,
      this.currentInput
    );

    if (await this.#applyResult(result)) {
      this.leftOperand = this.currentInput;
    }
  }

  /**
   * Applies a controller response to the display and history
   * @private
   * @param {{success: boolean, data?: any, error?: string}} result
   * @returns {Promise<boolean>} whether the calculation succeeded
   */
  async #applyResult(result) {
    if (!result.success) {
      this.#updateDisplay(result.error);
      setTimeout(() => {
        this.#handleClearEntry();
      }, 2000);
      return false;
    }

    this.currentInput = result.data.result.toString();
    this.#updateDisplay(this.currentInput);
    await this.#loadHistory();
    return true;
  }

  /**
   * Handles clear button (clears current input)
   * @private
   */
  #handleClear() {
    this.currentInput = '0';
    this.#updateDisplay(this.currentInput);
  }

  /**
   * Handles clear entry button (clears everything)
   * @private
   */
  #handleClearEntry() {
    this.currentInput = '0';
    this.leftOperand = null;
    this.operator = null;
    this.waitingForSecondOperand = false;
    this.#updateDisplay(this.currentInput);
  }

  /**
   * Handles decimal button click
   * @private
   */
  #handleDecimal() {
    if (this.waitingForSecondOperand) {
      this.currentInput = '0.';
      this.waitingForSecondOperand = false;
    } else if (!this.currentInput.includes('.')) {
      this.currentInput += '.';
    }
    this.#updateDisplay(this.currentInput);
  }

  /**
   * Handles backspace (removes the last typed character)
   * @private
   */
  #handleBackspace() {
    this.currentInput = this.currentInput.slice(0, -1) || '0';
    this.#updateDisplay(this.currentInput);
  }

  /**
   * Handles clear history button click
   * @private
   */
  async #handleClearHistory() {
    const result = await this.controller.clearHistory();
    if (result.success) {
      await this.#loadHistory();
    }
  }

  /**
   * Handles keyboard input
   * @private
   */
  #handleKeyboard(e) {
    if (e.key >= '0' && e.key <= '9') {
      this.#handleNumber(e.key);
    } else if (e.key === '.') {
      this.#handleDecimal();
    } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
      const operatorMap = { '+': '+', '-': '-', '*': '×', '/': '÷' };
      this.#handleOperator(operatorMap[e.key]);
    } else if (e.key === 'Enter' || e.key === '=') {
      e.preventDefault();
      this.#handleEquals();
    } else if (e.key === 'Escape') {
      this.#handleClearEntry();
    } else if (e.key === 'Backspace') {
      this.#handleBackspace();
    }
  }

  /**
   * Updates the display
   * @private
   */
  #updateDisplay(value) {
    this.display.textContent = value;
  }

  /**
   * Loads and displays calculation history
   * @private
   */
  async #loadHistory() {
    const result = await this.controller.getHistory();
    if (result.success) {
      this.#renderHistory(result.data.calculations);
    }
  }

  /**
   * Renders the history list
   * @private
   */
  #renderHistory(calculations) {
    this.historyList.innerHTML = '';
    
    if (calculations.length === 0) {
      this.historyList.innerHTML = '<div class="history-empty">No calculations yet</div>';
      return;
    }

    calculations.forEach((calc) => {
      const item = document.createElement('div');
      item.className = 'history-item';
      item.innerHTML = `
        <div class="history-expression">${calc.expression}</div>
        <div class="history-time">${this.#formatTimestamp(calc.timestamp)}</div>
      `;
      this.historyList.appendChild(item);
    });
  }

  /**
   * Formats timestamp for display
   * @private
   */
  #formatTimestamp(isoString) {
    const date = new Date(isoString);
    return date.toLocaleTimeString();
  }
}

/**
 * Application Bootstrap
 */
document.addEventListener('DOMContentLoaded', () => {
  const container = new DIContainer();
  const controller = container.getCalculatorController();
  const uiManager = new UIManager(controller);
  uiManager.init();
});
