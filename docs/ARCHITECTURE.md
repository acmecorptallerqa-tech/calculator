# Architecture Documentation

## Overview

This calculator application is built using **Clean Architecture** principles, ensuring a clear separation of concerns and maintainable, testable code.

## Clean Architecture Principles

### The Dependency Rule

**Dependencies only point inward.**

```
┌─────────────────────────────────────────┐
│         Interfaces (Adapters)           │ ← External world
│  Controllers, UI, CLI, Web handlers     │
├─────────────────────────────────────────┤
│           Infrastructure                 │ ← External services
│  DB, APIs, localStorage, HTTP clients   │
├─────────────────────────────────────────┤
│           Application                    │ ← Use cases
│  Use Cases, DTOs, Orchestration         │
├─────────────────────────────────────────┤
│             Domain                       │ ← Business logic
│  Entities, Value Objects, Services      │
└─────────────────────────────────────────┘
```

**Key Rule**: Inner layers know NOTHING about outer layers.

## Layer Details

### Domain Layer (`src/domain/`)

**Purpose**: Contains all business logic and business rules.

**Characteristics**:
- Zero dependencies on external libraries
- Zero knowledge of databases, APIs, or UI
- Pure JavaScript/TypeScript
- Highly testable

**Components**:

1. **Entities** (`entities/`)
   - Objects with identity and lifecycle
   - Protect their own invariants
   - Example: `Calculation`
   ```javascript
   class Calculation {
     constructor(leftOperand, operator, rightOperand, result, timestamp) {
       // Validates invariants
       // Immutable after creation
     }
   }
   ```

2. **Value Objects** (`value-objects/`)
   - Immutable
   - Equality based on value, not identity
   - Example: `Operator`
   ```javascript
   class Operator {
     constructor(value) {
       // Validates operator is valid
       Object.freeze(this);
     }
     equals(other) { ... }
   }
   ```

3. **Domain Services** (`services/`)
   - Business logic that doesn't belong to a single entity
   - Example: `CalculatorService`
   ```javascript
   class CalculatorService {
     calculate(left, operator, right) {
       // Performs calculation logic
       // Enforces business rules (e.g., no division by zero)
     }
   }
   ```

4. **Repository Interfaces** (`repositories/`)
   - Define WHAT data operations are needed
   - Not HOW they're implemented
   ```javascript
   class CalculationRepository {
     async save(calculation) { throw new Error('Not implemented'); }
     async findAll() { throw new Error('Not implemented'); }
   }
   ```

### Application Layer (`src/application/`)

**Purpose**: Orchestrates domain objects to fulfill use cases.

**Characteristics**:
- Knows WHAT to do, not HOW
- Depends only on domain layer
- Coordinates between domain objects
- Transaction boundaries

**Components**:

1. **Use Cases** (`use-cases/`)
   - One class per use case
   - Single `execute()` method
   - Receives dependencies via constructor (DI)
   ```javascript
   class PerformCalculation {
     constructor(repository, calculatorService) {
       this.repository = repository;
       this.calculatorService = calculatorService;
     }
     
     async execute(inputDTO) {
       // 1. Parse input
       // 2. Call domain service
       // 3. Create entity
       // 4. Save via repository
       // 5. Return DTO
     }
   }
   ```

2. **DTOs** (`dtos/`)
   - Input/output contracts
   - Protect domain from external concerns
   ```javascript
   class PerformCalculationInputDTO {
     constructor(leftOperand, operatorSymbol, rightOperand) {
       this.leftOperand = leftOperand;
       this.operatorSymbol = operatorSymbol;
       this.rightOperand = rightOperand;
     }
   }
   ```

### Infrastructure Layer (`src/infrastructure/`)

**Purpose**: Implements interfaces defined by inner layers.

**Characteristics**:
- All I/O happens here
- External dependencies live here
- Implements domain/application interfaces
- Maps between external formats and domain entities

**Components**:

1. **Repository Implementations** (`repositories/`)
   - Concrete implementations of repository interfaces
   - Handle serialization/deserialization
   ```javascript
   class LocalStorageCalculationRepository extends CalculationRepository {
     async save(calculation) {
       // Convert domain entity to storage format
       // Save to localStorage
     }
     
     async findAll() {
       // Load from localStorage
       // Convert to domain entities
     }
   }
   ```

### Interfaces Layer (`src/interfaces/`)

**Purpose**: Entry points into the application.

**Characteristics**:
- Thin layer
- Translates external requests to use case calls
- Handles input validation (schema only)
- Formats responses

**Components**:

