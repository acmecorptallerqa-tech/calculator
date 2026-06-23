# Architecture Diagrams

## Clean Architecture Layers

```
┌───────────────────────────────────────────────────────────────┐
│                     INTERFACES LAYER                          │
│                  (User Interface / Web)                       │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  CalculatorController                               │    │
│  │  - calculate(left, operator, right)                 │    │
│  │  - getHistory()                                     │    │
│  │  - clearHistory()                                   │    │
│  └─────────────────────────────────────────────────────┘    │
│                          ↓                                    │
└───────────────────────────────────────────────────────────────┘
                           ↓
┌───────────────────────────────────────────────────────────────┐
│                   APPLICATION LAYER                           │
│                     (Use Cases)                               │
│                                                               │
│  ┌───────────────────┐  ┌──────────────────┐  ┌──────────┐  │
│  │ PerformCalculation│  │ GetHistory       │  │ ClearHistory│
│  │                   │  │                  │  │          │  │
│  │ execute(dto)      │  │ execute()        │  │ execute()│  │
│  └───────────────────┘  └──────────────────┘  └──────────┘  │
│                          ↓                                    │
└───────────────────────────────────────────────────────────────┘
                           ↓
┌───────────────────────────────────────────────────────────────┐
│                      DOMAIN LAYER                             │
│                  (Business Logic)                             │
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐   │
│  │ Calculation  │  │  Operator    │  │ CalculatorService│   │
│  │  (Entity)    │  │ (Value Obj)  │  │   (Service)      │   │
│  └──────────────┘  └──────────────┘  └──────────────────┘   │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ CalculationRepository (Interface)                   │    │
│  │ - save(calculation)                                 │    │
│  │ - findAll()                                         │    │
│  └─────────────────────────────────────────────────────┘    │
│                          ↑                                    │
└───────────────────────────────────────────────────────────────┘
                           ↑
┌───────────────────────────────────────────────────────────────┐
│                  INFRASTRUCTURE LAYER                         │
│                (External Services)                            │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ LocalStorageCalculationRepository                   │    │
│  │ - save(calculation)                                 │    │
│  │ - findAll()                                         │    │
│  │ - deleteAll()                                       │    │
│  └─────────────────────────────────────────────────────┘    │
│                          ↓                                    │
│                   localStorage                                │
└───────────────────────────────────────────────────────────────┘
```

## Dependency Rule

```
RULE: Dependencies ONLY point inward →

Interfaces     →    Application    →    Domain
     ↓                                      ↑
Infrastructure ─────────────────────────────┘

✅ Interfaces can import from Application
✅ Application can import from Domain
✅ Infrastructure can import from Domain & Application
❌ Domain NEVER imports from outer layers
```

## Data Flow: Perform Calculation

```
┌─────────────┐
│    User     │
│ clicks "="  │
└──────┬──────┘
       │ 1. UI Event
       ↓
┌─────────────────────────┐
│     UIManager           │
│  handleEquals()         │
└──────┬──────────────────┘
       │ 2. Call Controller
       ↓
┌──────────────────────────────────┐
│  CalculatorController            │
│  calculate("5", "+", "3")        │
└──────┬───────────────────────────┘
       │ 3. Create DTO
       ↓
┌──────────────────────────────────┐
│  PerformCalculationInputDTO      │
│  { left: "5", op: "+", right: "3" }│
└──────┬───────────────────────────┘
       │ 4. Execute Use Case
       ↓
┌──────────────────────────────────┐
│  PerformCalculation (Use Case)   │
│  execute(dto)                    │
│  ├─ Parse numbers                │
│  ├─ Create Operator              │
│  ├─ Call Calculator Service      │
│  ├─ Create Calculation Entity    │
│  ├─ Save to Repository           │
│  └─ Return Result DTO            │
└──────┬───────────────────────────┘
       │ 5. Calculate
       ↓
┌──────────────────────────────────┐
│  CalculatorService               │
│  calculate(5, ADD, 3)            │
│  Returns: 8                      │
└──────┬───────────────────────────┘
       │ 6. Create Entity
       ↓
┌──────────────────────────────────┐
│  Calculation Entity              │
│  new Calculation(5, ADD, 3, 8)   │
└──────┬───────────────────────────┘
       │ 7. Persist
       ↓
┌──────────────────────────────────┐
│  LocalStorageRepository          │
│  save(calculation)               │
│  → localStorage.setItem(...)     │
└──────┬───────────────────────────┘
       │ 8. Return Result
       ↓
┌──────────────────────────────────┐
│  CalculationResultDTO            │
│  { result: 8, expression: "..." }│
└──────┬───────────────────────────┘
       │ 9. Update UI
       ↓
┌──────────────────────────────────┐
│  UIManager                       │
│  Display: "8"                    │
│  Update History Panel            │
└──────────────────────────────────┘
```

## Component Relationships

```
┌─────────────────────────────────────────────────────────┐
│                    WEB INTERFACE                        │
│                                                         │
│  index.html ──→ app.js ──→ interfaces/web/index.js     │
│                               │                         │
│                               ├─→ DIContainer           │
│                               │   (Wires everything)    │
│                               │                         │
│                               ├─→ CalculatorController  │
│                               │                         │
│                               └─→ UIManager             │
└─────────────────────────────────────────────────────────┘
                                 │
                    ┌────────────┴────────────┐
                    ↓                         ↓
         ┌──────────────────┐    ┌──────────────────┐
         │   USE CASES      │    │  REPOSITORIES    │
         │                  │    │                  │
         │ • PerformCalc    │    │ • LocalStorage   │
         │ • GetHistory     │    │   Repository     │
         │ • ClearHistory   │    │                  │
         └────────┬─────────┘    └────────┬─────────┘
                  │                       │
                  ↓                       ↓
         ┌──────────────────────────────────────┐
         │          DOMAIN LAYER                │
         │                                      │
         │  Entities  │  Value Objects  │  Services │
         │  • Calculation  • Operator    • Calculator│
         │                                      │
         │  Repository Interfaces               │
         │  • CalculationRepository             │
         └──────────────────────────────────────┘
```

