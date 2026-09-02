# convention

A rule, pattern or convention this project follows (naming, formats, repeated approach).

## `Operator` is extended by editing exactly two private static fields, `#VALID_OPERATORS` a…

What: `Operator` is extended by editing exactly two private static fields, `#VALID_OPERATORS` and `#OPERATOR_SYMBOLS`. · Why: `fromSymbol`, `fromValue`, `getAllValues` and `getAllSymbols` all derive from those two fields, so no other method needs to change when a new operator is added. · Where: src/domain/value-objects/Operator.js. · Learned: every symbol added to `#OPERATOR_SYMBOLS` must stay unique across the whole map, otherwise `fromSymbol`'s lookup becomes ambiguous. <!-- id: 387c5d83-37a7-440a-aefa-dcac89c49e76-0 -->

## Every CalculatorService operation result, including the new scientific ones, is routed th…

What: Every CalculatorService operation result, including the new scientific ones, is routed through the existing private #roundToDecimalPlaces(x, 10) helper. · Why: preserves the service's existing precision behavior instead of introducing per-operation rounding rules. · Where: src/domain/services/CalculatorService.js. <!-- id: eb9294e6-5120-4763-ac0e-47e126808640-5 -->

## New scientific-operation validation errors follow the existing #divide-style pattern of t…

What: New scientific-operation validation errors follow the existing #divide-style pattern of throwing a plain descriptive Error ('Cannot divide by zero'); new messages added are 'Cannot calculate square root of a negative number', 'Cannot calculate logarithm of a non-positive number', and 'Tangent is undefined at odd multiples of π/2'. · Why: — · Where: src/domain/services/CalculatorService.js. <!-- id: eb9294e6-5120-4763-ac0e-47e126808640-6 -->
