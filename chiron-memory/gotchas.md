# gotcha

A non-obvious pitfall or trap, learned the hard way.

## After the Operator extension, `CalculatorService.calculate`'s switch has no cases for POW…

What: After the Operator extension, `CalculatorService.calculate`'s switch has no cases for POWER/SQUARE_ROOT/PERCENTAGE/SIN/COS/TAN/LOG, so it falls into `default: throw "Unsupported operator"` for all seven new operators. · Why: this is the correct interim state for this domain-only work order, not a bug, but it means the new Operator constants aren't usable end-to-end yet. · Where: src/domain/services/CalculatorService.js. · Learned: don't assume the service supports an operator just because Operator.js validates it — check CalculatorService's switch explicitly. <!-- id: 387c5d83-37a7-440a-aefa-dcac89c49e76-3 -->