## Folder Structure

```
calculator/
│
├── src/
│   ├── domain/                    # 🧠 Core Business Logic
│   │   ├── entities/
│   │   │   └── Calculation.js     (Entity with identity)
│   │   ├── value-objects/
│   │   │   └── Operator.js        (Immutable value)
│   │   ├── services/
│   │   │   └── CalculatorService.js (Business logic)
│   │   └── repositories/
│   │       └── CalculationRepository.js (Interface)
│   │
│   ├── application/               # 🎯 Use Cases
│   │   ├── use-cases/
│   │   │   ├── PerformCalculation.js
│   │   │   ├── GetCalculationHistory.js
│   │   │   └── ClearCalculationHistory.js
│   │   └── dtos/
│   │       └── CalculationDTO.js
│   │
│   ├── infrastructure/            # 🔌 External Services
│   │   └── repositories/
│   │       └── LocalStorageCalculationRepository.js
│   │
│   └── interfaces/                # 🎮 UI / Entry Points
│       └── web/
│           ├── controllers/
│           │   └── CalculatorController.js
│           └── index.js (DI Container + UIManager)
│
└── public/                        # 🌐 Web Assets
    ├── index.html
    ├── styles.css
    └── app.js
```

## Layer Communication

```
┌─────────────┐
│ Interfaces  │  Knows about: Application (DTOs, Use Cases)
└─────────────┘  ↓ Calls use cases with DTOs
                 ↓ Formats responses

┌─────────────┐
│ Application │  Knows about: Domain (Entities, Services, Repos)
└─────────────┘  ↓ Orchestrates domain objects
                 ↓ Returns DTOs

┌─────────────┐
│   Domain    │  Knows about: NOTHING outside itself
└─────────────┘  ↓ Pure business logic
                 ↓ Zero dependencies

┌──────────────┐
│Infrastructure│  Knows about: Domain & Application
└──────────────┘  Implements interfaces defined in domain
```

## Dependency Injection Flow

```
┌────────────────────────────────────────────┐
│         DIContainer (Interfaces)           │
│                                            │
│  1. Create Infrastructure                  │
│     repository = new LocalStorageRepo()    │
│                                            │
│  2. Create Domain Services                 │
│     calculatorService = new CalcService()  │
│                                            │
│  3. Create Use Cases (inject deps)         │
│     performCalc = new PerformCalculation(  │
│       repository,                          │
│       calculatorService                    │
│     )                                      │
│                                            │
│  4. Create Controllers (inject use cases)  │
│     controller = new CalculatorController( │
│       performCalc,                         │
│       getHistory,                          │
│       clearHistory                         │
│     )                                      │
│                                            │
│  5. Initialize UI                          │
│     uiManager = new UIManager(controller)  │
└────────────────────────────────────────────┘
```

## Testing Strategy

```
┌──────────────────────────────────────────────┐
│  DOMAIN LAYER                                │
│  Tests: Pure unit tests                      │
│  Mocks: NONE (zero dependencies)             │
│  Example: CalculatorService.test.js          │
└──────────────────────────────────────────────┘
                    ↑
┌──────────────────────────────────────────────┐
│  APPLICATION LAYER                           │
│  Tests: Unit tests with mocked repositories  │
│  Mocks: Repository interfaces                │
│  Example: PerformCalculation.test.js         │
└──────────────────────────────────────────────┘
                    ↑
┌──────────────────────────────────────────────┐
│  INFRASTRUCTURE LAYER                        │
│  Tests: Integration tests                    │
│  Mocks: localStorage (or test database)      │
│  Example: LocalStorageRepository.test.js     │
└──────────────────────────────────────────────┘
                    ↑
┌──────────────────────────────────────────────┐
│  INTERFACES LAYER                            │
│  Tests: Controller tests with mocked use cases│
│  Mocks: Use cases                            │
│  Example: CalculatorController.test.js       │
└──────────────────────────────────────────────┘
```

## Entity Lifecycle

```
┌─────────────────────────────────────────────┐
│  Creating a Calculation                     │
└─────────────────────────────────────────────┘

User Input: "5 + 3 ="
      ↓
1. Parse Input (Application)
   leftOperand: 5
   operator: Operator.ADD
   rightOperand: 3
      ↓
2. Calculate (Domain Service)
   result = 5 + 3 = 8
      ↓
3. Create Entity (Domain)
   calculation = new Calculation(5, ADD, 3, 8, Date.now())
   → Validates invariants
   → Freezes object (immutable)
      ↓
4. Persist (Infrastructure)
   repository.save(calculation)
   → Serializes to plain object
   → Saves to localStorage
      ↓
5. Return DTO (Application)
   return new CalculationResultDTO(
     result: 8,
     expression: "5 + 3 = 8",
     timestamp: "2024-..."
   )
```

## Error Handling Flow

```
Domain Error
(e.g., division by zero)
      ↓
Domain Service throws Error
      ↓
Application catches & re-throws
with context
      ↓
Controller catches & formats
user-friendly message
      ↓
UI displays error
```

---

These diagrams show the complete architecture of the calculator application following Clean Architecture principles. Each layer has clear responsibilities and dependencies flow inward only.
