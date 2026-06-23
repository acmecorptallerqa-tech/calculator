# Contributing to Calculator

Thank you for your interest in contributing! This project follows Clean Architecture principles strictly.

## Architecture Guidelines

### Before You Start

1. Read `CLAUDE.md` in the root directory
2. Read the layer-specific `CLAUDE.md` files in each `src/` subdirectory
3. Understand the dependency rule: `interfaces → application → domain` (← infrastructure)

### Where Does My Code Go?

Ask yourself these questions:

#### Is it business logic or domain rules?
→ **Domain Layer** (`src/domain/`)
- Entities with identity and lifecycle
- Value objects (immutable, equality by value)
- Domain services (business logic that doesn't fit in entities)
- Repository interfaces (WHAT, not HOW)

#### Is it a use case or application workflow?
→ **Application Layer** (`src/application/`)
- Use cases (one class per use case with `execute()` method)
- DTOs (input/output contracts)
- Application services (cross-cutting use case logic)

#### Does it talk to external systems?
→ **Infrastructure Layer** (`src/infrastructure/`)
- Repository implementations
- LocalStorage, Database, API clients
- Third-party service adapters
- Environment configuration

#### Does it handle user input or presentation?
→ **Interfaces Layer** (`src/interfaces/`)
- Web controllers
- CLI commands
- API route handlers
- Input validation (schema only, not business rules)

## Development Workflow

### 1. Setup

```bash
npm install
npm start
```

### 2. Create a New Feature

Follow this order:

1. **Domain First**: Define entities, value objects, or domain services
2. **Application Second**: Create use cases that orchestrate domain objects
3. **Infrastructure Third**: Implement repository or external service adapters
4. **Interface Last**: Add controllers or UI handlers

### 3. Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage
npm run test:coverage
```

Write tests following the same layer structure:
- `tests/domain/` - Test domain entities, value objects, services
- `tests/application/` - Test use cases
- `tests/infrastructure/` - Test repository implementations
- `tests/interfaces/` - Test controllers

### 4. Linting & Formatting

```bash
# Check linting
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format
```

## Pull Request Guidelines

### PR Checklist

- [ ] Code follows Clean Architecture dependency rules
- [ ] All files are in the correct layer
- [ ] No business logic in controllers
- [ ] No infrastructure imports in domain or application layers
- [ ] Tests are included and passing
- [ ] Code is formatted with Prettier
- [ ] No ESLint errors
- [ ] README updated if needed

### PR Description Template

```markdown
## What does this PR do?

Brief description of the changes.

## Which layers are affected?

- [ ] Domain
- [ ] Application
- [ ] Infrastructure
- [ ] Interfaces

## Architecture Impact

- Does this change any interfaces? (Yes/No)
- Does this add new dependencies? (Yes/No)
- Does this change the dependency flow? (Yes/No)

## Testing

- [ ] Unit tests added
- [ ] All tests passing
- [ ] Manual testing completed

## Related Issues

Fixes #issue_number
```

## Common Mistakes to Avoid

### ❌ Don't Do This

```javascript
// Domain importing infrastructure
import { LocalStorageRepository } from '../../infrastructure/...';

// Business logic in controller
if (amount > 1000) {
  // This is a business rule - belongs in domain!
}

// Use case depending on another use case
constructor(otherUseCase) { ... }

// Direct repository call from controller
await repository.save(entity);
```

### ✅ Do This Instead

```javascript
// Domain depends on nothing external
import { Entity } from './entities/Entity.js';

// Business logic in domain service
class OrderService {
  validateAmount(amount) {
    if (amount > 1000) throw new Error('...');
  }
}

// Use cases orchestrate, don't depend on each other
// Share logic through domain services instead

// Controllers call use cases only
const result = await useCase.execute(dto);
```

## Code Style

### Naming Conventions

- **Entities**: PascalCase, noun (e.g., `Calculation`, `User`)
- **Value Objects**: PascalCase, descriptive noun (e.g., `Operator`, `Email`)
- **Use Cases**: PascalCase, verb phrase (e.g., `PerformCalculation`, `CreateUser`)
- **DTOs**: PascalCase, ends with DTO (e.g., `CalculationResultDTO`)
- **Services**: PascalCase, ends with Service (e.g., `CalculatorService`)
- **Controllers**: PascalCase, ends with Controller (e.g., `CalculatorController`)

### File Structure

```
src/
├── domain/
│   ├── entities/          # One entity per file
│   ├── value-objects/     # One value object per file
│   ├── services/          # One service per file
│   └── repositories/      # One interface per file
├── application/
│   ├── use-cases/         # One use case per file
│   └── dtos/              # Related DTOs can share a file
├── infrastructure/
│   └── repositories/      # One implementation per file
└── interfaces/
    └── web/
        └── controllers/   # One controller per file
```

## Questions?

If you're unsure where something belongs:

1. Check the layer-specific `CLAUDE.md` files
2. Look at existing code for similar patterns
3. Open an issue to discuss before implementing

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
