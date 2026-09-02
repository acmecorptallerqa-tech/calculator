# gotcha

A non-obvious pitfall or trap, learned the hard way.

## `Operator.fromSymbol` resolves a symbol via a linear `find` over `#OPERATOR_SYMBOLS`, so…

What: `Operator.fromSymbol` resolves a symbol via a linear `find` over `#OPERATOR_SYMBOLS`, so every symbol in that map must be globally unique across all operators (arithmetic and scientific). · Why: a duplicate symbol would silently resolve to the wrong operator with no validation error. · Where: src/domain/value-objects/Operator.js · Learned: when adding an operator, explicitly verify its symbol doesn't collide with any existing one (verified uniqueness for all 11: +,-,×,÷,^,√,%,sin,cos,tan,log). <!-- id: 387c5d83-37a7-440a-aefa-dcac89c49e76-1 -->

## Arity is unmodeled in the domain — `Calculation` entity and `CalculatorService.calculate`…

What: Arity is unmodeled in the domain — `Calculation` entity and `CalculatorService.calculate` are hard-wired to binary operations (`left, operator, right`), but SQUARE_ROOT, SIN, COS, TAN, LOG are unary, and PERCENTAGE is ambiguous between unary (`a/100`) and binary ("a% of b"). · Why: the Operator value object as specified has no `isUnary()`/arity concept, so this can't be resolved at this layer. · Where: src/domain/value-objects/Operator.js, src/domain/entities/Calculation.js, src/domain/services/CalculatorService.js · Learned: the next work order that implements scientific calculation logic must first decide how arity (and PERCENTAGE's semantics) is expressed in the domain model. <!-- id: 387c5d83-37a7-440a-aefa-dcac89c49e76-3 -->

## Math.tan(Math.PI/2) in JS returns ~1.633e16, not Infinity, because π/2 is not exactly rep…

What: Math.tan(Math.PI/2) in JS returns ~1.633e16, not Infinity, because π/2 is not exactly representable in floating point, so tan's asymptote cannot be detected via an Infinity or exact-value check. · Why: — · Where: CalculatorService.js #tan validation. · Learned: detect the asymptote via Math.abs(Math.cos(a)) < tolerance, using a private static #TAN_ASYMPTOTE_TOLERANCE (1e-10). <!-- id: eb9294e6-5120-4763-ac0e-47e126808640-3 -->

## `Math.tan(Math.PI/2)` returns 1.633e16, not `Infinity`, so the tangent asymptote cannot b…

What: `Math.tan(Math.PI/2)` returns 1.633e16, not `Infinity`, so the tangent asymptote cannot be detected by testing the result for non-finiteness. `CalculatorService.#tan` instead throws when `Math.abs(Math.cos(a)) < 1e-10` (the private static `#TAN_ASYMPTOTE_TOLERANCE`). · Why: `Math.PI/2` is not exactly representable as a double, so the cosine there is about 6.1e-17 rather than 0 and the tangent stays finite but meaninglessly large. · Where: src/domain/services/CalculatorService.js · Learned: detect trig asymptotes through the cosine with an explicit tolerance; any tolerance between roughly 1e-15 and 1e-10 works, and 1e-10 was chosen because a tangent above 1e10 is already unusable. <!-- id: 85d96f8a-dcf7-4e00-84f3-951f164796c3-1 -->

## `CalculatorService.calculate()` validates that `rightOperand` is a number even for single…

What: `CalculatorService.calculate()` validates that `rightOperand` is a number even for single-operand (unary) scientific operators (SQUARE_ROOT, SIN, COS, TAN, LOG, PERCENTAGE), even though the value itself is never used in the computation · Why: the type-check guard runs before operator arity is considered, so it applies uniformly to binary and unary ops · Where: src/domain/services/CalculatorService.js · Learned: tests for unary scientific operations must still pass a valid numeric rightOperand (e.g. 0) or they will hit the validation error instead of the intended calculation path. <!-- id: a344a1d6-27ce-44e9-8bb0-63378b7b9191-0 -->

## `CalculatorService.js` has no overflow guard on POWER, so very large exponents (e.g

What: `CalculatorService.js` has no overflow guard on POWER, so very large exponents (e.g. 2^10000) silently return `Infinity` instead of throwing · Why: — · Where: src/domain/services/CalculatorService.js · Learned: don't assume large-exponent inputs raise a domain error; test and document the Infinity result as current behavior rather than treating it as a bug to fix under a test-only work order. <!-- id: a344a1d6-27ce-44e9-8bb0-63378b7b9191-4 -->

## work orders on this repo land incrementally on the same files, so a "no test coverage exi…

What: work orders on this repo land incrementally on the same files, so a "no test coverage exists" work order can find the target test files already partially populated by an earlier or concurrent work order (e.g. WO-1 added Operator scientific-constant tests, WO-3 added 10 CalculatorService scientific test cases) · Why: avoids duplicating existing test cases or misjudging the scope of what's actually missing · Where: tests/domain/value-objects/Operator.test.js, tests/domain/services/CalculatorService.test.js · Learned: always read the current test files first and scope new work to the actual gaps (specific edge cases, exact error-message strings, single-operand behavior) rather than assuming a blank slate. <!-- id: a344a1d6-27ce-44e9-8bb0-63378b7b9191-5 -->

## The `⌫` backspace button (`#btn-backspace`) had class `btn-operator` but no `data-operato…

What: The `⌫` backspace button (`#btn-backspace`) had class `btn-operator` but no `data-operator` attribute, so clicking it stored the literal `'⌫'` as the pending operator, making the next `=` press fail with 'An error occurred'. · Why: The old click handler bound on `.btn-operator` textContent rather than an explicit data attribute, so any button sharing that class was treated as an operator regardless of intent. · Where: public/index.html, src/interfaces/web/index.js (#handleBackspace) · Learned: Fixed by switching binding to `[data-operator]` and wiring backspace through a dedicated `#handleBackspace()` shared with the existing keyboard handler; watch for other buttons still carrying `.btn-operator` without a real operator symbol. <!-- id: ae8012c2-664a-4080-b08d-85c49d788242-2 -->

## `Calculation` is intentionally binary-only by prior domain decision, so after a unary ope…

What: `Calculation` is intentionally binary-only by prior domain decision, so after a unary operation like √16, the calculation history/toString renders the unused right operand, e.g. `16 √ 0 = 4`, which is cosmetic but visible. · Why: Fixing it would require touching the `Calculation` entity, which existing project memory says should stay binary; this was flagged as an open question rather than changed unilaterally. · Where: domain Calculation entity (toString), surfaced via unary scientific operators in the UI · Learned: Do not 'fix' this display quirk without explicit user sign-off, since it stems from an intentional architectural constraint, not a bug. <!-- id: ae8012c2-664a-4080-b08d-85c49d788242-4 -->

## `npm run lint` already fails on `main` before any of this session's changes, due to pre-e…

What: `npm run lint` already fails on `main` before any of this session's changes, due to pre-existing Prettier and `no-unused-vars` errors unrelated to this work. · Why: Confirmed by running lint against the baseline (git show HEAD) version of the touched files and diffing error counts; the one new line added to src/interfaces/web/index.js matches the exact style of its six pre-existing sibling lines. · Where: repo-wide (npm run lint), src/interfaces/web/index.js · Learned: Don't treat lint failures as a regression caused by new work without first checking whether they pre-exist on main; don't run an unrequested formatting pass to 'fix' pre-existing style errors. <!-- id: ae8012c2-664a-4080-b08d-85c49d788242-8 -->
