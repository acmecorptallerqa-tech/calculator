# Calculator

A production-ready calculator application built with vanilla JavaScript, HTML, and CSS following Clean Architecture principles.

## Features

- Basic arithmetic operations (addition, subtraction, multiplication, division)
- Calculation history tracking
- Clean, intuitive user interface
- Error handling for invalid operations (e.g., division by zero)
- Persistent calculation history using localStorage

## Tech Stack

- **Frontend**: Vanilla JavaScript (ES6+), HTML5, CSS3
- **Architecture**: Clean Architecture
- **Testing**: Jest (configured, tests ready to implement)
- **Linting**: ESLint
- **Formatting**: Prettier

## Clean Architecture Layers

This project follows Clean Architecture principles with strict dependency rules:

### 📦 Domain Layer (`src/domain/`)
The heart of the application containing business logic and rules.
- **Entities**: `Calculation` - represents a single calculation with its operands, operator, and result
- **Value Objects**: `Operator` - immutable representation of arithmetic operators with validation
- **Domain Services**: `CalculatorService` - handles calculation logic and business rules
- **Repository Interfaces**: `CalculationRepository` - defines contract for storing/retrieving calculations
- **Zero external dependencies** - domain imports nothing from outside itself

### 🎯 Application Layer (`src/application/`)
Orchestrates domain objects to fulfill use cases.
- **Use Cases**: 
  - `PerformCalculation` - executes a calculation and saves to history
  - `GetCalculationHistory` - retrieves past calculations
  - `ClearCalculationHistory` - clears all history
- **DTOs**: Input/output contracts for use cases
- Imports only from `domain/`

### 🔌 Infrastructure Layer (`src/infrastructure/`)
Implements interfaces defined in domain/application.
- **Repository Implementation**: `LocalStorageCalculationRepository` - persists calculations to browser localStorage
- Handles all I/O operations
- Imports from `domain/` and `application/`

### 🎮 Interfaces Layer (`src/interfaces/`)
Entry points and adapters for external interactions.
- **Web Controller**: `CalculatorController` - handles UI interactions and calls use cases
- **UI Initialization**: Sets up event listeners and DOM manipulation
- Thin layer - only validates input and serializes output

### Dependency Rule (ABSOLUTE)
```
interfaces → application → domain
infrastructure → application → domain
```

Domain has ZERO knowledge of the outside world.

## Project Structure

```
calculator/
├── src/
│   ├── domain/
│   │   ├── entities/
│   │   │   └── Calculation.js
│   │   ├── value-objects/
│   │   │   └── Operator.js
│   │   ├── services/
│   │   │   └── CalculatorService.js
│   │   ├── repositories/
│   │   │   └── CalculationRepository.js
│   │   └── CLAUDE.md
│   ├── application/
│   │   ├── use-cases/
│   │   │   ├── PerformCalculation.js
│   │   │   ├── GetCalculationHistory.js
│   │   │   └── ClearCalculationHistory.js
│   │   ├── dtos/
│   │   │   └── CalculationDTO.js
│   │   └── CLAUDE.md
│   ├── infrastructure/
│   │   ├── repositories/
│   │   │   └── LocalStorageCalculationRepository.js
│   │   └── CLAUDE.md
│   └── interfaces/
│       ├── web/
│       │   ├── controllers/
│       │   │   └── CalculatorController.js
│       │   └── index.js
│       └── CLAUDE.md
├── public/
│   ├── index.html
│   ├── styles.css
│   └── app.js
├── tests/
│   └── .gitkeep
├── .eslintrc.json
├── .prettierrc.json
├── .gitignore
├── package.json
├── architecture.json
├── CLAUDE.md
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd calculator
```

2. Install dependencies:
```bash
npm install
```

### Development

1. Start a local server:
```bash
npm start
```

2. Open your browser and navigate to:
```
http://localhost:8080
```

### Linting

```bash
# Check for linting errors
npm run lint

# Auto-fix linting errors
npm run lint:fix
```

### Formatting

```bash
# Check formatting
npm run format:check

# Auto-format files
npm run format
```

### Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## Usage

### Basic Operations

1. Enter numbers using the numeric buttons (0-9)
2. Click an operator button (+, -, ×, ÷)
3. Enter the second number
4. Press "=" to see the result

### Additional Features

- **Clear (C)**: Clears the current input
- **Clear Entry (CE)**: Clears the entire calculation
- **Decimal Point (.)**: Add decimal numbers
- **History**: View past calculations in the history panel
- **Clear History**: Remove all calculation history

## Business Rules

- Division by zero is prevented and displays an error message
- Operators are validated before performing calculations
- Only valid numeric inputs are accepted
- Calculation history persists across browser sessions
- Each calculation is immutable once created

## Contributing

When adding new features:

1. Identify which layer the feature belongs to
2. Start with domain entities/services if adding business logic
3. Create use cases in the application layer
4. Implement infrastructure adapters as needed
5. Add UI controllers in the interfaces layer
6. Follow the dependency rule strictly

## License

MIT License
