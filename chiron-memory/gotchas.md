# gotcha

Something non-obvious that failed or must be kept in mind to avoid repeating (bugs, surprises, lessons).

## After the Operator extension, `CalculatorService.calculate`'s switch has no cases for POW…

What: After the Operator extension, `CalculatorService.calculate`'s switch has no cases for POWER/SQUARE_ROOT/PERCENTAGE/SIN/COS/TAN/LOG, so it falls into `default: throw "Unsupported operator"` for all seven new operators. · Why: this is the correct interim state for this domain-only work order, not a bug, but it means the new Operator constants aren't usable end-to-end yet. · Where: src/domain/services/CalculatorService.js. · Learned: don't assume the service supports an operator just because Operator.js validates it — check CalculatorService's switch explicitly. <!-- id: 387c5d83-37a7-440a-aefa-dcac89c49e76-3 -->

## Math.tan(Math.PI/2) in JS returns ~1.633e16, not Infinity, because π/2 isn't exactly repr…

What: Math.tan(Math.PI/2) in JS returns ~1.633e16, not Infinity, because π/2 isn't exactly representable as a float, so checking the tan output for Infinity/NaN cannot detect the tangent asymptote. · Why: — · Where: src/domain/services/CalculatorService.js (#tan validation). · Learned: detect the asymptote via Math.abs(Math.cos(a)) < tolerance instead (project uses 1e-10, stored as a private static #TAN_ASYMPTOTE_TOLERANCE). <!-- id: eb9294e6-5120-4763-ac0e-47e126808640-4 -->
