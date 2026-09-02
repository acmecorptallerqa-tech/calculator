# decision

A choice made and the reasoning behind it — the path taken over the alternatives.

## The scientific operator symbols added to Operator are `^` (POWER), `√` (SQUARE_ROOT), `%`…

What: The scientific operator symbols added to Operator are `^` (POWER), `√` (SQUARE_ROOT), `%` (PERCENTAGE), and the literal text `sin`/`cos`/`tan`/`log` for the trig/log operators, alongside the existing `+ - × ÷`. · Why: — · Where: src/domain/value-objects/Operator.js. <!-- id: 387c5d83-37a7-440a-aefa-dcac89c49e76-1 -->

## Unary vs. binary arity was deliberately left unmodeled on the Operator value object even…

What: Unary vs. binary arity was deliberately left unmodeled on the Operator value object even though SQUARE_ROOT, SIN, COS, TAN and LOG are single-operand operations. · Why: the work order scoped only the domain value object; `Calculation`/`CalculatorService` are still hard-wired to `left, operator, right`, and no acceptance criterion asked for an arity helper. Arity modeling (including whether PERCENTAGE is unary `a/100` or binary "a% of b") is deferred to the CalculatorService work order that implements the actual operations. · Where: src/domain/value-objects/Operator.js, src/domain/services/CalculatorService.js. <!-- id: 387c5d83-37a7-440a-aefa-dcac89c49e76-2 -->
