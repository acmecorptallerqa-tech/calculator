# decision

A technical decision that was made and WHY (which alternatives were discarded).

## The scientific operator symbols added to Operator are `^` (POWER), `√` (SQUARE_ROOT), `%`…

What: The scientific operator symbols added to Operator are `^` (POWER), `√` (SQUARE_ROOT), `%` (PERCENTAGE), and the literal text `sin`/`cos`/`tan`/`log` for the trig/log operators, alongside the existing `+ - × ÷`. · Why: — · Where: src/domain/value-objects/Operator.js. <!-- id: 387c5d83-37a7-440a-aefa-dcac89c49e76-1 -->

## Unary vs. binary arity was deliberately left unmodeled on the Operator value object even…

What: Unary vs. binary arity was deliberately left unmodeled on the Operator value object even though SQUARE_ROOT, SIN, COS, TAN and LOG are single-operand operations. · Why: the work order scoped only the domain value object; `Calculation`/`CalculatorService` are still hard-wired to `left, operator, right`, and no acceptance criterion asked for an arity helper. Arity modeling (including whether PERCENTAGE is unary `a/100` or binary "a% of b") is deferred to the CalculatorService work order that implements the actual operations. · Where: src/domain/value-objects/Operator.js, src/domain/services/CalculatorService.js. <!-- id: 387c5d83-37a7-440a-aefa-dcac89c49e76-2 -->

## Arity for scientific operators is resolved only inside CalculatorService.calculate's swit…

What: Arity for scientific operators is resolved only inside CalculatorService.calculate's switch — unary ops (SQUARE_ROOT, PERCENTAGE, SIN, COS, TAN, LOG) ignore rightOperand inside their own case, while Operator.js and Calculation.js stay untouched/binary-only. · Why: acceptance criteria call calculate with a dummy 0 rightOperand for unary ops, and the existing 'right operand must be a valid number' guard already accepts that, so no domain-model change was needed. · Where: src/domain/services/CalculatorService.js · Learned: only add Operator.isUnary() (or similar) if arity needs to be enforced/queried outside the service, e.g. when wiring single-operand entry into the UI. <!-- id: eb9294e6-5120-4763-ac0e-47e126808640-0 -->

## PERCENTAGE operator computes a/100 (unary), not 'a% of b' (binary).

What: PERCENTAGE operator computes a/100 (unary), not 'a% of b' (binary). · Why: settled by acceptance criterion calculate(50, PERCENTAGE, 0) === 0.5. · Where: src/domain/services/CalculatorService.js (#percentage). <!-- id: eb9294e6-5120-4763-ac0e-47e126808640-1 -->

## LOG operator computes the natural logarithm via Math.log, not log10/log2.

What: LOG operator computes the natural logarithm via Math.log, not log10/log2. · Why: acceptance criterion requires log(Math.E) === 1. · Where: src/domain/services/CalculatorService.js (#log). <!-- id: eb9294e6-5120-4763-ac0e-47e126808640-2 -->

## Trigonometric operators (SIN, COS, TAN) assume the operand is in radians, not degrees.

What: Trigonometric operators (SIN, COS, TAN) assume the operand is in radians, not degrees. · Why: — · Where: src/domain/services/CalculatorService.js. <!-- id: eb9294e6-5120-4763-ac0e-47e126808640-3 -->