1. **Controllers** (`web/controllers/`)
   - Handle HTTP requests/UI events
   - Call use cases
   - Never contain business logic
   ```javascript
   class CalculatorController {
     constructor(performCalculationUseCase, ...) {
       this.performCalculationUseCase = performCalculationUseCase;
     }
     
     async calculate(left, operator, right) {
       // Validate input format
       const dto = new PerformCalculationInputDTO(left, operator, right);
       // Call use case
       const result = await this.performCalculationUseCase.execute(dto);
       // Format response
       return { success: true, data: result };
     }
   }
   ```

2. **UI Initialization** (`web/index.js`)
   - Sets up dependency injection
   - Initializes application
   ```javascript
   class DIContainer {
     constructor() {
       // Infrastructure
       this.repository = new LocalStorageCalculationRepository();
       // Domain
       this.calculatorService = new CalculatorService();
       // Application
       this.performCalculation = new PerformCalculation(
         this.repository,
         this.calculatorService
       );
       // Interface
       this.controller = new CalculatorController(this.performCalculation);
     }
   }
   ```

## Data Flow

### Example: Performing a Calculation

```
User clicks "=" button
        ↓
UIManager.handleEquals()
        ↓
CalculatorController.calculate(left, operator, right)
        ↓
PerformCalculation.execute(PerformCalculationInputDTO)
        ↓
CalculatorService.calculate(left, operator, right)
        ↓
Creates Calculation entity
        ↓
LocalStorageCalculationRepository.save(calculation)
        ↓
Returns CalculationResultDTO
        ↓
Controller formats response
        ↓
UIManager updates display
```

## Benefits

### 1. Testability
- Domain layer has zero dependencies → easy to unit test
- Use cases can be tested with mock repositories
- Business logic isolated from UI and database

### 2. Flexibility
- Swap localStorage for a REST API → only change infrastructure
- Change UI framework → only change interfaces layer
- Add new use cases → no need to modify existing code

### 3. Maintainability
- Clear boundaries between layers
- Each layer has a single responsibility
- Dependencies point inward → changes propagate predictably

### 4. Independent Development
- Teams can work on different layers simultaneously
- Domain experts can focus on business logic
- UI developers work independently of backend
- Infrastructure changes don't affect business rules

## Common Patterns

### 1. Dependency Injection

Dependencies are injected via constructor:

```javascript
class UseCase {
  constructor(repository, service) {
    this.repository = repository;
    this.service = service;
  }
}
```

### 2. Repository Pattern

Domain defines interface, infrastructure implements:

```javascript
// Domain
class Repository {
  async save(entity) { throw new Error('Not implemented'); }
}

// Infrastructure
class ConcreteRepository extends Repository {
  async save(entity) {
    // Actual implementation
  }
}
```

### 3. DTO Pattern

Use cases communicate via DTOs:

```javascript
// Input
const input = new InputDTO(data);
const result = await useCase.execute(input);
// Output
const output = new OutputDTO(result);
```

## Testing Strategy

### Domain Layer
- Pure unit tests
- No mocks needed
- Test business rules thoroughly

### Application Layer
- Unit tests with mocked repositories
- Test use case orchestration
- Verify correct DTO mapping

### Infrastructure Layer
- Integration tests
- Test actual I/O operations
- Verify serialization/deserialization

### Interfaces Layer
- Controller tests with mocked use cases
- Test input validation
- Verify response formatting

## Anti-Patterns to Avoid

### ❌ Anemic Domain Model
```javascript
// BAD: Entity with no behavior
class Calculation {
  constructor(left, operator, right, result) {
    this.left = left;
    this.operator = operator;
    this.right = right;
    this.result = result;
  }
}

// Business logic in use case instead
class PerformCalculation {
  execute(dto) {
    if (dto.operator === '/' && dto.right === 0) {
      throw new Error('Cannot divide by zero');
    }
    // This belongs in domain!
  }
}
```

### ✅ Rich Domain Model
```javascript
// GOOD: Entity protects invariants
class Calculation {
  constructor(left, operator, right, result) {
    if (operator.getValue() === 'DIVIDE' && right === 0) {
      throw new Error('Cannot divide by zero');
    }
    // Business rule enforced in domain
  }
}
```

### ❌ Infrastructure in Domain
```javascript
// BAD: Domain importing infrastructure
import { localStorage } from '../../infrastructure/...';

class Calculation {
  save() {
    localStorage.setItem('calc', this);
  }
}
```

### ✅ Repository Pattern
```javascript
// GOOD: Domain defines interface
class CalculationRepository {
  async save(calculation) { ... }
}

// Infrastructure implements
class LocalStorageCalculationRepository extends CalculationRepository {
  async save(calculation) {
    localStorage.setItem('calc', JSON.stringify(calculation.toObject()));
  }
}
```

## Further Reading

- [Clean Architecture by Robert C. Martin](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Domain-Driven Design by Eric Evans](https://www.domainlanguage.com/ddd/)
- [Hexagonal Architecture](https://alistair.cockburn.us/hexagonal-architecture/)
