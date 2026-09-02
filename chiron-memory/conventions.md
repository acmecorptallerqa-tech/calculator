# convention

A rule the codebase follows — naming, patterns, and where things live.

## `Operator` is extended by editing exactly two private static fields, `#VALID_OPERATORS` a…

What: `Operator` is extended by editing exactly two private static fields, `#VALID_OPERATORS` and `#OPERATOR_SYMBOLS`. · Why: `fromSymbol`, `fromValue`, `getAllValues` and `getAllSymbols` all derive from those two fields, so no other method needs to change when a new operator is added. · Where: src/domain/value-objects/Operator.js. · Learned: every symbol added to `#OPERATOR_SYMBOLS` must stay unique across the whole map, otherwise `fromSymbol`'s lookup becomes ambiguous. <!-- id: 387c5d83-37a7-440a-aefa-dcac89c49e76-0 -->
