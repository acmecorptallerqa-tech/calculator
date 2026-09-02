# convention

A rule the codebase follows — naming, patterns, and where things live.

## Scientific buttons live in their own `.buttons-scientific` grid above the main keypad, re…

What: Scientific buttons live in their own `.buttons-scientific` grid above the main keypad, reusing the `.buttons` 4-column grid; row 1 is `sin cos tan log`, row 2 is `^ √ %` with `%` given `grid-column: span 2` (the same span idiom `.btn-equals` already uses). Each carries `data-operator` with the exact symbol from `Operator`'s `#OPERATOR_SYMBOLS`. · Why: seven buttons don't divide evenly into four columns; spanning the last one fills the row instead of leaving a hole, and keeps the panel visually deliberate. · Where: public/index.html, public/styles.css · Learned: the `data-operator` value must match `#OPERATOR_SYMBOLS` character for character (`√`, `×`, `÷` are the Unicode glyphs, not ASCII) or `Operator.fromSymbol` throws.

## UI acceptance criteria are verified by a jsdom test that loads the real `public/index.htm…

What: UI acceptance criteria are verified by a jsdom test that loads the real `public/index.html` body into `document.body.innerHTML` and drives it through `element.click()`, rather than by asserting on markup. `DIContainer` and `UIManager` are exported from `src/interfaces/web/index.js` purely to make this possible; the `DOMContentLoaded` bootstrap is unchanged. · Why: clicking the shipped markup proves the wiring end to end (button → controller → use case → domain → display), which a markup snapshot cannot. · Where: tests/interfaces/web/UIManager.test.js, src/interfaces/web/index.js · Learned: the click handlers are async, so await a `setTimeout(…, 0)` flush after each click before asserting on the display.

## `Operator` value object has exactly two extension points, the private static fields `#VAL…

What: `Operator` value object has exactly two extension points, the private static fields `#VALID_OPERATORS` and `#OPERATOR_SYMBOLS`; every public method (`fromSymbol`, `fromValue`, `getAllValues`, `getAllSymbols`, constructor validation) derives from those two fields. · Why: keeps the value object's validation/equality/freeze logic untouched when adding new operators. · Where: src/domain/value-objects/Operator.js · Learned: to add a new operator, add the constant, append it to `#VALID_OPERATORS`, and add its symbol to `#OPERATOR_SYMBOLS` — no other code needs to change. <!-- id: 387c5d83-37a7-440a-aefa-dcac89c49e76-0 -->

## Input validation for calculator operations throws a descriptive Error from inside the pri…

What: Input validation for calculator operations throws a descriptive Error from inside the private operation method before computing/returning, mirroring the existing #divide ("Cannot divide by zero") style. · Why: — · Where: CalculatorService.js — applied for negative square root, non-positive log, and the tangent asymptote. <!-- id: eb9294e6-5120-4763-ac0e-47e126808640-5 -->

## SIN, COS and TAN results in `CalculatorService` are rounded to 10 decimal places

What: SIN, COS and TAN results in `CalculatorService` are rounded to 10 decimal places · Why: avoids exposing raw floating-point noise to callers · Where: src/domain/services/CalculatorService.js · Learned: this causes trig identities like sin(π) or cos(π/2) to collapse to exactly 0 in test assertions rather than a near-zero float, so tests should assert exact 0, not toBeCloseTo. <!-- id: a344a1d6-27ce-44e9-8bb0-63378b7b9191-1 -->

## TAN asymptote error messages render the angle using the unicode π character (π), not the…

What: TAN asymptote error messages render the angle using the unicode π character (π), not the word "pi" · Why: — · Where: src/domain/services/CalculatorService.js · Learned: exact-string error assertions for TAN at π/2, 3π/2, -π/2 must use the π codepoint to match. <!-- id: a344a1d6-27ce-44e9-8bb0-63378b7b9191-2 -->

## the invalid-operator error message enumerates all 11 valid operator values (4 arithmetic…

What: the invalid-operator error message enumerates all 11 valid operator values (4 arithmetic + 7 scientific: POWER, SQUARE_ROOT, PERCENTAGE, SIN, COS, TAN, LOG) · Why: — · Where: src/domain/value-objects/Operator.js · Learned: exact-string assertions on this error must be updated whenever an operator is added or removed, since the count is baked into the message. <!-- id: a344a1d6-27ce-44e9-8bb0-63378b7b9191-3 -->

## Calculator operator buttons in the web UI are bound via `[data-operator]` attribute selec…

What: Calculator operator buttons in the web UI are bound via `[data-operator]` attribute selectors (matched against `Operator` symbols), not via `.btn-operator` class + button textContent. · Why: Needed to dispatch through `Operator.fromSymbol(symbol).isUnary()` to route unary vs binary operators differently, and to fix a latent bug (see gotcha) where a non-operator button carried the `.btn-operator` class. · Where: public/index.html (data-operator attributes), src/interfaces/web/index.js (click binding) · Learned: Any new operator button must carry `data-operator` with the exact symbol from Operator's symbol table, not rely on visible button text. <!-- id: ae8012c2-664a-4080-b08d-85c49d788242-1 -->

## The scientific button panel is laid out as its own grid above the main keypad: row 1 = si…

What: The scientific button panel is laid out as its own grid above the main keypad: row 1 = sin/cos/tan/log, row 2 = ^/√/% with `%` spanning 2 columns via `grid-column: span 2`. · Why: Reused the exact same 'wide button' CSS idiom already used by `.btn-equals`, keeping visual/layout consistency with the existing arithmetic keypad instead of inventing a new pattern. · Where: public/index.html (.buttons-scientific), public/styles.css (.buttons-scientific, .btn-scientific) · Learned: When adding more scientific/advanced operators later, follow this same grid + span idiom rather than introducing a different layout system. <!-- id: ae8012c2-664a-4080-b08d-85c49d788242-5 -->

## Web UI behavior is tested by loading the real `public/index.html` markup into jsdom and d…

What: Web UI behavior is tested by loading the real `public/index.html` markup into jsdom and driving it through simulated button clicks/keyboard events, rather than testing UIManager against a hand-rolled DOM fixture. · Why: Ensures tests exercise the actual production markup (data-operator attributes, ids, classes) so drift between HTML and JS wiring is caught. · Where: tests/interfaces/web/UIManager.test.js · Learned: New UI test suites for this project should follow the same 'load real index.html, click through it' pattern. <!-- id: ae8012c2-664a-4080-b08d-85c49d788242-7 -->

## This project keeps its own curated memory as markdown files under `chiron-memory/` (decis…

What: This project keeps its own curated memory as markdown files under `chiron-memory/` (decisions.md, contradictions.md, conventions.md, gotchas.md), updated at the end of a task to record new decisions and close resolved contradictions/stale gotchas. · Why: Acts as the project's durable, human-readable decision log distinct from chat/session memory, consulted at the start of future sessions before design decisions. · Where: chiron-memory/*.md · Learned: When a task resolves a previously flagged open question (like operator arity), explicitly update contradictions.md/gotchas.md to close it out, not just decisions.md. <!-- id: ae8012c2-664a-4080-b08d-85c49d788242-9 -->
