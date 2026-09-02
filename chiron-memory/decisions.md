# decision

A choice made and the reasoning behind it — the path taken over the alternatives.

## The scientific operator symbols added to Operator are `^` (POWER), `√` (SQUARE_ROOT), `%`…

What: The scientific operator symbols added to Operator are `^` (POWER), `√` (SQUARE_ROOT), `%` (PERCENTAGE), and the literal text `sin`/`cos`/`tan`/`log` for the trig/log operators, alongside the existing `+ - × ÷`. · Why: — · Where: src/domain/value-objects/Operator.js. <!-- id: 387c5d83-37a7-440a-aefa-dcac89c49e76-1 -->

## LOG operator computes the natural logarithm via Math.log, not log10/log2.

What: LOG operator computes the natural logarithm via Math.log, not log10/log2. · Why: acceptance criterion requires log(Math.E) === 1. · Where: src/domain/services/CalculatorService.js (#log). <!-- id: eb9294e6-5120-4763-ac0e-47e126808640-2 -->

## Trigonometric operators (SIN, COS, TAN) assume the operand is in radians, not degrees.

What: Trigonometric operators (SIN, COS, TAN) assume the operand is in radians, not degrees. · Why: — · Where: src/domain/services/CalculatorService.js. <!-- id: eb9294e6-5120-4763-ac0e-47e126808640-3 -->

## POWER stays binary (Math.pow(leftOperand, rightOperand)), unlike the six other new scient…

What: POWER stays binary (Math.pow(leftOperand, rightOperand)), unlike the six other new scientific operators (SQUARE_ROOT, PERCENTAGE, SIN, COS, TAN, LOG) which are unary and ignore rightOperand. · Why: exponentiation genuinely needs base and exponent, so it fits the pre-existing binary switch/private-method pattern with no special-casing. · Where: CalculatorService.js #power. <!-- id: eb9294e6-5120-4763-ac0e-47e126808640-8 -->

## Operator arity (unary vs binary) should be exposed via an isUnary() instance method added…

What: Operator arity (unary vs binary) should be exposed via an isUnary() instance method added to the Operator value object, not via a hardcoded list of unary symbols in the UI layer · Why: hardcoding the unary list in HTML classes or in UIManager would leak a domain rule into the presentation layer, which this project's Clean Architecture conventions forbid; a prior recorded decision explicitly deferred adding isUnary() until the UI actually needed to know arity · Where: src/domain/value-objects/Operator.js · Learned: when the presentation layer needs a domain classification, add the accessor to the domain value object instead of duplicating the rule elsewhere. <!-- id: ae8012c2-664a-4080-b08d-85c49d788242-1 -->

## A shared private #applyResult(result) method is being extracted in UIManager so both the…

What: A shared private #applyResult(result) method is being extracted in UIManager so both the new unary-operator path and the existing binary/equals path apply calculation results through identical logic · Why: keeps success/error handling, including the 2-second error-message auto-reset, consistent across both calculation paths instead of duplicating it · Where: src/interfaces/web/index.js · Learned: when adding a new calculation trigger path to UIManager, route it through #applyResult() rather than reimplementing result/error display. <!-- id: ae8012c2-664a-4080-b08d-85c49d788242-10 -->

## `Operator.isUnary()` was added and the web UI dispatches on it, instead of encoding arity…

What: `Operator.isUnary()` was added (backed by a private static `#UNARY_OPERATORS` list: SQUARE_ROOT, PERCENTAGE, SIN, COS, TAN, LOG) and `UIManager` routes every `[data-operator]` click through `Operator.fromSymbol(symbol).isUnary()` to pick the binary or unary flow. · Why: the scientific-buttons work order is the first caller that genuinely needs to know an operator's arity; the alternative (a unary list in the markup's CSS classes or in `UIManager`) would put a domain rule in the presentation layer, which CLAUDE.md forbids. `Calculation` stays binary and unary calls still pass `'0'` as the right operand. · Where: src/domain/value-objects/Operator.js, src/interfaces/web/index.js · Learned: arity is now readable from the domain — never re-derive "is this operator unary" from a symbol list at a call site, ask the `Operator`.

## A unary operator click applies immediately to the displayed value and deliberately leaves…

What: A unary operator click applies immediately to the displayed value and deliberately leaves any pending binary operation intact, so `5 + 16 √ =` yields 9; it only sets `waitingForSecondOperand` so the next digit replaces the result. · Why: matches how physical scientific calculators behave and keeps the unary button usable as an operand transform inside a larger expression. · Where: src/interfaces/web/index.js (`#handleUnaryOperator`) · Learned: don't reset `leftOperand`/`operator` after a unary calculation — that would silently discard the user's pending expression.

## The web UI binds operator buttons with the `[data-operator]` selector and reads the symbol…

What: The web UI binds operator buttons with the `[data-operator]` selector and reads the symbol from `dataset.operator`, replacing the previous `.btn-operator` + `button.textContent` binding. · Why: `textContent` binding also caught the backspace button (class `btn-operator`, no symbol), which stored `'⌫'` as the pending operator and made `=` fail with "An error occurred"; keying on the data attribute makes the symbol explicit and excludes non-operator buttons. Backspace is now wired to its own `#handleBackspace()`, shared with the keyboard handler. · Where: src/interfaces/web/index.js, public/index.html · Learned: a button's class is styling, not identity — bind calculator operators on `data-operator` so the symbol handed to `Operator.fromSymbol` is always a real operator symbol.

