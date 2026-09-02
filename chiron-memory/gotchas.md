# gotcha

A non-obvious pitfall or trap, learned the hard way.

## Operator now carries unary operations the rest of the domain doesn't model

**What** — `SQUARE_ROOT`, `SIN`, `COS`, `TAN`, `LOG` (and arguably `PERCENTAGE`)
take a single operand, but `CalculatorService.calculate` and the `Calculation`
entity are both hard-wired to `left, operator, right`. `Operator` has no arity
concept, so nothing stops a caller building a two-operand `sin`.

**Why** — The domain value object was extended first, on purpose, so the service
could implement the operations afterwards. Until arity is modelled, the service's
`switch` falls through to `default` and throws `Unsupported operator` for these.

**Where** — `src/domain/value-objects/Operator.js`,
`src/domain/services/CalculatorService.js`, `src/domain/entities/Calculation.js`

**Learned** — 2026-09-02, extending Operator with scientific operations.
