# convention

A rule the codebase follows — naming, patterns, and where things live.

## `Operator` value object has exactly two extension points, the private static fields `#VAL…

What: `Operator` value object has exactly two extension points, the private static fields `#VALID_OPERATORS` and `#OPERATOR_SYMBOLS`; every public method (`fromSymbol`, `fromValue`, `getAllValues`, `getAllSymbols`, constructor validation) derives from those two fields. · Why: keeps the value object's validation/equality/freeze logic untouched when adding new operators. · Where: src/domain/value-objects/Operator.js · Learned: to add a new operator, add the constant, append it to `#VALID_OPERATORS`, and add its symbol to `#OPERATOR_SYMBOLS` — no other code needs to change. <!-- id: 387c5d83-37a7-440a-aefa-dcac89c49e76-0 -->

## Every CalculatorService operation result, including the new scientific ones, is passed th…

What: Every CalculatorService operation result, including the new scientific ones, is passed through the existing private #roundToDecimalPlaces(x, 10) helper before returning. · Why: preserves the service's existing precision/rounding behavior for old and new operators alike. · Where: CalculatorService.js. <!-- id: eb9294e6-5120-4763-ac0e-47e126808640-4 -->

## Input validation for calculator operations throws a descriptive Error from inside the pri…

What: Input validation for calculator operations throws a descriptive Error from inside the private operation method before computing/returning, mirroring the existing #divide ("Cannot divide by zero") style. · Why: — · Where: CalculatorService.js — applied for negative square root, non-positive log, and the tangent asymptote. <!-- id: eb9294e6-5120-4763-ac0e-47e126808640-5 -->
