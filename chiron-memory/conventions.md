# convention

A rule the codebase follows — naming, patterns, and where things live.

## `Operator` is extended by editing exactly two private static fields, `#VALID_OPERATORS` a…

What: `Operator` is extended by editing exactly two private static fields, `#VALID_OPERATORS` and `#OPERATOR_SYMBOLS`. · Why: `fromSymbol`, `fromValue`, `getAllValues` and `getAllSymbols` all derive from those two fields, so no other method needs to change when a new operator is added. · Where: src/domain/value-objects/Operator.js. · Learned: every symbol added to `#OPERATOR_SYMBOLS` must stay unique across the whole map, otherwise `fromSymbol`'s lookup becomes ambiguous. <!-- id: 387c5d83-37a7-440a-aefa-dcac89c49e76-0 -->

## Every CalculatorService operation result, including the new scientific ones, is routed th…

What: Every CalculatorService operation result, including the new scientific ones, is routed through the existing private #roundToDecimalPlaces(x, 10) helper. · Why: preserves the service's existing precision behavior instead of introducing per-operation rounding rules. · Where: src/domain/services/CalculatorService.js. <!-- id: eb9294e6-5120-4763-ac0e-47e126808640-5 -->

## New scientific-operation validation errors follow the existing #divide-style pattern of t…

What: New scientific-operation validation errors follow the existing #divide-style pattern of throwing a plain descriptive Error ('Cannot divide by zero'); new messages added are 'Cannot calculate square root of a negative number', 'Cannot calculate logarithm of a non-positive number', and 'Tangent is undefined at odd multiples of π/2'. · Why: — · Where: src/domain/services/CalculatorService.js. <!-- id: eb9294e6-5120-4763-ac0e-47e126808640-6 -->

## SIN, COS and TAN results in `CalculatorService` are rounded to 10 decimal places

What: SIN, COS and TAN results in `CalculatorService` are rounded to 10 decimal places · Why: avoids exposing raw floating-point noise to callers · Where: src/domain/services/CalculatorService.js · Learned: this causes trig identities like sin(π) or cos(π/2) to collapse to exactly 0 in test assertions rather than a near-zero float, so tests should assert exact 0, not toBeCloseTo. <!-- id: a344a1d6-27ce-44e9-8bb0-63378b7b9191-1 -->

## TAN asymptote error messages render the angle using the unicode π character (π), not the…

What: TAN asymptote error messages render the angle using the unicode π character (π), not the word "pi" · Why: — · Where: src/domain/services/CalculatorService.js · Learned: exact-string error assertions for TAN at π/2, 3π/2, -π/2 must use the π codepoint to match. <!-- id: a344a1d6-27ce-44e9-8bb0-63378b7b9191-2 -->

## the invalid-operator error message enumerates all 11 valid operator values (4 arithmetic…

What: the invalid-operator error message enumerates all 11 valid operator values (4 arithmetic + 7 scientific: POWER, SQUARE_ROOT, PERCENTAGE, SIN, COS, TAN, LOG) · Why: — · Where: src/domain/value-objects/Operator.js · Learned: exact-string assertions on this error must be updated whenever an operator is added or removed, since the count is baked into the message. <!-- id: a344a1d6-27ce-44e9-8bb0-63378b7b9191-3 -->

## src/domain/value-objects/Operator.js is structured with two explicit extension points for…

What: src/domain/value-objects/Operator.js is structured with two explicit extension points for adding new operator behavior, alongside its static operator-symbol table · Why: — · Where: src/domain/value-objects/Operator.js · Learned: follow this file's existing extension-point pattern when adding isUnary() or future operator classifications rather than introducing a new structure. <!-- id: ae8012c2-664a-4080-b08d-85c49d788242-4 -->

## Grid buttons meant to span multiple columns (e.g

What: Grid buttons meant to span multiple columns (e.g. the equals button) use the CSS idiom `grid-column: span 2` inside the calculator's button grid · Why: — · Where: public/styles.css (.btn-equals) · Learned: reuse `grid-column: span 2` for other multi-column buttons (e.g. `%` in a new scientific panel) instead of inventing a new layout mechanism. <!-- id: ae8012c2-664a-4080-b08d-85c49d788242-5 -->

## src/interfaces/web/index.js is being changed from a bootstrap-only entry point to one tha…

What: src/interfaces/web/index.js is being changed from a bootstrap-only entry point to one that also exports its DIContainer and UIManager classes · Why: unit tests need to instantiate and drive the real UI wiring classes directly; auto-bootstrap-on-load behavior stays unchanged · Where: src/interfaces/web/index.js · Learned: when adding tests for this file's UI wiring, import DIContainer/UIManager from it rather than re-implementing wiring in the test. <!-- id: ae8012c2-664a-4080-b08d-85c49d788242-8 -->

## DOM-driven tests for the web interface load the real markup from public/index.html into j…

What: DOM-driven tests for the web interface load the real markup from public/index.html into jsdom and drive it through actual button clicks, instead of testing against a synthetic/mocked DOM fixture · Why: — · Where: tests/interfaces/web/UIManager.test.js · Learned: follow this same real-markup-in-jsdom pattern for future UI interaction tests in this project rather than hand-rolling mock DOM elements. <!-- id: ae8012c2-664a-4080-b08d-85c49d788242-9 -->
