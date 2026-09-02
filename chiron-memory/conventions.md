# convention

A rule the codebase follows — naming, patterns, and where things live.

## `Operator` value object has exactly two extension points, the private static fields `#VAL…

What: `Operator` value object has exactly two extension points, the private static fields `#VALID_OPERATORS` and `#OPERATOR_SYMBOLS`; every public method (`fromSymbol`, `fromValue`, `getAllValues`, `getAllSymbols`, constructor validation) derives from those two fields. · Why: keeps the value object's validation/equality/freeze logic untouched when adding new operators. · Where: src/domain/value-objects/Operator.js · Learned: to add a new operator, add the constant, append it to `#VALID_OPERATORS`, and add its symbol to `#OPERATOR_SYMBOLS` — no other code needs to change. <!-- id: 387c5d83-37a7-440a-aefa-dcac89c49e76-0 -->
