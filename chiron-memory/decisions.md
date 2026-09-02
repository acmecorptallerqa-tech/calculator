# decision

A choice made and the reasoning behind it — the path taken over the alternatives.

## `Operator.isUnary()` was added and the web UI dispatches on it, instead of encoding arity…

What: `Operator.isUnary()` was added (backed by a private static `#UNARY_OPERATORS` list: SQUARE_ROOT, PERCENTAGE, SIN, COS, TAN, LOG) and `UIManager` routes every `[data-operator]` click through `Operator.fromSymbol(symbol).isUnary()` to pick the binary or unary flow. · Why: the scientific-buttons work order is the first caller that genuinely needs to know an operator's arity; the alternative (a unary list in the markup's CSS classes or in `UIManager`) would put a domain rule in the presentation layer, which CLAUDE.md forbids. `Calculation` stays binary and unary calls still pass `'0'` as the right operand. · Where: src/domain/value-objects/Operator.js, src/interfaces/web/index.js · Learned: arity is now readable from the domain — never re-derive "is this operator unary" from a symbol list at a call site, ask the `Operator`.

## A unary operator click applies immediately to the displayed value and deliberately leaves…

What: A unary operator click applies immediately to the displayed value and deliberately leaves any pending binary operation intact, so `5 + 16 √ =` yields 9; it only sets `waitingForSecondOperand` so the next digit replaces the result. · Why: matches how physical scientific calculators behave and keeps the unary button usable as an operand transform inside a larger expression. · Where: src/interfaces/web/index.js (`#handleUnaryOperator`) · Learned: don't reset `leftOperand`/`operator` after a unary calculation — that would silently discard the user's pending expression.

## The web UI binds operator buttons with the `[data-operator]` selector and reads the symbol…

What: The web UI binds operator buttons with the `[data-operator]` selector and reads the symbol from `dataset.operator`, replacing the previous `.btn-operator` + `button.textContent` binding. · Why: `textContent` binding also caught the backspace button (class `btn-operator`, no symbol), which stored `'⌫'` as the pending operator and made `=` fail with "An error occurred"; keying on the data attribute makes the symbol explicit and excludes non-operator buttons. Backspace is now wired to its own `#handleBackspace()`, shared with the keyboard handler. · Where: src/interfaces/web/index.js, public/index.html · Learned: a button's class is styling, not identity — bind calculator operators on `data-operator` so the symbol handed to `Operator.fromSymbol` is always a real operator symbol.

## LOG operator is natural log (Math.log), and SIN/COS/TAN assume the input is already in ra…

What: LOG operator is natural log (Math.log), and SIN/COS/TAN assume the input is already in radians. · Why: acceptance criteria fix log(Math.E) === 1; requirements explicitly state radians for trig. · Where: CalculatorService.js #log/#sin/#cos/#tan. <!-- id: eb9294e6-5120-4763-ac0e-47e126808640-2 -->

## POWER stays binary (Math.pow(leftOperand, rightOperand)), unlike the six other new scient…

What: POWER stays binary (Math.pow(leftOperand, rightOperand)), unlike the six other new scientific operators (SQUARE_ROOT, PERCENTAGE, SIN, COS, TAN, LOG) which are unary and ignore rightOperand. · Why: exponentiation genuinely needs base and exponent, so it fits the pre-existing binary switch/private-method pattern with no special-casing. · Where: CalculatorService.js #power. <!-- id: eb9294e6-5120-4763-ac0e-47e126808640-8 -->

## Added `Operator.isUnary()` (backed by a private static `#UNARY_OPERATORS` list containing…

What: Added `Operator.isUnary()` (backed by a private static `#UNARY_OPERATORS` list containing SQUARE_ROOT, PERCENTAGE, SIN, COS, TAN, LOG) to `src/domain/value-objects/Operator.js`. · Why: A prior session had deliberately deferred adding arity awareness to `Operator` until the UI actually needed to distinguish unary vs binary operators; this scientific-buttons work order was that moment, so the rule was added to the domain rather than hardcoded in the interface layer (CLAUDE.md forbids leaking domain rules into presentation code). · Where: src/domain/value-objects/Operator.js · Learned: This closes the previously open 'does Operator need to know its own arity' contradiction — future sessions should treat isUnary() as canonical and not re-litigate where arity logic belongs. <!-- id: ae8012c2-664a-4080-b08d-85c49d788242-0 -->

## A shared private #applyResult(result) method is being extracted in UIManager so both the…

What: A shared private #applyResult(result) method is being extracted in UIManager so both the new unary-operator path and the existing binary/equals path apply calculation results through identical logic · Why: keeps success/error handling, including the 2-second error-message auto-reset, consistent across both calculation paths instead of duplicating it · Where: src/interfaces/web/index.js · Learned: when adding a new calculation trigger path to UIManager, route it through #applyResult() rather than reimplementing result/error display. <!-- id: ae8012c2-664a-4080-b08d-85c49d788242-10 -->

## Unary scientific operators (√, %, sin, cos, tan, log) compute immediately against the cur…

What: Unary scientific operators (√, %, sin, cos, tan, log) compute immediately against the currently displayed value by calling `controller.calculate(currentInput, symbol, '0')`, passing `'0'` as the right operand. · Why: This matches what `CalculatorService` already expects for unary operations (a prior recorded domain decision), and deliberately preserves any pending binary operation so a sequence like `5 + 16 √ =` still yields `9` instead of discarding the pending `+`. · Where: src/interfaces/web/index.js (#handleUnaryOperator) · Learned: Any future unary-style operator must follow this same '0 as right operand, preserve pending binary op' pattern rather than resetting calculator state. <!-- id: ae8012c2-664a-4080-b08d-85c49d788242-3 -->
