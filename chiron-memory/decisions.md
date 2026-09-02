# decision

A choice made and the reasoning behind it — the path taken over the alternatives.

## The 7 new scientific operators (POWER, SQUARE_ROOT, PERCENTAGE, SIN, COS, TAN, LOG) were…

What: The 7 new scientific operators (POWER, SQUARE_ROOT, PERCENTAGE, SIN, COS, TAN, LOG) were added only to the `Operator` value object; `CalculatorService.calculate`'s switch statement was deliberately left untouched and still throws "Unsupported operator" for all of them. · Why: this work order scoped only the domain value object (foundation layer); implementing the actual calculation logic is explicitly a separate, later work order. · Where: src/domain/value-objects/Operator.js, src/domain/services/CalculatorService.js · Learned: don't expand scope to implement service-layer behavior when the work order only asks for the domain constant/validation layer. <!-- id: 387c5d83-37a7-440a-aefa-dcac89c49e76-2 -->

## Arity for scientific operations is resolved inside `CalculatorService` only: unary…

What: Arity for scientific operations is resolved inside `CalculatorService` only: unary operators (SQUARE_ROOT, PERCENTAGE, SIN, COS, TAN, LOG) have switch cases that take `leftOperand` and ignore `rightOperand`, and PERCENTAGE is unary `a/100` (not "a% of b"). `Operator` gained no `isUnary()`, and `Calculation` stays binary, so callers pass `0` as the right operand. The `calculate` guard "Right operand must be a valid number" therefore still applies to unary calls. · Why: the acceptance criteria fix both open questions (`calculate(50, PERCENTAGE, 0) === 0.5`, every unary call passes `0`), and the work order scoped only the domain service; an `isUnary()` on the value object would be dead code until the UI work order needs it. Supersedes the earlier decision that the switch was left untouched. · Where: src/domain/services/CalculatorService.js · Learned: arity lives in the service's switch, not in the domain model; if the UI later needs to know an operator's arity, that is the moment to add `isUnary()` to `Operator`, not before. <!-- id: a099d662-dd6e-45e7-abe9-f4c85bbe6d11-1 -->
