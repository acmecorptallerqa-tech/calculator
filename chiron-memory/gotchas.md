# gotcha

A non-obvious pitfall or trap, learned the hard way.

## After the Operator extension, `CalculatorService.calculate`'s switch has no cases for POW…

What: After the Operator extension, `CalculatorService.calculate`'s switch has no cases for POWER/SQUARE_ROOT/PERCENTAGE/SIN/COS/TAN/LOG, so it falls into `default: throw "Unsupported operator"` for all seven new operators. · Why: this is the correct interim state for this domain-only work order, not a bug, but it means the new Operator constants aren't usable end-to-end yet. · Where: src/domain/services/CalculatorService.js. · Learned: don't assume the service supports an operator just because Operator.js validates it — check CalculatorService's switch explicitly. <!-- id: 387c5d83-37a7-440a-aefa-dcac89c49e76-3 -->

## `Math.tan(Math.PI/2)` returns 1.633e16, not `Infinity`, so the tangent asymptote cannot b…

What: `Math.tan(Math.PI/2)` returns 1.633e16, not `Infinity`, so the tangent asymptote cannot be detected by testing the result for non-finiteness. `CalculatorService.#tan` instead throws when `Math.abs(Math.cos(a)) < 1e-10` (the private static `#TAN_ASYMPTOTE_TOLERANCE`). · Why: `Math.PI/2` is not exactly representable as a double, so the cosine there is about 6.1e-17 rather than 0 and the tangent stays finite but meaninglessly large. · Where: src/domain/services/CalculatorService.js · Learned: detect trig asymptotes through the cosine with an explicit tolerance; any tolerance between roughly 1e-15 and 1e-10 works, and 1e-10 was chosen because a tangent above 1e10 is already unusable. <!-- id: 85d96f8a-dcf7-4e00-84f3-951f164796c3-1 -->

## `CalculatorService.calculate()` validates that `rightOperand` is a number even for single…

What: `CalculatorService.calculate()` validates that `rightOperand` is a number even for single-operand (unary) scientific operators (SQUARE_ROOT, SIN, COS, TAN, LOG, PERCENTAGE), even though the value itself is never used in the computation · Why: the type-check guard runs before operator arity is considered, so it applies uniformly to binary and unary ops · Where: src/domain/services/CalculatorService.js · Learned: tests for unary scientific operations must still pass a valid numeric rightOperand (e.g. 0) or they will hit the validation error instead of the intended calculation path. <!-- id: a344a1d6-27ce-44e9-8bb0-63378b7b9191-0 -->

## `CalculatorService.js` has no overflow guard on POWER, so very large exponents (e.g

What: `CalculatorService.js` has no overflow guard on POWER, so very large exponents (e.g. 2^10000) silently return `Infinity` instead of throwing · Why: — · Where: src/domain/services/CalculatorService.js · Learned: don't assume large-exponent inputs raise a domain error; test and document the Infinity result as current behavior rather than treating it as a bug to fix under a test-only work order. <!-- id: a344a1d6-27ce-44e9-8bb0-63378b7b9191-4 -->

## work orders on this repo land incrementally on the same files, so a "no test coverage exi…

What: work orders on this repo land incrementally on the same files, so a "no test coverage exists" work order can find the target test files already partially populated by an earlier or concurrent work order (e.g. WO-1 added Operator scientific-constant tests, WO-3 added 10 CalculatorService scientific test cases) · Why: avoids duplicating existing test cases or misjudging the scope of what's actually missing · Where: tests/domain/value-objects/Operator.test.js, tests/domain/services/CalculatorService.test.js · Learned: always read the current test files first and scope new work to the actual gaps (specific edge cases, exact error-message strings, single-operand behavior) rather than assuming a blank slate. <!-- id: a344a1d6-27ce-44e9-8bb0-63378b7b9191-5 -->

## The `⌫` backspace button (#btn-backspace) in public/index.html has class `btn-operator` b…

What: The `⌫` backspace button (#btn-backspace) in public/index.html has class `btn-operator` but no `data-operator` attribute · Why: the current click listener binds on `.btn-operator` and reads textContent as the operator symbol, so clicking backspace stores the literal '⌫' character as the pending operator, making the next `=` press fail with 'An error occurred' · Where: public/index.html, src/interfaces/web/index.js · Learned: switching the operator listener to bind on `[data-operator]` instead of the `.btn-operator` class removes backspace from that path, but backspace then needs to be separately wired to the existing backspace logic (currently only reachable via the keyboard handler) or it will silently do nothing. <!-- id: ae8012c2-664a-4080-b08d-85c49d788242-3 -->
